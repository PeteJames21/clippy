import { Collection, TextItem } from "@prisma/client";
import { CollectionProps } from "../ui/forms/create_collection";
import { TextItemProps } from "./types";
import prisma from "@/app/lib/prisma_client";

/**
 * Create a collection and return its id, or update existing record
 * if id is provided
 */
export async function createOrUpdateCollection(data: CollectionProps) {
  let collection: Collection
  if (data.id) {
    collection = await prisma.collection.findUnique({
      where: {
        id: data.id
      }
    });
    if (collection.userID !== data.userId) {
      throw new Error("Permission denied. Only the collection owner can make modifications");
    }

    collection = await prisma.collection.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        description: data.description,
        public: data.public
      }
    });
  }
  else {
    collection = await prisma.collection.create({
      data: {
        name: data.name,
        description: data.description,
        public: data.public,
        userID: data.userId
      }
    });
  }

  return collection.id;
}

/**
 * Retrieve a collection object from the database by name or id
 */
export async function getCollection(id?: number, name?: string) {
  let collection: Collection;
  if (id) {
    collection = await prisma.collection.findUnique({
      where: {
        id
      }
    });
  }
  else if (name) {
    collection = await prisma.collection.findUnique({
      where: {
        name
      }
    });
  }
  else {
    throw new Error("Collection name or id must be specified for lookup");
  }

  return collection;
}

/**
 * Get a list of all collections
 */
export async function getAllCollections(userID?: number) {
  // Only return public collections if userID is not provided
  let collections: Collection[];
  if (!userID) {
    collections = await prisma.collection.findMany({
      where: {
        public: true
      },
      include: {
        _count: {
          select:{
            items: true
          }
        }
      }
    });
  }
  else {
    collections = await prisma.collection.findMany({
      where: {
        OR: [
          {public: true}, {userID}
        ]
      },
      include: {
        _count: {
          select:{
            items: true
          }
        }
      }
    });
  }
  return collections;
}

/**
 * Retrieve a TextItem object from the database
 */
export async function getTextItem(id: number) {
  const item = prisma.textItem.findUnique({
    where: {
      id
    }
  })

  return item;
}


export async function createOrUpdateTextItem(data: TextItemProps) {
  let item: TextItem;
  const collection: Collection = await getCollection(data.collectionID, data.collectionName);
  if (!collection) {
    throw new Error("Collection not found");
  }

  if (data.id) {
    // Modify an existing item
    item = await prisma.textItem.findUnique({
      where: {
        id: data.id
      }
    });
    if (item.userID !== data.userID) {
      throw new Error("Permission denied. Only the item owner can make modifications");
    }

    item = await prisma.textItem.update({
      where: {
        id: data.id
      },
      data: {
        content: data.content,
        description: data.description,
        collectionID: collection.id,
        public: collection.public,
        tags: data.tags,
        userID: data.userID
      }
    });
  }
  else {
    // Create the item
    item = await prisma.textItem.create({
      data: {
        content: data.content,
        description: data.description,
        collectionID: collection.id,
        public: collection.public,
        tags: data.tags,
        userID: data.userID
      }
    });
  }
  return item.id;
}

export async function getAllTextItems(userID?: number) {
  // If user not specified, get all public items, otherwise get all public
  // items plus the user's private items
  let items: TextItem[];

  if (!userID) {
    items = await prisma.textItem.findMany({
      where: {
        public: true
      },
      include: {
        collection: {
          select: {
            name: true
          }
        }
      }
    });
  }
  else {
    items = await prisma.textItem.findMany({
      where: {
        OR: [
          {userID: userID, public: true}
        ]
      }
    });
  }

  return items;
}

/**
 *
 * Return items from the collection only if the collection is public
 * or if it belongs to the specified user
 */
export async function getItemsFromCollection(collectionID: number, userID?: number) {
  const collection = await getCollection(collectionID);
  let items: TextItem[];
  if (collection.public || collection.userID === userID) {
    items = await prisma.textItem.findMany({
      where: {
        collectionID
      },
      include: {
        collection: {
          select: {
            name: true
          }
        }
      }

    });
  }
  else {
    throw new Error("User does not have permission to view this collection");
  }

  return items;
}

/**
 * Return a list of items that match the specified text
 */
export async function searchItems(q: string, userID?: number) {
  // If userID is not specified, only search for public items that match the criteria.
  // If userID is specified, the items should either be public or belong to the user
  let items: TextItem[];

  if (userID) {
    items = await prisma.$queryRaw`SELECT * FROM TextItem WHERE (userID = ${userID} OR public = true) AND MATCH (content, description, tags) AGAINST (${q} IN NATURAL LANGUAGE MODE);`
  }
  else {
    items = await prisma.$queryRaw`SELECT * FROM TextItem WHERE (public = true) AND MATCH (content, description, tags) AGAINST (${q} IN NATURAL LANGUAGE MODE);`
  }
  return items;
}

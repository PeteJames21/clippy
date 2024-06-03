import { Collection, PrismaClient, TextItem } from "@prisma/client";
import { CollectionProps } from "../ui/forms/create_collection";
import { TextItemProps } from "./types";

const prisma = new PrismaClient();

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
      }
    });
  }
  else {
    collections = await prisma.collection.findMany({
      where: {
        OR: [
          {public: true}, {userID}
        ]
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

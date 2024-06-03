import { Collection, PrismaClient } from "@prisma/client";
import { CollectionProps } from "../ui/forms/create_collection";

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
      throw Error("Permission denied. Only the collection owner can make modifications");
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
 * Retrieve a collection object from the database
 */
export async function getCollection(id: number) {
  const collection = prisma.collection.findUnique({
    where: {
      id
    }
  })

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

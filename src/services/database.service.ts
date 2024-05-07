import * as Mongodb from "mongodb";

const DB_CONN_STRING: string = process.env.DB_CONN_STRING || "xxxx";
const DB_NAME: string = process.env.DB_NAME || "";
const DB_COLLECTIONS: string[] = process.env.DB_COLLECTIONS?.split(",") || [];

console.log(DB_CONN_STRING);
export let collections: Record<string, Mongodb.Collection> = {};
export const connectToDatabase = async () => {
  const client: Mongodb.MongoClient = new Mongodb.MongoClient(DB_CONN_STRING);
  await client.connect();
  const db: Mongodb.Db = client.db(DB_NAME);

  collections = DB_COLLECTIONS.reduce((_colls, collName: string) => {
    collections[collName] = db.collection(collName);
    return collections;
  }, Object.create(null));

  // configuration or internal collections
  collections.ccc_users = db.collection("ccc_users");
};

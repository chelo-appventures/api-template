import { Db, MongoClient } from "mongodb";
import { MigrationInterface } from "mongo-migrate-ts";

export class seed_users1714840962665 implements MigrationInterface {
  public async up(db: Db, client: MongoClient): Promise<any> {
    await db.createCollection("ccc_users");
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db.collection("ccc_users").insertOne({
          username: "admin",
          password: "MD5('1234')",
          role: "GOD",
        });
      });
    } finally {
      await session.endSession();
    }
  }

  public async down(db: Db): Promise<any> {
    await db.dropCollection("ccc_users");
  }
}

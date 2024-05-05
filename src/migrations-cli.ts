import { mongoMigrateCli } from "mongo-migrate-ts";

mongoMigrateCli({
  uri: "mongodb://127.0.0.1:27017",
  database: "GENAPI-Test",
  migrationsDir: `${__dirname}/migrations`,
  migrationsCollection: "ccc_migrations_changelog",
});

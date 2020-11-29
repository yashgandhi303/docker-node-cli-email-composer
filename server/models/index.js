import { Sequelize } from "sequelize";
import subscriptions from "./subscriptions";

const PG_HOST = process.env.PG_HOST || "localhost";
const PG_PORT = process.env.PG_PORT || "5432";
const PG_DB = process.env.PG_DB || "digsup";
const PG_USER = process.env.PG_USER || "digsup";
const PG_PASSWORD = process.env.PG_PASSWORD || "digsup";

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
  dialect: "postgres",
  operatorsAliases: Sequelize.Op,
  host: PG_HOST,
  port: PG_PORT,
  define: {
    underscored: true,
  },
});
const models = {
  Subscriptions: subscriptions(sequelize),
  op: Sequelize.Op,
  sequelize: sequelize,
};
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("Unable to connect the database:", error);
    throw error;
  }
})();
const op = Sequelize.Op;
export { models, op, sequelize };

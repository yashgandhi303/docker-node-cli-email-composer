import { Sequelize, Model } from "sequelize";

const subscriptions = (sequelize) => {
  class Subscriptions extends Model {}
  Subscriptions.init(
    {
      email: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { notEmpty: true, isEmail: true },
        indexes: [],
      },
      userSubscription: {
        type: Sequelize.DataTypes.ENUM("sent", "unsent"),
        allowNull: false,
      },
    },
    { sequelize, modelName: "user_subscription" }
  );
  return Subscriptions;
};
export default subscriptions;

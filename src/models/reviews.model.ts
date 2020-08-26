// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import { Sequelize, DataTypes, Model } from "sequelize";
import { Application } from "../declarations";
import { HookReturn } from "sequelize/types/lib/hooks";

export default function (app: Application): typeof Model {
  const sequelizeClient: Sequelize = app.get("sequelizeClient");
  const reviews = sequelizeClient.define(
    "reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.STRING,
      },
      id_pizza: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeCount(options: any): HookReturn {
          options.raw = true;
        },
      },
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (reviews as any).associate = function (models: any): void {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return reviews;
}

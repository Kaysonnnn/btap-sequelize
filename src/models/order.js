module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Order",
    {
      order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: DataTypes.INTEGER,
      food_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      code: DataTypes.STRING,
      arr_sub_id: DataTypes.STRING
    },
    {
      tableName: "order",
      timestamps: false
    }
  );
};

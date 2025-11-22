module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      tableName: "user",
      timestamps: false
    }
  );
};

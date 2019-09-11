
module.exports = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  name: DataTypes.STRING,
  db_host: DataTypes.STRING,
  db_port: DataTypes.STRING,
  db_username: DataTypes.STRING,
  db_name: DataTypes.STRING,
  db_password: DataTypes.STRING,
  created_by: DataTypes.INTEGER,
  deleted_by: DataTypes.INTEGER,
});

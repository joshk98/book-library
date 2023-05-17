module.exports = (connection, DataTypes) => {
  const schema = {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  return connection.define("Reader", schema);
};

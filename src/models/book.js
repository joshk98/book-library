module.exports = (connection, DataTypes) => {
  const schema = {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    ISBN: DataTypes.STRING,
  };

  return connection.define("Book", schema);
};

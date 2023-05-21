module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Genre cannot be empty.",
        },
        notNull: {
          args: [true],
          msg: "Please enter a genre.",
        },
      },
    },
  };

  return connection.define("Genre", schema);
};

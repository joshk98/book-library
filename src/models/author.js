module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Author cannot be empty.",
        },
        notNull: {
          args: [true],
          msg: "Please enter an author.",
        },
      },
    },
  };

  return connection.define("Author", schema);
};

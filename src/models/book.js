module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Title cannot be empty.",
        },
        notNull: {
          args: [true],
          msg: "Please enter a title.",
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "Please enter an author.",
        },
      },
    },
    ISBN: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: [true],
          msg: "Please enter an ISBN.",
        },
      },
    },
  };

  return connection.define("Book", schema);
};

module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: [true],
          msg: "Name cannot be empty.",
        },
        notNull: {
          args: [true],
          msg: "Please enter a name.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: [true],
          msg: "Please use a valid email address.",
        },
        notNull: {
          args: [true],
          msg: "Please enter an email.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "Please enter a password.",
        },
        isLessThan8(value) {
          if (value.length < 8) {
            throw new Error("Password needs to be longer than 8 characters.");
          }
        },
      },
    },
  };

  return connection.define("Reader", schema);
};

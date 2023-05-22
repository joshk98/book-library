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
      unique: true,
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
        len: {
          args: 8,
          msg: "Password needs to be at least 8 characters long.",
        },
      },
      get() {
        return undefined;
      },
    },
  };

  return connection.define("Reader", schema);
};

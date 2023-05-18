module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      min: 8,
    },
  };

  return connection.define("Reader", schema);
};

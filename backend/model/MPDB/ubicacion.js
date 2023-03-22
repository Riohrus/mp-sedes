const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ubicacion', {
    id: {
      autoIncrement: true,
      type: DataTypes.DECIMAL(10,0),
      allowNull: false,
      primaryKey: true,
      field: 'Id'
    },
    nombre: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field: 'Nombre'
    }
  }, {
    sequelize,
    tableName: 'Ubicacion',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__DB_DEPARTAMENTO_ID",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};

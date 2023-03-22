const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fiscalia', {
    codigoFiscalia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'CodigoFiscalia'
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'Nombre'
    },
    ubicacion: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true,
      references: {
        model: 'Ubicacion',
        key: 'Id'
      },
      field: 'Ubicacion'
    },
    numeroTelefono: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'NumeroTelefono'
    }
  }, {
    sequelize,
    tableName: 'Fiscalia',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Fiscalia__5BA6D7C2967D73FE",
        unique: true,
        fields: [
          { name: "CodigoFiscalia" },
        ]
      },
    ]
  });
};

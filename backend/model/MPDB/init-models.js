var DataTypes = require("sequelize").DataTypes;
var _fiscalia = require("./fiscalia");
var _ubicacion = require("./ubicacion");

function initModels(sequelize) {
  var fiscalia = _fiscalia(sequelize, DataTypes);
  var ubicacion = _ubicacion(sequelize, DataTypes);

  fiscalia.belongsTo(ubicacion, { as: "lugar", foreignKey: "ubicacion"});
  ubicacion.hasMany(fiscalia, { as: "fiscalia", foreignKey: "ubicacion"});

  return {
    fiscalia,
    ubicacion,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

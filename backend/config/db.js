const { Sequelize, DataTypes } = require('sequelize');
// Configuración de Sequelize

 const sequelize = new Sequelize('MPDB', 'MpAdmin', 'Mp301295', {
    dialect: 'mssql',
    dialectOptions: {
      instanceName: 'MPSERVER'
    },
    server: 'localhost',
    port: 1433,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      encrypt: true,
      trustServerCertificate: true
    }
  });

exports.DataTypes = DataTypes;
exports.sequelize = sequelize;

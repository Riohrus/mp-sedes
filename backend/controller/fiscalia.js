const { where } = require('sequelize')
const { sequelize, DataTypes } = require('../config/db')
const initModels = require('../model/MPDB/init-models')
const models = initModels(sequelize)

const FiscaliaModel = models.fiscalia
const UbicacionModel = models.ubicacion

async function getAllFiscalias(req, res) { //obtener todos los registros
    try {
      const fiscalias = await FiscaliaModel.findAll({
        include:[
            {
                model: UbicacionModel, 
                as: 'lugar'
            }
        ]
      });
      res.json(fiscalias);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener las fiscalías.' });
    }
  }

  async function updateFiscalias(req, res) {
    const { id } = req.params
    const { codigoFiscalia, nombre, ubicacion, numeroTelefono } = req.body;
    try {
        const updateFiscalia = await FiscaliaModel.update({
            codigoFiscalia,
            nombre,
            ubicacion,
            numeroTelefono
          }, {
            where: {
                codigoFiscalia: id
            }
          }); 
      res.status(200).send(updateFiscalia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener las fiscalías.' });
    }
  }

  async function deleteFiscalias(req, res) {
    const { id } = req.params;
    try {
      const fiscalias = await FiscaliaModel.destroy({
        where: {
            codigoFiscalia: id
        }
      }); d
      res.status(200).send(true);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener las fiscalías.' });
    }
  }

  async function insertFiscalias(req, res) {
    const { codigoFiscalia, nombre, ubicacion, numeroTelefono } = req.body;
    try {
      const nuevaFiscalia = await FiscaliaModel.create({
        codigoFiscalia,
        nombre,
        ubicacion,
        numeroTelefono
      }); 
      res.status(200).send(nuevaFiscalia);
      console.log("obtuvimos datos pero debes revisar el registro con el get")
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al insertar las fiscalías.' });
    }
  }

  async function getAllLugares(req, res) { //obtener todos los registros
    try {
      const lugares = await UbicacionModel.findAll();
      res.json(lugares);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener los lugares.' });
    }
  }

  async function getFiscaliaById(req, res) {
    const { id } = req.params;
  
    try {
      const fiscalia = await FiscaliaModel.findByPk(id, {
        include: [
          {
            model: UbicacionModel,
            as: 'lugar',
          },
        ],
      });
  
      if (!fiscalia) {
        return res.status(404).json({ message: 'Fiscalía no encontrada.' });
      }
  
      res.json(fiscalia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Hubo un error al obtener la fiscalía.' });
    }
  }
  
  

module.exports = {
  getAllFiscalias,
  updateFiscalias,
  deleteFiscalias,
  insertFiscalias,
  getAllLugares,
  getFiscaliaById
};

import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import getLugares from "../services/Lugares";
import { saveFiscalia, updateFiscalia } from "../services/Fiscalia";

const ModalAgregarFiscalia = ({ show, onHide, recargarDatos, dataFiscal }) => {
  const [codigoFiscalia, setCodigoFiscalia] = useState("");
  const [nombre, setNombre] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const getApi = async () => {
      const lugares = await getLugares();
      setLugares(lugares);
    };
    getApi();
  }, []);

  useEffect(() => {
    if (dataFiscal !== null) {
      setCodigoFiscalia(dataFiscal.codigoFiscalia);
      setNombre(dataFiscal.nombre);
      setUbicacion(dataFiscal.ubicacion);
      setNumeroTelefono(dataFiscal.numeroTelefono);
    } else {
      setCodigoFiscalia("");
      setNombre("");
      setUbicacion("");
      setNumeroTelefono("");
    }
  }, [dataFiscal]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        let respuesta = {}
      if (dataFiscal === null) {
        respuesta = await saveFiscalia({
          codigoFiscalia,
          nombre,
          ubicacion,
          numeroTelefono,
        });
      }else {
        respuesta = await updateFiscalia(codigoFiscalia,{
            codigoFiscalia,
            nombre,
            ubicacion,
            numeroTelefono,
          });
      }

      console.log(respuesta.data);
      recargarDatos();
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header closeButton>
        <Modal.Title>
          {dataFiscal === null ? "Agregar nueva fiscalía" : "Editar Fiscalia"}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="codigoFiscalia">
            <Form.Label>Codigo Fiscalia</Form.Label>
            <Form.Control
              type="numeric"
              placeholder="Ingrese Codigo"
              value={codigoFiscalia}
              onChange={(e) => setCodigoFiscalia(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="ubicacion">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              as="select"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            >
              {lugares.map((lugar, index) => {
                return (
                  <option value={lugar.id} key={index}>
                    {lugar.nombre}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="numeroTelefono">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el número de teléfono"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            {dataFiscal === null ? 'Agregar' : 'Editar'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAgregarFiscalia;

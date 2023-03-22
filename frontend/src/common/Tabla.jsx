import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { getFiscalias, obtenerFiscaliaPorId, deleteFiscalias } from "../services/Fiscalia";
import ModalAgregarFiscalia from "../common/AgregarFiscaliaModal.jsx";

const TablaFiscalias = () => {
  const [fiscalias, setFiscalias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [dataFiscalia, setDataFiscalia] = useState(null)

  useEffect(() => {
    obtenerFiscalias();
  }, []);

  const obtenerFiscalias = async () => {
    const datosFiscalias = await getFiscalias();
    setFiscalias(datosFiscalias);
  };

  const abrirModal = () => {
    setDataFiscalia(null)
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const editarFiscalia = async (id) => {
  // Obtener los datos actuales de la fila seleccionada
  const response = await obtenerFiscaliaPorId(id);

  if (response.success) {
    // Establecer los datos de la fila seleccionada
    setDataFiscalia(response.data);
    setMostrarModal(true);

    console.log(response.data)

    console.log(filaSeleccionada)
  } else {
    // Mostrar un mensaje de error si no se pudieron obtener los datos
    alert(response.mensaje);
  }
};

const eliminarFiscalia = async (id) => {
  // Obtener los datos actuales de la fila seleccionada
  const response = await deleteFiscalias(id);
  obtenerFiscalias()
  
  
};

  return (
    <div>
      <Button onClick={abrirModal}>Nueva Fiscalía</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ubicación</th>
            <th>Teléfono</th>
            <th colSpan={2}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {fiscalias.map((fiscalia) => (
            <tr key={fiscalia.codigoFiscalia}>
              <td>{fiscalia.codigoFiscalia}</td>
              <td>{fiscalia.nombre}</td>
              <td>{fiscalia.lugar.nombre}</td>
              <td>{fiscalia.numeroTelefono}</td>
              <td>
                <button onClick={() => editarFiscalia(fiscalia.codigoFiscalia)}>
                  Editar
                </button>
              </td>
              <td>
                <button onClick={() => eliminarFiscalia(fiscalia.codigoFiscalia)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModalAgregarFiscalia
        show={mostrarModal}
        onHide={cerrarModal}
        recargarDatos={obtenerFiscalias}
        dataFiscal={dataFiscalia}
      ></ModalAgregarFiscalia>
    
    </div>
  );
};

export default TablaFiscalias;

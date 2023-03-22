import clienteAxios from "../config/axios"

const getFiscalias = async () => {
  const dataTable = []

  const resDatosTable = await clienteAxios
    .get("/fiscalias")
    .then((res) => {
      return res.data
    })
    .catch((err) => {
      console.error(err)
    })

  for (const dataObj of resDatosTable) {
    dataTable.push(dataObj)
  }

  return dataTable
}

const saveFiscalia = async (datos) => {
  try {
    const respuesta = await clienteAxios.post("/insertFiscalias", datos)
    return {
      success: true,
      data: respuesta.data,
    }
  } catch (error) {
    return {
      success: false,
      mensaje: error.response.data.msg,
    }
  }
}

const updateFiscalia = async (id, datos) => {
  try {
    const datoEditado = await clienteAxios.put(`/fiscalia/${id}`, datos)
    return {
      success: true,
      data: datoEditado.data,
    }
  } catch (error) {
    return {
      success: false,
      mensaje: error.response.data.msg,
    }
  }
}

const deleteFiscalias= async (id) => {
  const datos = {
    isDeleted: true,
  }
  try {
    const respuesta = await clienteAxios.delete(`/fiscalia/${id}`, datos).catch((error) => {
      console.error(error)
    })

    return respuesta.data
  } catch (error) {
    console.error(error)
  }
}

const obtenerFiscaliaPorId = async (id) => {
  try {
    const response = await clienteAxios.get(`/fiscalia/${id}`);
    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    return {
      success: false,
      mensaje: error.response.data.msg,
    }
  }
};


export { getFiscalias, saveFiscalia, updateFiscalia, deleteFiscalias, obtenerFiscaliaPorId }

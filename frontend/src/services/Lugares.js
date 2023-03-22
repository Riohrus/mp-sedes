import clienteAxios from "../config/axios"

const getLugares = async () => {
  const dataTable = []

  const resDatosTable = await clienteAxios
    .get("/lugares")
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

export default getLugares
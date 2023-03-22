const express = require('express');
const connection = require('./config/db'); // Importa la conexión
const fiscaliasRouter = require('./router/fiscalias');
const bodyParser = require('body-parser')
const cors = require("cors")

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(fiscaliasRouter)


async function test(){
  try {
    await connection.sequelize.authenticate();
    console.log("exitoso")
  }catch(error){
    console.error("fallo")
  }
  
}
  
test()


app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});

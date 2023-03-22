const SequelizeAuto = require("sequelize-auto");

const db = "MPDB";
const user = "MpAdmin";
const pass = "Mp301295";

const directory = "./model/MPDB"; // prevents the program from writing to disk
const schema = "dbo"; 
const tables = undefined; 
const config = {
    host: "localhost",
    dialect: "mssql",
    port: "1433",
    directory,
    caseModel: "c", // convert snake_case column names to camelCase field names: user_id -> userId
    caseFile: "c", // file names created for each model use camelCase.js not snake_case.js
    caseProp: "c", // convert snake_case column names to camelCase field names: user_id -> userId
    schema,
    tables,
    additional: {
        timestamps: false,
    },
};

const auto = new SequelizeAuto(db, user, pass, config);

auto.run(function (err) {
    if (err) throw err;
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});
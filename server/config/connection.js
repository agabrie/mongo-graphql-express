const mongoose = require('mongoose');
require('dotenv').config()
const isProduction = process.env.NODE_ENV === 'production';
const db_port = isProduction ? process.env.DB_PORT:(process.env.DB_DEV_PORT||27017);
const db_name = isProduction ? process.env.DB_NAME:process.env.DB_DEV_NAME;
const db_server = isProduction ? process.env.DB_SERVER:process.env.DB_DEV_SERVER;
const db_url = isProduction ? process.env.DB_URL:process.env.DB_DEV_URL;;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
var connectionString;
if(isProduction){
    connectionString = `mongodb+srv://${encodeURIComponent(db_user)}:${encodeURIComponent(db_password)}@${encodeURIComponent(db_server)}/${encodeURIComponent(db_name)}?retryWrites=true&w=majority`
}else{
    connectionString = `mongodb://${db_url}:${db_port}/${encodeURIComponent(db_name)}`;
}
mongoose.set('strictQuery', false);
mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(connectionData=>{
    let connection = connectionData.connections[0];
    
    console.log(`Connection [${connection._readyState}] to db [${connection.name}] on port [${connection.port}]`)
})

module.exports = mongoose.connection;
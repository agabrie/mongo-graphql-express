const express = require("express");
const dotenv =require("dotenv")
const cors = require("cors")
const db = require("./config/connection");
const apolloServer = require("./config/apollo");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


apolloServer.start(app,()=>{
    db.once("open", ()=>{
        app.listen(PORT, ()=>{
            console.log("Now listening on port: ", PORT)
        })
    })
})
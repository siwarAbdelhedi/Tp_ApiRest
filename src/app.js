const express = require('express');
const hostname = "0.0.0.0";
const port = 3000

const server = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://mongo/apinode");

server.use(express.json());
server.use(express.urlencoded());


const postRoute = require("./api/routes/postRoute");
postRoute(server);


server.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})

server.get("./api/routes/postRoute", postRoute.getAPost);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});

server.delete("/posts/:id", postRoute.deleteAPost);
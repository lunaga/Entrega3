const express = require('express');
const app = express();
const port = 8080 || process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () =>{
    console.log(`Servidor http escuchando en el puerto ${port}`)
})

module.exports= app;

const contenedor = require('./manejoDeArchivos.js')
const productos = require('./productos.js')
const app = require('./server.js')

const producto = new contenedor("./productos.txt")

app.get("/productos",(req,res)=>{
    producto.getAll()
    .then(resp => res.send(resp))
})

app.get("/productoRandom",(req,res)=>{
    producto.getAll()
    .then(resp => res.send(
        resp[
            Math.floor(Math.random()*resp.length)
        ]
    ))
})
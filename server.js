const express = require('express')
const { insertar, consultar, actualizar, eliminar } = require('./db.js')

const app = express()
app.use(express.static("static"))

app.post("/cancion", async(req, res) => {
    let body = "";
    req.on("data", (data) => body += data);

    req.on("end", async() => {
        console.log(body);
        body = JSON.parse(body);

        await insertar(body.cancion, body.artista, body.tono)
        res.status(201).json({ todo: "ok" })
    })
})


app.get('/canciones', async(req, res) => {
    let canciones = [];
    canciones = await consultar()
    res.json(canciones);
})

app.put('/cancion', async(req, res) => {
    let body = "";
    req.on("data", (data) => (body += data))

    req.on("end", async() => {
        console.log(body);
        body = JSON.parse(body);

        await actualizar(body.id, body.cancion, body.artista, body.tono)
        res.status(201).json({ todo: "ok" });
        console.log("base de datos actualizada  ", body)
    });
})

app.delete('/cancion', async(req, res) => {
    const id = req.query.id
    await eliminar(id)
    res.send({ todo: 'ok' })
})







app.listen(3000, () => console.log('servidor ejecutando en el puerto 3000'))
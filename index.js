const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./db/mongo');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión base de datos
getConnection();

// Rutas base
app.get('/', (req, res) => {
    res.send('¡Bienvenido al Monolito de Asesorías! Los servicios están activos.');
});

// Rutas
app.use('/api/clientes', require('./routes/cliente'));
app.use('/api/etapas', require('./routes/etapa'));
app.use('/api/universidades', require('./routes/universidad'));
app.use('/api/tipos-proyecto', require('./routes/tipoProyecto'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

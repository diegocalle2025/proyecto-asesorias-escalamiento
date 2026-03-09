const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./db/mongo');

// Registrar Modelos para que el populate funcione
require('./models/Cliente');
require('./models/Universidad');
require('./models/Etapa');
require('./models/TipoProyecto');
require('./models/Proyecto');

const app = express();
const port = 4000; // Microservicio en puerto diferente

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión base de datos
getConnection();

// Rutas de Microservicio Proyectos
app.use('/api/proyectos', require('./routes/proyecto'));

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

const express = require('express');
const app = express();
const port = 3000;

//Configuracion de pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', './views');


//Importacion del archivo de ruta para login
const loginRoutes = require('./routes/login');

//Usa las rutas para login
app.use(loginRoutes);

//Ruta para la pagina principal
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  });
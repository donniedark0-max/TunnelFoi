const express = require('express');
const bcrypt = require('bcrypt');
const collection = require('./config');

const app = express();
const port = 3000;

//Convertir data a formato de JSON
app.use(express.json());

app.use(express.urlencoded({ extended: false }));


// Configuración de pug como motor de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// Agrega esta línea antes de las rutas en tu archivo index.js
app.use(express.static('public'));


// Importación del archivo de ruta para login
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');

//importacion del archivo de la pagina principal
const chatroomRoutes = require('./routes/chatroom');

// Usa las rutas para login y signup
app.use(loginRoutes);
app.use('/signup',signupRoutes);
app.use(chatroomRoutes);

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('signup');
});

//Registro de usuario
app.post('/signup',async (req, res) => {

    const data = {
      name: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    //verificar si el usuario ya existe
    const existingUser = await collection.findOne({name: data.name});
    if(existingUser) {
      res.send('Usuario already exists');
    }else {
        //hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword; //reemplaza el hash con la contraseña original

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }

});

//login user
app.post('/login',async (req, res) => {
  try{
    const check = await collection.findOne({name: req.body.username});
    if(!check){
        res.send('Usuario no encontrado');

    }

    // compararar la contraseña (hash) con la ingresada
    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
      res.render('chatroom');
    } else{
      req.send("Contraseña incorrecta");
    }
  }catch{
    res.send('Campos incorrectos');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
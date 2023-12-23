const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb://localhost:27017/TunnelFoi');

//verificar conexion
connect.then(() => {
    console.log('Database connected Successfully');
})
.catch(( )=> {
    console.log('Database cannot be connected');
});

//crear un esquema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type:String,
        required: true
    }
});

//Parte coleccion
const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;
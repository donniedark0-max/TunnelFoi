const express = require('express');
const router = express.Router();

//Ruta para la pagina de login
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;

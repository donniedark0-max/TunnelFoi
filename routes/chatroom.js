const express = require('express');
const router = express.Router();

//Ruta para la pagina principal
router.get('/chatroom', (req, res) => {
    res.render('chatroom');
});

module.exports = router;
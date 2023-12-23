const express = require('express');
const router = express.Router();

//Ruta para la pagina de signup
router.get('/', (req, res) => {
    res.render('signup');
});

module.exports = router;
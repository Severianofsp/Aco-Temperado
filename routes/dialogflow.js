const express = require('express');
const router = express.Router();
const database = require('../firebase/index');
const IntentNameHandler = require('../controller/IntentNameHandler');
const Cadastro = require('../firebase/cadastro')

router.post("/",  async (req, res) => {
   IntentNameHandler(req, res)
})


module.exports = router;
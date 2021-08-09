var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');

router.get('/', async (req, res, next) => {
  res.send(await userController.list());
});

router.get('/:code', async (req, res, next) => {
  res.send(await userController.get(req.params.code));
});

router.post('/', async (req, res, next) => {
  const { code, name, birthday, photo } = req.body;
  console.log(req.body);
  res.send(await userController.create(code, name, birthday, photo));
});

router.put('/:code', async (req, res, next) => {
  res.send(await userController.update(req.params.code, req.body));
});

router.delete('/:code', async (req, res, next) => {
  res.send(await userController.delete(req.params.code));
});

module.exports = router;

const express = require('express');
const router = express.Router();
const ClientController = require('../controller/client.controller');

// Виведення всієї інформації з таблиці client
router.get('/', ClientController.findAll);
// Виведення інформації з таблиці client за ID
router.get('/:id', ClientController.findById);
// Додавання нової адреси доставки
router.post('/', ClientController.create);
// Оновлення адреси доставки
router.put('/:id', ClientController.update);
// Видалення адреси доставки
router.delete('/:id', ClientController.delete);

module.exports = router;

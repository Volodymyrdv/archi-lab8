const express = require('express');
const router = express.Router();
const СarController = require('../controller/car.controller');

// Виведення всієї інформації з таблиці car
router.get('/', СarController.findAll);
// Виведення інформації з таблиці car за ID
router.get('/:id', СarController.findById);
// Додавання нової адреси доставки
router.post('/', СarController.create);
// Оновлення адреси доставки
router.put('/:id', СarController.update);
// Видалення адреси доставки
router.delete('/:id', СarController.delete);

module.exports = router;

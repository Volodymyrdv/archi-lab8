const express = require('express');
const router = express.Router();
const CarDirectoryController = require('../controller/cardirectory.controller');

// Виведення всієї інформації з таблиці car
router.get('/', CarDirectoryController.findAll);
// Виведення інформації з таблиці car за ID
router.get('/:id', CarDirectoryController.findById);
// Додавання нової адреси доставки
router.post('/', CarDirectoryController.create);
// Оновлення адреси доставки
// router.put('/:id', CarDirectoryController.update);
router.post('/put/:id', CarDirectoryController.update);
// Видалення адреси доставки
// router.delete('/:id', CarDirectoryController.delete);
router.get('/delete/:id', CarDirectoryController.delete);

module.exports = router;

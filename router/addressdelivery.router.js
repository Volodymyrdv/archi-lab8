const express = require('express');
const router = express.Router();
const AddressDeliveryController = require('../controller/addressdelivery.controller');

// Виведення всієї інформації з таблиці addressdelivery
router.get('/', AddressDeliveryController.findAll);
// Виведення інформації з таблиці addressdelivery за ID
router.get('/:id', AddressDeliveryController.findById);
// Додавання нової адреси доставки
router.post('/', AddressDeliveryController.create);
// Оновлення адреси доставки
router.put('/:id', AddressDeliveryController.update);
// Видалення адреси доставки
router.delete('/:id', AddressDeliveryController.delete);

module.exports = router;

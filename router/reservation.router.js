const express = require('express');
const router = express.Router();
const ReservationController = require('../controller/reservation.controller');

// Виведення всієї інформації з таблиці reservation
router.get('/', ReservationController.findAll);
// Виведення інформації з таблиці reservation за ID
router.get('/:id', ReservationController.findById);
// Додавання нової адреси доставки
router.post('/', ReservationController.create);
// Оновлення адреси доставки
router.put('/:id', ReservationController.update);
// Видалення адреси доставки
router.delete('/:id', ReservationController.delete);

module.exports = router;

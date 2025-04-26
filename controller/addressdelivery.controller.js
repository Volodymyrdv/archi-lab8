const AddressDelivery = require('../model/addressdelivery.model');

// Виведення всієї інформації з таблиці addressdelivery
exports.findAll = function (req, res) {
	AddressDelivery.findAll(function (err, addressdelivery) {
		if (err) {
			res.send(err);
		} else {
			res.send(addressdelivery);
		}
	});
};

// Виведення інформації з таблиці addressdelivery за ID
exports.findById = function (req, res) {
	AddressDelivery.findById(req.params.id, function (err, addressdelivery) {
		if (err) {
			res.send(err);
		} else {
			res.send(addressdelivery);
		}
	});
};

// Додавання нової адреси доставки
exports.create = function (req, res) {
	const newAddressDelivery = new AddressDelivery(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		AddressDelivery.create(newAddressDelivery, function (err, addressdelivery) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					error: false,
					message: 'AddressDelivery created',
					data: addressdelivery
				});
			}
		});
	}
};

// Оновлення адреси доставки
exports.update = function (req, res) {
	const newAddressDelivery = new AddressDelivery(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		AddressDelivery.update(req.params.id, newAddressDelivery, function (err, addressdelivery) {
			if (err) {
				res.send(err);
			} else {
				res.json({
					error: false,
					message: 'AddressDelivery updated',
					data: addressdelivery
				});
			}
		});
	}
};

// Видалення адреси доставки
exports.delete = function (req, res) {
	AddressDelivery.delete(req.params.id, function (err, addressdelivery) {
		if (err) {
			res.send(err);
		} else {
			res.json({
				error: false,
				message: 'AddressDelivery deleted'
			});
		}
	});
};

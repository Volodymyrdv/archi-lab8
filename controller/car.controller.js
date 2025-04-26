const Car = require('../model/car.model');

exports.findAll = function (req, res) {
	Car.findAll(function (err, cars) {
		if (err) {
			res.send(err);
		} else {
			res.send(cars);
		}
	});
};

exports.findById = function (req, res) {
	Car.findById(req.params.id, function (err, car) {
		if (err) {
			res.send(err);
		} else {
			res.send(car);
		}
	});
};

exports.create = function (req, res) {
	const newCar = new Car(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Car.create(newCar, function (err, car) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Car created', data: car });
			}
		});
	}
};

exports.update = function (req, res) {
	const updatedCar = new Car(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Car.update(req.params.id, updatedCar, function (err, car) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Car updated', data: car });
			}
		});
	}
};

exports.delete = function (req, res) {
	Car.delete(req.params.id, function (err, car) {
		if (err) {
			res.send(err);
		} else {
			res.json({ error: false, message: 'Car deleted' });
		}
	});
};

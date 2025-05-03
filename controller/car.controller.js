const Car = require('../model/car.model');
const CarDirectory = require('../model/cardirectory.model');

exports.findAll = function (req, res) {
	Car.findAll(function (err, cars) {
		if (err) {
			res.send(err);
		} else {
			CarDirectory.findAll(function (err, cardirectories) {
				if (err) {
					res.send(err);
				} else {
					res.render('car.ejs', { cars: cars, cardirectories: cardirectories });
				}
			});
		}
	});
};

exports.findById = function (req, res) {
	Car.findById(req.params.id, function (err, car) {
		if (err) {
			res.send(err);
		} else {
			res.render('car_edit.ejs', { car: car[0] });
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
				res.redirect('/api/car');
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
				res.redirect('/api/car');
			}
		});
	}
};

exports.delete = function (req, res) {
	Car.delete(req.params.id, function (err, car) {
		if (err) {
			res.send(err);
		} else {
			res.redirect('/api/car');
		}
	});
};

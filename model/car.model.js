var connection = require('../config/config.bd');

var Car = function (car) {
	this.ID = car.ID;
	this.IdMark = car.IdMark;
	this.CarType = car.CarType;
	this.CarModel = car.CarModel;
	this.CarColor = car.CarColor;
	this.YearOfManufacture = car.YearOfManufacture;
	this.DailyRentalPrice = car.DailyRentalPrice;
};

Car.create = function (newCar, result) {
	connection.query('INSERT INTO car SET ?', newCar, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res.insertId);
		}
	});
};

Car.findById = function (id, result) {
	connection.query('SELECT * FROM car WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Car.findAll = function (result) {
	connection.query('SELECT * FROM car', function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Car.update = function (id, car, result) {
	connection.query(
		'UPDATE car SET IdMark = ?, CarType = ?, CarModel = ?, CarColor = ?, YearOfManufacture = ?, DailyRentalPrice = ? WHERE ID = ?',
		[
			car.IdMark,
			car.CarType,
			car.CarModel,
			car.CarColor,
			car.YearOfManufacture,
			car.DailyRentalPrice,
			id
		],
		function (err, res) {
			if (err) {
				console.log('error: ', err);
				result(null, err);
			} else {
				result(null, res);
			}
		}
	);
};

Car.delete = function (id, result) {
	connection.query('DELETE FROM car WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = Car;

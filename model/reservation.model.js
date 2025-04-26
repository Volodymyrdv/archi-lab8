var connection = require('../config/config.bd');

var Reservation = function (reservation) {
	this.ID = reservation.ID;
	this.IdClient = reservation.IdClient;
	this.IdCar = reservation.IdCar;
	this.RentalStartDate = reservation.RentalStartDate;
	this.RentalEndDate = reservation.RentalEndDate;
	this.TotalPrice = reservation.TotalPrice;
};

Reservation.create = function (newReservation, result) {
	connection.query('INSERT INTO reservation SET ?', newReservation, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res.insertId);
		}
	});
};

Reservation.findById = function (id, result) {
	connection.query('SELECT * FROM reservation WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Reservation.findAll = function (result) {
	connection.query('SELECT * FROM reservation', function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Reservation.update = function (id, reservation, result) {
	connection.query(
		'UPDATE reservation SET IdClient = ?, IdCar = ?, RentalStartDate = ?, RentalEndDate = ?, TotalPrice = ? WHERE ID = ?',
		[
			reservation.IdClient,
			reservation.IdCar,
			reservation.RentalStartDate,
			reservation.RentalEndDate,
			reservation.TotalPrice,
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

Reservation.delete = function (id, result) {
	connection.query('DELETE FROM reservation WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = Reservation;

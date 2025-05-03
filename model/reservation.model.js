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
	connection.query(
		'SELECT DailyRentalPrice FROM car WHERE ID = ?',
		newReservation.IdCar,
		function (err, res) {
			if (err || res.length === 0) {
				console.log('error: ', err);
				result(err || { message: 'Car not found' }, null);
				return;
			}

			const pricePerDay = res[0].DailyRentalPrice;

			const startDate = new Date(newReservation.RentalStartDate);
			const endDate = new Date(newReservation.RentalEndDate);
			const timeDiff = endDate.getTime() - startDate.getTime();
			const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

			newReservation.TotalPrice = pricePerDay * days;
			newReservation.IdClient = 1; // Заміна на ID клієнта, якщо потрібно

			connection.query('INSERT INTO reservation SET ?', newReservation, function (err, res) {
				if (err) {
					console.log('error: ', err);
					result(err, null);
				} else {
					result(null, res.insertId);
				}
			});
		}
	);
};

Reservation.findById = function (id, result) {
	connection.query('SELECT * FROM reservation WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			if (res.length > 0) {
				res[0].RentalStartDate = new Date(res[0].RentalStartDate).toISOString().split('T')[0];
				res[0].RentalEndDate = new Date(res[0].RentalEndDate).toISOString().split('T')[0];
			}
			result(null, res);
		}
	});
};

Reservation.findAll = function (result) {
	connection.query(
		`SELECT 
					reservation.ID AS ReservationID, 
					cardirectory.MarkName,
					car.CarType,
					car.CarModel,
					reservation.RentalStartDate, 
					reservation.RentalEndDate, 
					reservation.TotalPrice
			FROM reservation
			INNER JOIN car ON reservation.IdCar = car.ID
			INNER JOIN cardirectory ON car.IdMark = cardirectory.ID`,
		function (err, res) {
			if (err) {
				console.log('error: ', err);
				result(null, err);
			} else {
				// Форматуємо дати перед поверненням
				res.forEach((reservation) => {
					reservation.RentalStartDate = new Date(reservation.RentalStartDate)
						.toISOString()
						.split('T')[0];
					reservation.RentalEndDate = new Date(reservation.RentalEndDate)
						.toISOString()
						.split('T')[0];
				});
				result(null, res);
			}
		}
	);
};

// Reservation.update = function (id, reservation, result) {
// 	connection.query(
// 		'UPDATE reservation SET IdClient = ?, IdCar = ?, RentalStartDate = ?, RentalEndDate = ?, TotalPrice = ? WHERE ID = ?',
// 		[
// 			reservation.IdClient,
// 			reservation.IdCar,
// 			reservation.RentalStartDate,
// 			reservation.RentalEndDate,
// 			reservation.TotalPrice,
// 			id
// 		],
// 		function (err, res) {
// 			if (err) {
// 				console.log('error: ', err);
// 				result(null, err);
// 			} else {
// 				result(null, res);
// 			}
// 		}
// 	);
// };

Reservation.update = function (id, updatedReservation, result) {
	connection.query(
		'SELECT DailyRentalPrice FROM car WHERE ID = ?',
		updatedReservation.IdCar,
		function (err, res) {
			if (err || res.length === 0) {
				console.log('error: ', err);
				result(err || { message: 'Car not found' }, null);
				return;
			}

			const pricePerDay = res[0].DailyRentalPrice;

			const startDate = new Date(updatedReservation.RentalStartDate);
			const endDate = new Date(updatedReservation.RentalEndDate);
			const timeDiff = endDate.getTime() - startDate.getTime();
			const days = Math.ceil(timeDiff / (1000 * 3600 * 24)) || 1;

			updatedReservation.TotalPrice = pricePerDay * days;
			updatedReservation.IdClient = 1; // Заміна на ID клієнта, якщо потрібно

			connection.query(
				'UPDATE reservation SET IdClient = ?, IdCar = ?, RentalStartDate = ?, RentalEndDate = ?, TotalPrice = ? WHERE ID = ?',
				[
					updatedReservation.IdClient,
					updatedReservation.IdCar,
					updatedReservation.RentalStartDate,
					updatedReservation.RentalEndDate,
					updatedReservation.TotalPrice,
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

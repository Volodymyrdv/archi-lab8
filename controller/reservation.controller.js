const Reservation = require('../model/reservation.model');

exports.findAll = function (req, res) {
	Reservation.findAll(function (err, reservations) {
		if (err) {
			res.send(err);
		} else {
			res.send(reservations);
		}
	});
};

exports.findById = function (req, res) {
	Reservation.findById(req.params.id, function (err, reservation) {
		if (err) {
			res.send(err);
		} else {
			res.send(reservation);
		}
	});
};

exports.create = function (req, res) {
	const newReservation = new Reservation(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Reservation.create(newReservation, function (err, reservation) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Reservation created', data: reservation });
			}
		});
	}
};

exports.update = function (req, res) {
	const updatedReservation = new Reservation(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Reservation.update(req.params.id, updatedReservation, function (err, reservation) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Reservation updated', data: reservation });
			}
		});
	}
};

exports.delete = function (req, res) {
	Reservation.delete(req.params.id, function (err, reservation) {
		if (err) {
			res.send(err);
		} else {
			res.json({ error: false, message: 'Reservation deleted' });
		}
	});
};

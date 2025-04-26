const CarDirectory = require('../model/cardirectory.model');

exports.findAll = function (req, res) {
	CarDirectory.findAll(function (err, cardirectories) {
		if (err) {
			res.send(err);
		} else {
			res.send(cardirectories);
		}
	});
};

exports.findById = function (req, res) {
	CarDirectory.findById(req.params.id, function (err, cardirectory) {
		if (err) {
			res.send(err);
		} else {
			res.send(cardirectory);
		}
	});
};

exports.create = function (req, res) {
	const newCarDirectory = new CarDirectory(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		CarDirectory.create(newCarDirectory, function (err, cardirectory) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'CarDirectory created', data: cardirectory });
			}
		});
	}
};

exports.update = function (req, res) {
	const updatedCarDirectory = new CarDirectory(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		CarDirectory.update(req.params.id, updatedCarDirectory, function (err, cardirectory) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'CarDirectory updated', data: cardirectory });
			}
		});
	}
};

exports.delete = function (req, res) {
	CarDirectory.delete(req.params.id, function (err, cardirectory) {
		if (err) {
			res.send(err);
		} else {
			res.json({ error: false, message: 'CarDirectory deleted' });
		}
	});
};

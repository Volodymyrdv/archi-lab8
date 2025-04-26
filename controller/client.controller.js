const Client = require('../model/client.model');

exports.findAll = function (req, res) {
	Client.findAll(function (err, clients) {
		if (err) {
			res.send(err);
		} else {
			res.send(clients);
		}
	});
};

exports.findById = function (req, res) {
	Client.findById(req.params.id, function (err, client) {
		if (err) {
			res.send(err);
		} else {
			res.send(client);
		}
	});
};

exports.create = function (req, res) {
	const newClient = new Client(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Client.create(newClient, function (err, client) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Client created', data: client });
			}
		});
	}
};

exports.update = function (req, res) {
	const updatedClient = new Client(req.body);
	if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
		res.status(400).send({ error: true, message: 'Please provide all required fields' });
	} else {
		Client.update(req.params.id, updatedClient, function (err, client) {
			if (err) {
				res.send(err);
			} else {
				res.json({ error: false, message: 'Client updated', data: client });
			}
		});
	}
};

exports.delete = function (req, res) {
	Client.delete(req.params.id, function (err, client) {
		if (err) {
			res.send(err);
		} else {
			res.json({ error: false, message: 'Client deleted' });
		}
	});
};

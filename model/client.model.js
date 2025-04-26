var connection = require('../config/config.bd');

var Client = function (client) {
	this.ID = client.ID;
	this.FullName = client.FullName;
	this.Phone = client.Phone;
	this.Email = client.Email;
	this.LicenseNumber = client.LicenseNumber;
	this.IdAddressDelivery = client.IdAddressDelivery;
};

Client.create = function (newClient, result) {
	connection.query('INSERT INTO client SET ?', newClient, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res.insertId);
		}
	});
};

Client.findById = function (id, result) {
	connection.query('SELECT * FROM client WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

Client.findAll = function (result) {
	connection.query('SELECT * FROM client', function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

Client.update = function (id, client, result) {
	connection.query(
		'UPDATE client SET FullName = ?, Phone = ?, Email = ?, LicenseNumber = ?, IdAddressDelivery = ? WHERE ID = ?',
		[
			client.FullName,
			client.Phone,
			client.Email,
			client.LicenseNumber,
			client.IdAddressDelivery,
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

Client.delete = function (id, result) {
	connection.query('DELETE FROM client WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = Client;

var connection = require('../config/config.bd');

var AddressDelivery = function (addressdelivery) {
	this.ID = addressdelivery.ID;
	this.City = addressdelivery.City;
	this.District = addressdelivery.District;
	this.Street = addressdelivery.Street;
	this.BuildingNumber = addressdelivery.BuildingNumber;
};

AddressDelivery.create = function (newAddressDelivery, result) {
	connection.query('INSERT INTO addressdelivery SET ?', newAddressDelivery, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			console.log(res.insertId);
			result(null, res.insertId);
		}
	});
};

AddressDelivery.findById = function (id, result) {
	connection.query('SELECT * FROM addressdelivery WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

AddressDelivery.findAll = function (result) {
	connection.query('SELECT * FROM addressdelivery', function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			console.log('AddressDelivery : ', res);
			result(null, res);
		}
	});
};

AddressDelivery.update = function (id, addressdelivery, result) {
	connection.query(
		'UPDATE addressdelivery SET City = ?, District = ?, Street = ?, BuildingNumber = ? WHERE ID = ?',
		[
			addressdelivery.City,
			addressdelivery.District,
			addressdelivery.Street,
			addressdelivery.BuildingNumber,
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
AddressDelivery.delete = function (id, result) {
	connection.query('DELETE FROM addressdelivery WHERE ID = ?', [id], function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = AddressDelivery;

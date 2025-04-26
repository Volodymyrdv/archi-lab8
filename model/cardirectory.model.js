var connection = require('../config/config.bd');

var CarDirectory = function (cardirectory) {
	this.ID = cardirectory.ID;
	this.MarkName = cardirectory.MarkName;
};

CarDirectory.create = function (newCarDirectory, result) {
	connection.query('INSERT INTO cardirectory SET ?', newCarDirectory, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res.insertId);
		}
	});
};

CarDirectory.findById = function (id, result) {
	connection.query('SELECT * FROM cardirectory WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(err, null);
		} else {
			result(null, res);
		}
	});
};

CarDirectory.findAll = function (result) {
	connection.query('SELECT * FROM cardirectory', function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

CarDirectory.update = function (id, cardirectory, result) {
	connection.query(
		'UPDATE cardirectory SET MarkName = ? WHERE ID = ?',
		[cardirectory.MarkName, id],
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

CarDirectory.delete = function (id, result) {
	connection.query('DELETE FROM cardirectory WHERE ID = ?', id, function (err, res) {
		if (err) {
			console.log('error: ', err);
			result(null, err);
		} else {
			result(null, res);
		}
	});
};

module.exports = CarDirectory;

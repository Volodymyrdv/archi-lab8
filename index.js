const express = require('express');
const bodyParser = require('body-parser');

const PORT = 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.'));

app.get('/', (req, res) => {
	res.status(200).json('Сервер працює');
});

const AddressDeliveryRouter = require('./router/addressdelivery.router');
app.use('/api/addressdelivery', AddressDeliveryRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

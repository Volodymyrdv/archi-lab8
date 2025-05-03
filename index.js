const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 5000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('.'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
	res.render('index.ejs');
});

const AddressDeliveryRouter = require('./router/addressdelivery.router');
app.use('/api/addressdelivery', AddressDeliveryRouter);
const CarDirectoryRouter = require('./router/cardirectory.router');
app.use('/api/cardirectory', CarDirectoryRouter);
const CarRouter = require('./router/car.router');
app.use('/api/car', CarRouter);
const ClientRouter = require('./router/client.router');
app.use('/api/client', ClientRouter);
const ReservationRouter = require('./router/reservation.router');
app.use('/api/reservation', ReservationRouter);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

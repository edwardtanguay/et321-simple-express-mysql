import express from 'express';
import mysql from 'mysql';
import dotenv from 'dotenv';

const app = express();
const port = 3032;
dotenv.config();

app.get('/', (req, res) => {
	res.send('test api');
});

app.get('/customers', (req, res) => {
	const connection = mysql.createConnection({
		host: 'localhost',
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: 'northwind'
	});
	connection.connect((err) => {
		if (err) throw err;
		const sql = 'SELECT company,last_name,first_name FROM customers';
		connection.query(sql, (err, records) => {
			if (err) throw err;
			res.send(records);
		});
	});
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});
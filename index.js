const app = require('express')();
const bodyParser = require('body-parser');
const router = require('./routes/auth_routes');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.db_connect, {
	useMongoClient: true
});
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));

router(app);

app.listen(PORT, (err) => {
	if(err) return console.log('Error Starting Server');
	console.log('Server be listening on localhost: ' + PORT);
})
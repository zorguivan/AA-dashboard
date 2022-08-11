const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const auth = require('./routes/user.routes');
var paymentRouter = require('./routes/payment.routes');

app.use(express.static('files'));

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/files.routes")(app);
require("./routes/creditCards.routes")(app);
require("./routes/services.routes")(app);
app.use('/api', auth)

app.use('/payment', paymentRouter);

app.set('view engine', 'jade');

//mongo
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/hello", (req, res) => {
  res.json({ message: "Hello" });
});

// set port, listen for requests
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
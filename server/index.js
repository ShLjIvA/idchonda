const express = require("express");
const bodyParser = require('body-parser');

const app = express();

const http = require("http").Server(app);
const cors = require("cors");

// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

const status = {
  id: "",
  km: "",
  lat: "",
  lng: "",
  date: ""
};

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

app.get("/", (req, res, next) => {
  res.json(status);
});

app.post("/", (req, res) => {
  console.log(req.body);
  console.log(status);

  status.id = req.body.id;
  status.km = req.body.km;
  status.lat = req.body.lat;
  status.lng = req.body.lng;
  status.date = new Date();

  console.log(status);

  io.emit('status', status);

  res.send("Saved.");
});

http.listen(process.env.PORT || 3000, () => {

  console.log("Listening...");

});
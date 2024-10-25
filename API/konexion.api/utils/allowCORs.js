// allowCORs.js

const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.100.245:3000",
  "http://192.168.100.13:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

module.exports = { corsOptions };

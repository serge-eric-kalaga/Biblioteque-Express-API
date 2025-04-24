// ============ Modules
const express = require("express");
const { connect_db } = require("./configs/Database");

// ============ Import Middlewares
const LoginRequired = require("./middlewares/Auth");
const loggerMiddleware = require("./middlewares/Logger");
const globalErrorHandler = require("./middlewares/ErrorHandler");
const Response = require("./middlewares/Response");
const { InitUser } = require("./configs/InitData");
const { updateMetrics, Metrics } = require('./middlewares/Metrics');

// ============ Import Routes
const userRouter = require("./routes/User.route");

const PORT = process.env.PORT;

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use(Response);
app.use(updateMetrics);
// app.use(pino)

app.get("/", (req, res, next) => {
  res.json({
    succes: true,
  });
});


// My routers
app.use("/users", userRouter);
// app.use("/api-docs", swaggerRouter);


app.get("/error-test", (req, res, next) => {
  const error = new Error("Test Error");
  error.statusCode = 500;
  // next(error);
  throw error;
});

app.get('/metrics', Metrics);

app.all("/", (req, res, next) => {
  res.status(404).Response({ message: "Url non trouvée" });
});


app.use(globalErrorHandler);


app.listen(PORT, "0.0.0.0", async () => {
  console.log(`App running on http://localhost:${PORT}`);

  setTimeout(async () => {
    await connect_db();
  }, 3000);

  setTimeout(async () => {
    await InitUser();
  }, 5000);
});



// app.listen(3010, () => {
//   console.log('Prometheus Metrics server listening on http://localhost:3010');
// })

// app.listen(3011, () => {
//   console.log('Fibonacci API Server listening on http://localhost:3011');
// })
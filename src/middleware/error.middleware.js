exports.errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // mongoose validation error
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(", ");
    statusCode = 400;
  }

  // duplicate key
  if (err.code === 11000) {
    message = "Duplicate field value";
    statusCode = 400;
  }

  // invalid object id
  if (err.name === "CastError") {
    message = "Invalid resource ID";
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

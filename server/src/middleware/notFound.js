const notFound = (req, res, next) => {
  console.log(`🔍 Route not found: ${req.method} ${req.originalUrl}`);
  
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports = {
  notFound
};
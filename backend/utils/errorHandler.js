const handleError = (res, error) => {
  console.error(error.message);
  return res.status(500).json({ message: "Internal Server Error" });
};

module.exports = handleError;

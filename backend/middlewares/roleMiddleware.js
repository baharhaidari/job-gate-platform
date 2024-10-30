const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ message: "No user or role found" });
    }

    const { role } = req.user;

    if (!roles.includes(role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

module.exports = roleMiddleware;

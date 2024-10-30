// const jwt = require("jsonwebtoken");

// exports.generateToken = (userId) => {
//   const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//     expiresIn: "3h",
//   });

//   console.log(token);
// };

const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role }, // Include role in the token
    process.env.JWT_SECRET,
    { algorithm: "HS256" },
    { expiresIn: "1h" }
  );
};

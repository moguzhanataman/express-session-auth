const crypto = require("crypto");
const result = crypto.pbkdf2(
  "123",
  "salt",
  310000,
  32,
  "sha256",
  function (err, hashedPassword) {
    // if (err) {
    //   return cb(err);
    // }
    // if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
    //   return cb(null, false, {
    //     message: "Incorrect username or password.",
    //   });
    // }
    // return cb(null, row);
    console.log(hashedPassword.toString());
  }
);

// console.log(result);

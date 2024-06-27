const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://vipultechdev:wrrFPK6PtYEf9kUi@invact.wz6jnfm.mongodb.net/?retryWrites=true&w=majority&appName=invact"
);
module.exports = {
  connection,
};

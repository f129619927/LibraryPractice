const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, require: true, minlength: 3, maxlength: 50 },
  googleID: { type: String },
  thumbnail: { type: String },
  email: { type: String, require: true, minlength: 6, maxlength: 50 },
  password: { type: String, minlength: 8, maxlength: 255 },
  role: { type: String, default: "User", enum: ["User", "Admin"] },
  data: { type: Date, default: Date.now },
});

userSchema.methods.isUser = function () {
  return this.role == "User";
};
userSchema.methods.isAdmin = function () {
  return this.role == "Admin";
};
userSchema.pre("save", async function (next) {
  if ((this.password && this.isNew) || this.isModified("password")) {
    const result = await bcrypt.hash(this.password, 12);
    this.password = result;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);

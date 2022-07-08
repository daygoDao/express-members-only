const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 50 },
  last_name: { type: String, required: true, maxLength: 50 },
  username: { type: String, required: true, maxLength: 50 },
  password: { type: String, required: true, maxLength: 30 },
  membership_status: { type: String, required: true },
});

UserSchema.virtual("fullname").get(function () {
    const fullname = "";
    if (this.first_name && this.last_name) {
        fullname = `${this.last_name}, ${this.first_name}` 
    }
    if (!this.first_name || !this.last_name) {
        fullname = '';
    }
    return fullname;
})



module.exports = mongoose.model("User", UserSchema)

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, require },
    phone: { type: String },
    zipCode: { type: String, require },
    file: { type: String },
    password: { type: String, require },
    location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], index: "2dsphere" }
    }
}, {
    timestamps: true,
    versionKey: false,
})

UserSchema.pre("save", async function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next;
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("user", UserSchema);

// Name:
// Email:Required
// Pass:Required
// Phone:
// Mobile: Required
// zipCode: Required
// Profile Pic

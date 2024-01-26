const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const bcrypt = require("bcrypt");

// const { salt } = require("../../config/default");
const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["admin", "user"],
      required: true,
      default: "tester",
    },
    image: { type: String, required: true },
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    sentFriendRequest: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

/* A pre-save hook that will hash the password before saving it to the database. */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  return next();
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const MessageSchema = new Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    messageType: { type: String, enum: ["text", "image"] },
    message: String,
    ImageUrl: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

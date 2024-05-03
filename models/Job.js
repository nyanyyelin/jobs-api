const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      require: [true, "Please provide company name"],
      maxLength: 50,
    },
    position: {
      type: String,
      require: [true, "Please provide position"],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ["interivew", "pending", "declined"],
      default: "pending",
    },
    createdBy: {
      // tying the job model to user model
      type: mongoose.Types.ObjectId,
      ref: "User", // model referencing
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);

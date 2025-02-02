import mongoose from "mongoose";
import moment from "moment";

const ChallengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    challengeTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "challengeType",
      default: "611a6e1343ceb054480c5538",
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    stakedAfricoins: {
      type: Number,
      default: 0,
    },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
    },
    opponentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: [
        "finished",
        "pending",
        "rejected",
        "accepted",
        "cancelled",
        "timedout",
      ],
      default: "pending",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
    examblyPastQuestionExamId: {
      type: Number,
    },
    numberOfQuestions: {
      type: Number,
    },
    timeSpan: {
      type: Number,
    },
    entryFee: {
      type: Number,
    },
    prize: {
      type: String,
    },
    subjects: {
      type: String,
    },
    challengeImageUrl: { type: String },
    description: { type: String },
    startDate: {
      type: Date,
      default: new Date(),
    },
    endDate: {
      type: Date,
      default: moment(new Date()).add(7, "d"),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Challenge = mongoose.model("challenge", ChallengeSchema);

export default Challenge;

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const InnovationSchema = mongoose.Schema(
    {
        //innovation name
        innovation: { type: String, unique: true },
        status: { type: String },
        team: { type: String },
        // Array of questions
        Questions: [
            {
                Question: { type: String },
                Answer: { type: String },
                Judges: [
                    {
                        Judge: { type: String },
                        QuestionId: { type: String },
                        Points: { type: String },
                    }
                ]
            }
            ]
    },
  {
    timestamps: true,
  }
);


InnovationSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Innovation", InnovationSchema);

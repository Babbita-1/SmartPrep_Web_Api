import mongoose from 'mongoose';

const PracticeTestSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  title: { type: String, required: true },
  questions: [
    {
      questionText: String,
      options: [String], // multiple choice options
      correctAnswer: Number // index of the correct options
    }
  ]
}, { timestamps: true });

const PracticeTest = mongoose.model('PracticeTest', PracticeTestSchema);
export default PracticeTest;

//practice
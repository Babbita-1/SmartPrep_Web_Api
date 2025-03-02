import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PracticeTest',
    required: true
  },
  answers: [Number], 
  score: Number, 
  completedAt: { type: Date, default: Date.now }
});

const Attempt = mongoose.model('Attempt', AttemptSchema);
export default Attempt;

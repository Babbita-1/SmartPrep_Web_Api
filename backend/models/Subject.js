import mongoose from 'mongoose';
import './Resource.js'; 
import './PracticeTest.js'; 

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gradeLevel: { type: Number, required: true },
  resources: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource'
    }
  ],
  tests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PracticeTest'
    }
  ]
}, { timestamps: true });

const Subject = mongoose.model('Subject', SubjectSchema);
export default Subject;

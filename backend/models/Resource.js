import mongoose from 'mongoose';

const ResourceSchema = new mongoose.Schema({
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true
  },
  title: { type: String, required: true },
  type: { type: String, required: true }, // "video" / "document" / "link"
  url: { type: String, required: true },
}, { timestamps: true });

const Resource = mongoose.model('Resource', ResourceSchema);
export default Resource;

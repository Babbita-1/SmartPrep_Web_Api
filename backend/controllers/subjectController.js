import Subject from '../models/Subject.js';

//  Create a new subject (Admin Only)
export const createSubject = async (req, res) => {
  try {
    const { name, gradeLevel } = req.body;

    const existingSubject = await Subject.findOne({ name, gradeLevel });
    if (existingSubject) {
      return res.status(400).json({ error: 'Subject already exists' });
    }

    const newSubject = new Subject({ name, gradeLevel });
    await newSubject.save();

    return res.status(201).json(newSubject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

//  Get all subjects (Admin & Public)
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().populate('resources').populate('tests');
    return res.json(subjects);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

//  Delete a subject (Admin Only)
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);
    if (!deletedSubject) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    return res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export const getSubjectsByGrade = async (req, res) => {
  try {
    const { gradeLevel } = req.params;
    const subjects = await Subject.find({ gradeLevel: gradeLevel })
      .populate('resources')
      .populate('tests');

    if (!subjects.length) {
      return res.status(404).json({ error: 'No subjects found for this grade level' });
    }
    
    res.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

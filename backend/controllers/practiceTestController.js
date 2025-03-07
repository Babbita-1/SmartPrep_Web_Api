import Attempt from '../models/Attempt.js';
import PracticeTest from '../models/PracticeTest.js';
import Subject from '../models/Subject.js';

// ✅ Create Practice Test
export const createTest = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { title, questions } = req.body;

    // Ensure subject exists
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    // Create new test
    const newTest = new PracticeTest({ subjectId, title, questions });
    await newTest.save();

    // Link test to subject
    subject.tests.push(newTest._id);
    await subject.save();

    res.status(201).json(newTest);
  } catch (error) {
    console.error("Error creating practice test:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

//  Admin: Get All Tests
export const getAllTests = async (req, res) => {
  try {
    const tests = await PracticeTest.find().populate('subjectId', 'name gradeLevel');
    res.json(formatTestsByGradeAndSubject(tests));
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Test by ID
export const getTestById = async (req, res) => {
  try {
    const { testId } = req.params;

    console.log("Fetching test with ID:", testId);

    // Validate testId
    if (!testId || testId.length !== 24) {
      return res.status(400).json({ error: "Invalid test ID." });
    }

    // Find test and populate subject details
    const test = await PracticeTest.findById(testId).populate('subjectId', 'name gradeLevel');

    if (!test) {
      return res.status(404).json({ error: 'Practice test not found' });
    }

    res.json({
      _id: test._id,
      title: test.title,
      subject: test.subjectId ? test.subjectId.name : "Unknown Subject",
      gradeLevel: test.subjectId ? test.subjectId.gradeLevel : "Unknown Grade",
      questions: test.questions || [], // Ensure questions array exists
    });
  } catch (error) {
    console.error('Error fetching test by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

//  Get Tests by Grade
export const getTestsByGrade = async (req, res) => {
  try {
    const { gradeLevel } = req.params;

    const subjects = await Subject.find({ gradeLevel });
    const subjectIds = subjects.map(subj => subj._id);

    const tests = await PracticeTest.find({ subjectId: { $in: subjectIds } }).populate('subjectId', 'name gradeLevel');

    res.json(formatTestsByGradeAndSubject(tests));
  } catch (error) {
    console.error("Error fetching tests:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

//  Get Tests for a Subject
export const getTestsBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const tests = await PracticeTest.find({ subjectId });
    return res.json(tests);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

//  Submit Test Attempt
export const submitTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const { answers } = req.body;

    console.log("Submitting test for ID:", testId);
    console.log("Received answers:", answers);

    // Validate testId
    if (!testId || testId.length !== 24) {
      return res.status(400).json({ error: "Invalid test ID." });
    }

    // Find the test
    const test = await PracticeTest.findById(testId);
    if (!test) return res.status(404).json({ error: 'Practice test not found' });

    // Validate answers array
    if (!Array.isArray(answers) || answers.length !== test.questions.length) {
      return res.status(400).json({ error: "Invalid answers. Ensure all questions have an answer." });
    }

    // Calculate the score
    let score = 0;
    test.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    // Save attempt
    const attempt = new Attempt({ userId: req.user.id, testId, answers, score });
    await attempt.save();

    return res.status(201).json({ score, total: test.questions.length, attemptId: attempt._id });
  } catch (error) {
    console.error("Error submitting test:", error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Helper Function to Group Tests by Grade & Subject
const formatTestsByGradeAndSubject = (tests) => {
  return tests.reduce((acc, test) => {
    const subjectName = test.subjectId.name;
    const grade = test.subjectId.gradeLevel;

    if (!acc[grade]) acc[grade] = {};
    if (!acc[grade][subjectName]) acc[grade][subjectName] = [];

    acc[grade][subjectName].push({
      _id: test._id,
      title: test.title,
    });

    return acc;
  }, {});
};

//Link test to 
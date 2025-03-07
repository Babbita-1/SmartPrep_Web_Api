import Resource from '../models/Resource.js';
import Subject from '../models/Subject.js';

//  Add Resources (Admin Only)
export const createResource = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { title, type, url } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ error: 'Subject not found' });

    const newResource = new Resource({ subjectId, title, type, url });
    await newResource.save();

    subject.resources.push(newResource._id);
    await subject.save();

    res.status(201).json(newResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: 'Server error' });
  }
};

//  Get Resource by Subject (Public)
export const getResourcesBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const resources = await Resource.find({ subjectId });

    if (!resources.length) {
      return res.status(404).json({ error: 'No resources found for this subject' });
    }

    return res.json(resources);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

//  Delete Resource (Admin Only)
export const deleteResource = async (req, res) => {
  try {
    const { resourceId } = req.params;
    const deletedResource = await Resource.findByIdAndDelete(resourceId);
    if (!deletedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    return res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to delete resource' });
  }
};

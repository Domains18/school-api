const router = require('express').Router();

const { Student, Teacher, Guardian } = require('../models/registerSchema');
const {teacherProfile, studentProfile, guardianProfile, StudentProfile} = require('../models/profileSchema');

router.post('/student', async (req, res) => {
    const { email, password } = req.body;
    let student = await Student.findOne({ email, password });
    if (student) {
        let studentProfile = await StudentProfile.findOne({ studentId: student._id });
        return res.json({ data: studentProfile, profile: studentProfile });
    } else return res.status(404).json("Student not found");
});



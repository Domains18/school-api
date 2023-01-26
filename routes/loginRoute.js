const router = require('express').Router();

const { Student, Teacher, Guardian } = require('../models/registerSchema');
const { teacherProfile, studentProfile, guardianProfile, StudentProfile, TeacherProfile, GuardianProfile } = require('../models/profileSchema');

router.post('/student', async (req, res) => {
    const { email, password } = req.body;
    let student = await Student.findOne({ email, password });
    if (student) {
        let studentProfile = await StudentProfile.findOne({ studentId: student._id });
        return res.json({ data: studentProfile, profile: studentProfile });
    } else return res.status(404).json("Student not found");
});

router.post('/teacher', async (req, res) => {
    const { email, password } = req.body;
    let teacher = await TeacherProfile.findOne({ email, password });
    if (teacher) {
        let teacherProfile = await TeacherProfile.findOne({ teacherId: teacher._id });
        return res.json({ data: teacherProfile, profile: teacherProfile });
    } else return res.status(404).json("Teacher not found");
});

router.post('/parent', async (req, res) => {
    const { email, password } = req.body;
    let guardian = await GuardianProfile.find({ email, password });
    if (guardian) {
        let guardianProfile = await GuardianProfile.findOne({ guardianId: guardian._id });
        return res.json({ data: guardianProfile, profile: guardianProfile });

    } else return res.status(404).json("Guardian not found");
});

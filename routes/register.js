const router = require('express').Router();

const { Student, Teacher, Guardian } = require("../models/registerSchema");
const { TeacherProfile, StudentProfile, ParentProfile } = require("../models/profileSchema");

router.post("/student", async (req, res) => {
    const { name, email, password } = req.body;
    const student = new Student({ name, email, password });
    student.save();

    const studentProfile = new StudentProfile({ studentId: student._id, studentName: name });
    studentProfile.save()
    res.json("Student details succesfully recorded");
    
});

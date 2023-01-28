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

router.post("/teacher", async (req, res) => {
    const { name, email, password } = req.body;
    const teacher = new Teacher({ name, email, password });
    teacher.save()

    const teacherProfile = new TeacherProfile({ teacherId: teacher._id, teacherName: teacher.name });
    teacherProfile.save()

    res.json("Teacher details succesfully recorded");
});

module.exports = router;

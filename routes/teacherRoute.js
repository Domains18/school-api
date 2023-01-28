const router = require('express').Router();
const { Student } = require("/models/registerSchema");
const { TeacherProfile, StudentProfile } = require("/models/profileSchema");
const memoSchema = require("/models/memoSchema");
const { Course } = require("/models/courseSchema");


router.get("/memo", async (req, res) => {
    let allStudents = await Student.find();
    
    return res.json(allStudents);
    
});

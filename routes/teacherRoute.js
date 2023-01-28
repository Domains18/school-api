const router = require('express').Router();
const { Student } = require("/models/registerSchema");
const { TeacherProfile, StudentProfile } = require("/models/profileSchema");
const memoSchema = require("/models/memoSchema");
const { Course } = require("/models/courseSchema");


router.get("/allStudents", async (req, res) => {
    let allStudents = await Student.find();

    return res.json(allStudents);

});

router.post("/memo", async (req, res) => {
    setTimeout(async () => {
        const { teacherId } = req.body;
        let teacherProfile = await TeacherProfile.findOne({ teacherId });
        let memos = [];
        for (i = 0; i < teacherProfile.memo.length; i++){
            let memo = await memoSchema.findById(teacherProfile.memos.push(memo)); 
        }
        
    });
});

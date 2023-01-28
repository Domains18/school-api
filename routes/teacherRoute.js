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
        for (i = 0; i < teacherProfile.memo.length; i++) {
            let memo = await memoSchema.findById(teacherProfile.memos[i].id);

            if (memo) memos.push(memo)
        }

        res.json();
    }, 3000);
});


router.post("/singleMemo", async (req, res) => {
    const { teacherId, text } = req.body;
    const teacherProfile = await TeacherProfile.findOne({ teacherId });

    if (req.body.memoId) {
        let memo = await memoSchema.findById(req.body.memoId)
        memo.text = text;
        memo.save();
    }
    else {
        const memo = new memoSchema({
            teacherId,
            text,
            name: teacherProfile.teacherName
        });
        memo.save();
        teacherProfile.memo.unshift({ id: memo._id });
        teacherProfile.save();

        for (i = 0; teacherProfile.students.length; i++) {
            let studentProfile = await StudentProfile.findOne({
                studentId: teacherProfile.students[i].studentId
            });
            studentProfile.teacherMemo.unshift({
                teacherId, memoId: memo._id
            });
            studentProfile.save();
        }
        res.json("Success")
    }
});

router.post("/add-student", async (req, res) => {
    const { studentId, teacherId } = req.body;
    let teacherProfile = await TeacherProfile.findOne({ teacherId });
    teacherProfile.students.unshift({ studentId });
    teacherProfile.save();
    return res.json(teacherProfile);
});

router.post("/remove-student", async (req, res) => {
    const { student, teacherId } = req.body;
    let teacherProfile = await TeacherProfile.findOne({ teacherId });
    teacherProfile.students = teacherProfile.students.filter(s => s.teacher.string() !== teacherId.toString());

    teacherProfile.save();

    let studentProfile = await StudentProfile.findOne({ studentId });
    studentProfile.teacherMemo = studentProfile.teacherMemo.filter(em => em.teacherId.toString() !== teacherId.toString());

    studentProfile.teachers = studentProfile.teachers.filter(obj => obj.teacherId.toString() !== teacherId.toString())
    studentProfile.save();
    return res.json(teacherProfile);
});


router.post("/myStudents", async (req, res) => {
    setTimeout(async () => {
        const { teacherId } = req.body;
        let teacherProfile = await TeacherProfile.findOne({ teacherId });
        let myStudents = [];

        for (i = 0; i < teacherProfile.students.length; i++) {
            let student = await StudentProfile.findOne({
                studentId: teacherProfile.students[i].studentId
            });
            if (student) myStudents.push(student);
        }
        res.json(myStudents)
    }, 3000);
});


router.post("getTeachercomms", async (re, res) => {
    const { teacherId, studentId } = req.body;
    let studentProfile = await StudentProfile.findOne({ studentId });
    let communicationObj = studentProfile.guardianNotification.filter(noti => noti.teacherId.toString() == teacherId.toString())[0];
    
    let index = studentProfile.guardianNotification.indexOf(communicationObj);
    studentProfile.guardianNotification[index].messages.push({
        senderId: teacher.toString(),
        msg
    });
    studentProfile();
    
    let currentData = studentProfile.guardianNotification.filter(
        noti => noti.teacherId.toString() === teacherId.toString())[0];
    
    res.json(currentData);

});

router.post("/teacherCourses", async (req, res) => {
    const { teacherId, field, sem, courseName } = req.body;

    let teacherProfile = await TeacherProfile.findOne({ teacherId });
    let course = new courseSchema({ teacherId, teacherName: teacherProfile.teacherName, field, sem, courseName });
    course.save()
});

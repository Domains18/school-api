const router = require('express').Router();

const { Student } = require('../models/registerSchema');

const { TeacherProfile, StudentProfile, GuardianProfile } = require('../models/profileSchema');
const { Course } = require('../models/courseSchema');

router.post('/getAllChildren', async (req, res) => {
    let allChildren = await Student.find();
    return res.json(allChildren);
});

router.post('/my-child', async (req, res) => {
    setTimeout(async () => {
        const { guardianId } = req.body;
        let guardianProfile = await GuardianProfile.findOne({ guardianId });
        let myChildren = [];

        for (i = 0; i < guardianProfile.myChildren.length; i++) {
            let childProfile = await StudentProfile.findOne({
                studentId: guardianProfile.myChildren[i].childId
            });
            if (childProfile) myChildren.push(childProfile);
        }
        return res.json(myChildren);
    }, 3000);
});

router.post('/add-child', async (req, res) => {
    const { guardianId, childId } = req.body;
    let guardianProfile = await GuardianProfile.findOne({ guardianId });
    guardianProfile.myChildren.unshift({ childId });
    guardianProfile.save();
    return res.json(guardianProfile);
});

router.post("/remove-child", async (req, res) => {
    const { guardianId, childId } = req.body;
    let guardianProfile = await GuardianProfile.findOne({ guardianId });
    guardianProfile.myChildren = guardianProfile.myChildren.filter(child => child.childId != childId);
    guardianProfile.save();
    return res.json(guardianProfile);
});


router.post("allTeacherMemo", async (req, res) => {
    const { childId } = req.body;
    let childProfile = await StudentProfile.findOne({ studentId: childId });

    let allTeacherMemo = childProfile.guardianNotification.map(async t => {
        let TeacherProfile = await TeacherProfile.findOne({ teacherId: t.teacherId });
        return {
            teacherName: TeacherProfile.name,
            teacherId: TeacherProfile.teacherId,
        };


    });
    allTeacherMemo = await Promise.all(allTeacherMemo);
    return res.json(allTeacherMemo);
});

router.post('getTeacherMemo', async (req, res) => {
    const { childId, teacherId } = req.body;

    let childProfile = await StudentProfile.findOne({ studentId: childId });

    let currentData = childProfile.guardianNotification.filter(not => not.teacherId.toString() == teacherId.toString())[0];

    res.json(currentData);

});
router.post("replyTeacherMemo", async (req, res) => {
    const { guardianId, childId, teacherId, msg } = req.body;
    let childProfile = await StudentProfile.findOne({ studentId: childId });

    let communicationObject = childProfile.guardianNotification.filter(not => not.teacherId.toString() == teacherId.toString())[0];

    let index = childProfile.guardianNotification.indexOf(communicationObject);
    childProfile.guardianNotification[index].messages.push({ senderId: guardianId.toString(), msg });

    childProfile.save();
    // return res.json(childProfile);

    let currentData = childProfile.guardianNotification.filter(not => not.teacherId.toString() == teacherId.toString())[0];
    res.json(currentData);
});


router.post("allCourse", async (req, res) => {
    let studentProfile = await StudentProfile.findOne({ studentId: req.body.studentId });

    if (!studentProfile) return res.json({ error: "Student not found" });
    if (!studentProfile.studentField || !studentProfile.studentSemester) {
        res.json(false);
        return res.json({ error: "Student field or semester not found" });

    }

    let allCourses = await Course.find({ courseField: studentProfile.studentField, courseSemester: studentProfile.studentSemester });

    res.json(allCourses);

});


router.post("/getStudentResults", async (req, res) => {
    const { studentId, courseId } = req.body;

    let subject = await Course.findById(courseId);
    let result = [];
    for (i = 0; i < subject.courseExams[i].length; i++) {
        let resData = {}
        for (j = 0; j < subject.courseId[i].examSubmissions.length; j++) {
            if (
                subject.courseExams[i].examSubmissions[j].studentId.toString() && subject.courseExams[i].examSubmissions[j].studentResult.isAvailable
            ) {
                resData.examName = subject.courseExams[i].examName;
                resData.percentage = subject.courseExams[i].examSubmissions[j].studentResult.percentage;
                result.push(resData)
            }
        }
    }
    res.json(result);
});


module.exports = router;

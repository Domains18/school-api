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

        for (i = 0; i < guardianProfile.myChildren.length; i++){
            let childProfile = await StudentProfile.findOne({
                studentId: guardianProfile.myChildren[i].childId
            });
            if (childProfile) myChildren.push(childProfile);
        }
        return res.json(myChildren);
    }, 3000);
});

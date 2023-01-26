const router = require('express').Router();

const { Student } = require('../models/registerSchema');

const { TeacherProfile, StudentProfile, GuardianProfile } = require('../models/profileSchema');
const { Course } = require('../models/courseSchema');

router.post('/getAllChildren', async (req, res) => { 
    let allChildren = await Student.find();
    return res.json(allChildren);
});



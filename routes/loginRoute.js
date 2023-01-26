const router = require('express').Router();

const { Student, Teacher, Guardian } = require('../models/registerSchema');
const {teacherProfile, studentProfile, guardianProfile} = require('../models/profileSchema');

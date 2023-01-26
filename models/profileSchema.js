const mongoose = require('mongoose');

const teacherProfile = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    teacherName: {
        type: String,
        required: true
    },
    students: [
        {
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        }
    ],
    memo: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memo'
        }
    }],
    department: {
        type: String,
        required: true
    },
    courses: [
        {
            courseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        }
    ]
});

// 
const studentProfile = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    studentField: {
        type: String,
    },
    studentName: {
        type: String,
        required: true
    },
    studentSemester: {
        type: String,
        required: true
    },
    studentDepartment: {
        type: String,
        required: true
    },
    teachers: [
        {
            teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher',
                required: true
            },
        }
    ],
    teacherMemo: [
        {
            teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher',
            },
            memoId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Memo',
            }
        }
    ],
    guardianNotification: [
        {
            teacherId: {
                type: mongoose.Schema.Types.ObjectId,
                required : true,
            },
            messages: [{
                senderId: {
                    type: String
                },
                msg: {
                    type: String
                }
            }]
        }
    ]

});

const guardianProfile = new mongoose.Schema({
    guardianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guardian',
        required: true
    },
    myChildren: [{
        childId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    }],
});

const TeacherProfile = mongoose.model("teacherProfile", teacherProfile);
const StudentProfile = mongoose.model("studentProfile", studentProfile);
const GuardianProfile = mongoose.model("guardianProfile", GuardianProfile);

module.exports = {
    TeacherProfile,
    StudentProfile,
    GuardianProfile,
}

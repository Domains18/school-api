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
            studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Students' },
        }
    ],
    memo: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Memo'
        }
    }],
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



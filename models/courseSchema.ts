const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    teacherName: {
        type: String,
    },
    field: {
        type: String,
    },
    semester: {
        type: String,
    },
    courseName: {
        type: String,
    },
    courseCode: {
        type: String,
    },
    courseExams: [{
        que: {
            type: String,
        },
        options: [
            {
                optionNumber: {
                    type: String,
                },
                val: {
                    type: String,
                }
            }
        ]
    }],
    examSubmissions: [{
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
        studentName: {
            type: String,
        },
        examName:{
            type: String,
            required: true
        },
        answers: [{
            queNo: {
                type: Number,
            },
            solution: {
                type: Number
            }
        }],
        studentResult: {
            isAvailable: {
                type: Boolean,
                default: false
            },
            percentage: {
                type: Number,
                default: 100
            },
        }
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course}

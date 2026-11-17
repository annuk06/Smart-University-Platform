import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    program: {
      type: String,
      default: 'Bachelor of Technology (B.Tech)',
    },
    semester: {
      type: Number,
      default: 4,
      min: 1,
      max: 8,
    },
    enrollmentYear: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    attendancePercentage: {
      type: Number,
      default: 88,
      min: 0,
      max: 100,
    },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;

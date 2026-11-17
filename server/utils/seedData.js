import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import User from '../models/User.js';
import Department from '../models/Department.js';
import Course from '../models/Course.js';
import Student from '../models/Student.js';
import Faculty from '../models/Faculty.js';
import Announcement from '../models/Announcement.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_university_db';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Student.deleteMany();
    await Faculty.deleteMany();
    await Announcement.deleteMany();

    console.log('[Seed] Cleared existing database collections.');

    // 1. Create Departments
    const cseDept = await Department.create({
      name: 'Computer Science & Engineering',
      code: 'CSE',
      description: 'Department of Computer Science and Engineering focusing on computing, algorithms, AI, and software systems.',
      headOfDepartment: 'Dr. Katherine Johnson',
    });

    const eceDept = await Department.create({
      name: 'Electronics & Communication',
      code: 'ECE',
      description: 'Department of Electronics and Communications focusing on embedded systems, VLSI, and signal processing.',
      headOfDepartment: 'Dr. Claude Shannon',
    });

    const mbaDept = await Department.create({
      name: 'Business Administration',
      code: 'MBA',
      description: 'Department of Business Administration focusing on leadership, finance, analytics, and organizational behavior.',
      headOfDepartment: 'Dr. Peter Drucker',
    });

    console.log('[Seed] Created Departments: CSE, ECE, MBA');

    // 2. Create Users (User model has pre-save hook that hashes password)
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@demo.edu',
      password: 'Demo@1234',
      role: 'admin',
      status: 'active',
    });

    const facultyUser = await User.create({
      name: 'Dr. Alan Turing',
      email: 'faculty@demo.edu',
      password: 'Demo@1234',
      role: 'faculty',
      status: 'active',
    });

    const facultyUser2 = await User.create({
      name: 'Dr. Grace Hopper',
      email: 'grace.hopper@demo.edu',
      password: 'Demo@1234',
      role: 'faculty',
      status: 'active',
    });

    const studentUser = await User.create({
      name: 'Alex Johnson',
      email: 'student@demo.edu',
      password: 'Demo@1234',
      role: 'student',
      status: 'active',
    });

    const studentUser2 = await User.create({
      name: 'Sophia Martinez',
      email: 'sophia.m@demo.edu',
      password: 'Demo@1234',
      role: 'student',
      status: 'active',
    });

    const studentUser3 = await User.create({
      name: 'Liam Chen',
      email: 'liam.c@demo.edu',
      password: 'Demo@1234',
      role: 'student',
      status: 'active',
    });

    console.log('[Seed] Created Demo Users: Admin, Faculty, Student');

    // 3. Create Faculty Profiles
    const facultyProfile1 = await Faculty.create({
      user: facultyUser._id,
      facultyId: 'FAC2026001',
      department: cseDept._id,
      designation: 'Professor & Chair',
      specialization: 'Theoretical Computer Science & Cryptography',
      officeLocation: 'Turing Hall, Room 304',
    });

    const facultyProfile2 = await Faculty.create({
      user: facultyUser2._id,
      facultyId: 'FAC2026002',
      department: cseDept._id,
      designation: 'Associate Professor',
      specialization: 'Compiler Design & Distributed Architecture',
      officeLocation: 'Hopper Hall, Room 210',
    });

    console.log('[Seed] Created Faculty Profiles');

    // 4. Create Courses
    const course1 = await Course.create({
      code: 'CS201',
      title: 'Data Structures and Algorithms',
      department: cseDept._id,
      credits: 4,
      semester: 3,
      description: 'Comprehensive study of fundamental data structures, graph theory, sorting algorithms, and complexity analysis.',
      faculty: facultyProfile1._id,
    });

    const course2 = await Course.create({
      code: 'CS301',
      title: 'Database Management Systems',
      department: cseDept._id,
      credits: 3,
      semester: 4,
      description: 'Relational database design, SQL querying, indexing, query optimization, and modern NoSQL architectures.',
      faculty: facultyProfile2._id,
    });

    const course3 = await Course.create({
      code: 'CS401',
      title: 'Operating Systems & Concurrency',
      department: cseDept._id,
      credits: 4,
      semester: 4,
      description: 'Process scheduling, virtual memory management, synchronization, deadlocks, and POSIX file systems.',
      faculty: facultyProfile1._id,
    });

    const course4 = await Course.create({
      code: 'CS450',
      title: 'Cloud Computing & Distributed Services',
      department: cseDept._id,
      credits: 3,
      semester: 6,
      description: 'Microservices architecture, containerization with Docker, Kubernetes orchestration, and cloud resiliency.',
      faculty: facultyProfile2._id,
    });

    console.log('[Seed] Created Courses');

    // 5. Create Student Profiles
    await Student.create({
      user: studentUser._id,
      studentId: 'STU20260001',
      department: cseDept._id,
      program: 'Bachelor of Technology (Computer Science)',
      semester: 4,
      enrollmentYear: 2024,
      attendancePercentage: 92,
      enrolledCourses: [course1._id, course2._id, course3._id],
    });

    await Student.create({
      user: studentUser2._id,
      studentId: 'STU20260002',
      department: cseDept._id,
      program: 'Bachelor of Technology (Computer Science)',
      semester: 4,
      enrollmentYear: 2024,
      attendancePercentage: 86,
      enrolledCourses: [course1._id, course2._id],
    });

    await Student.create({
      user: studentUser3._id,
      studentId: 'STU20260003',
      department: eceDept._id,
      program: 'Bachelor of Technology (Electronics)',
      semester: 2,
      enrollmentYear: 2025,
      attendancePercentage: 78,
      enrolledCourses: [course1._id],
    });

    console.log('[Seed] Created Student Profiles');

    // 6. Create Announcements
    await Announcement.create({
      title: 'Spring 2026 Mid-Semester Examination Schedule',
      content: 'The official schedule for mid-semester examinations has been published on the student portal. Exams commence next Monday.',
      targetAudience: 'all',
      priority: 'high',
      category: 'Academic',
      author: adminUser._id,
      department: cseDept._id,
    });

    await Announcement.create({
      title: 'Annual University Hackathon & Innovation Summit',
      content: 'Registration is now open for the 48-hour Smart Campus Hackathon. Great prizes and industry mentorship await participating teams!',
      targetAudience: 'student',
      priority: 'medium',
      category: 'Campus Life',
      author: facultyUser._id,
      department: cseDept._id,
    });

    await Announcement.create({
      title: 'Faculty Research Grant Applications Open',
      content: 'The Office of Academic Research invites proposals for the 2026 Interdisciplinary Innovation Grants. Deadline is March 31st.',
      targetAudience: 'faculty',
      priority: 'high',
      category: 'Research',
      author: adminUser._id,
    });

    await Announcement.create({
      title: 'Extended Library Hours During Finals Week',
      content: 'The central campus library will remain open 24/7 starting next week to support students during preparation for upcoming assessments.',
      targetAudience: 'all',
      priority: 'low',
      category: 'Facilities',
      author: adminUser._id,
    });

    console.log('[Seed] Created Announcements');
    console.log('\n=============================================');
    console.log('✅ Seed Completed Successfully!');
    console.log('---------------------------------------------');
    console.log('Demo Credentials (Password for all: Demo@1234)');
    console.log('Admin:   admin@demo.edu');
    console.log('Faculty: faculty@demo.edu');
    console.log('Student: student@demo.edu');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();

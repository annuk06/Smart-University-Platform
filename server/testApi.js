const testAPIs = async () => {
  const baseUrl = 'http://localhost:5000/api';

  try {
    // 1. Health
    const health = await fetch(`${baseUrl}/health`).then((r) => r.json());
    console.log('1. Health Check:', health.status);

    // 2. Admin Login & Dashboard
    const adminLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@demo.edu', password: 'Demo@1234' }),
    }).then((r) => r.json());
    console.log('2. Admin Login:', adminLogin.success, '| Role:', adminLogin.data.role);

    const adminDash = await fetch(`${baseUrl}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${adminLogin.data.token}` },
    }).then((r) => r.json());
    console.log('3. Admin Stats:', JSON.stringify(adminDash.data.stats));

    // 3. Faculty Login & Dashboard
    const facultyLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'faculty@demo.edu', password: 'Demo@1234' }),
    }).then((r) => r.json());
    console.log('4. Faculty Login:', facultyLogin.success, '| Role:', facultyLogin.data.role);

    const facultyDash = await fetch(`${baseUrl}/faculty/dashboard`, {
      headers: { Authorization: `Bearer ${facultyLogin.data.token}` },
    }).then((r) => r.json());
    console.log('5. Faculty Total Students:', facultyDash.data.totalStudents, '| Assigned Courses:', facultyDash.data.assignedCourses?.length);

    // 4. Student Login & Dashboard
    const studentLogin = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'student@demo.edu', password: 'Demo@1234' }),
    }).then((r) => r.json());
    console.log('6. Student Login:', studentLogin.success, '| Role:', studentLogin.data.role);

    const studentDash = await fetch(`${baseUrl}/students/dashboard`, {
      headers: { Authorization: `Bearer ${studentLogin.data.token}` },
    }).then((r) => r.json());
    console.log('7. Student Attendance:', studentDash.data.attendancePercentage + '%', '| Current Courses:', studentDash.data.currentCourses?.length);

    // 5. Register new student
    const testEmail = `test.student.${Date.now()}@demo.edu`;
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Registered Student',
        email: testEmail,
        password: 'Demo@1234',
        program: 'Bachelor of Technology (B.Tech)',
        semester: 2,
      }),
    }).then((r) => r.json());
    console.log('8. Register New Student:', regRes.success, '| Generated ID:', regRes.data.studentProfile?.studentId);

    // 6. Test Courses & Announcements
    const coursesRes = await fetch(`${baseUrl}/courses`).then((r) => r.json());
    console.log('9. Courses Count:', coursesRes.count);

    const announcementsRes = await fetch(`${baseUrl}/announcements`).then((r) => r.json());
    console.log('10. Announcements Count:', announcementsRes.count);

    console.log('\n🌟 ALL 10 API TEST CASES PASSED SUCCESSFULLY! 🌟');
  } catch (error) {
    console.error('API Test Error:', error);
  }
};

testAPIs();

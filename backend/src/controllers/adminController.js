const prisma = require('../models/prisma');
const { sendStudentCredentialsEmail } = require('../utils/emailHelper');
const bcryptjs = require('bcryptjs');
const { getResults: getResultsAdmin } = require('../services/resultService');



exports.addStudent = async (req, res) => {
  try {
    const { studentID, name, email, department, level } = req.body;

    if (!studentID || !name || !email || !department || !level) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingStudent = await prisma.student.findUnique({ where: { studentID } });
    if (existingStudent) {
      return res.status(409).json({ error: 'Student with this ID already exists' });
    }

    const studentRole = await prisma.role.findUnique({
      where: { name: 'user' },
    });

    if (!studentRole) {
      return res.status(500).json({ error: 'Role "user" not found' });
    }

    const tempPassword = Math.random().toString(36).slice(-8);
    console.log('Generated plain-text password:', tempPassword);
    const hashedPassword = await bcryptjs.hash(tempPassword, 10);

    const student = await prisma.student.create({
      data: {
        studentID,
        name,
        email,
        department,
        level,
        password: hashedPassword,
        roleId: studentRole.id,
      },
    });

    await sendStudentCredentialsEmail(email, name, studentID, tempPassword);

    res.status(201).json({ student, message: "Student registered and credentials sent via email." });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: "Failed to add student" });
  }
};


exports.addCourse = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { courseCode, courseTitle, courseDescription, department, level, credits } = req.body;

    if (!courseCode || !courseTitle || !courseDescription || !department || !level || !credits) {
      console.log("Validation Error: Missing fields");
      return res.status(400).json({ error: "All fields are required." });
    }

    if (typeof level !== 'number' || typeof credits !== 'number') {
      console.log("Validation Error: Invalid level or credits");
      return res.status(400).json({ error: "Invalid level or credits." });
    }


    const existingCourse = await prisma.course.findUnique({
      where: { courseCode }
    });

    if (existingCourse) {
      console.log("Duplicate Error: Course code already exists");
      return res.status(409).json({ error: "Course code already exists." });
    }

    console.log("Creating course with data:", {
      courseCode,
      courseTitle,
      courseDescription,
      department,
      level,
      credits,
    });

    const course = await prisma.course.create({
      data: {
        courseCode,
        courseTitle,
        courseDescription,
        department,
        level,
        credits,
      },
    });

    console.log("Course created successfully:", course);

    res.status(201).json({
      message: "Course added successfully",
      course,
    });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Failed to add course" });
  }
};

exports.enrollStudent = async (req, res) => {
  try {
    console.log('Received enrollStudent request with data:', req.body);

    const { studentID, courseID, examID } = req.body;

    const studentIDInt = parseInt(studentID);
    const courseIDInt = parseInt(courseID);


    if (!studentID || isNaN(parseInt(studentID))) {
      console.log('Validation Error: studentID is invalid.');
      return res.status(400).json({ error: 'studentID must be a valid integer.' });
    }

    if (!courseID || isNaN(parseInt(courseID))) {
      console.log('Validation Error: courseID is invalid.');
      return res.status(400).json({ error: 'courseID must be a valid integer.' });
    }

    if (!examID || typeof examID !== 'string') {
      console.log('Validation Error: examID is invalid.');
      return res.status(400).json({ error: 'examID must be a valid string.' });
    }

    

    const student = await prisma.student.findUnique({
      where: { id: studentIDInt },
    });

    console.log('Fetched student:', student);

    if (!student) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseIDInt },
      include: { exams: { where: { examID: examID } } },
    });

    console.log('Fetched course:', course);

    if (!course || !course.exams.length) {
      return res.status(404).json({ error: 'Course or exam not found.' });
    }

    const existingEnrollment = await prisma.enrollment.findFirst({
      where: { studentID: studentIDInt, courseId: courseIDInt, examID },
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Student is already enrolled in this course.' });
    }

    const newEnrollment = await prisma.enrollment.create({
      data: { studentID: studentIDInt, courseId: courseIDInt, examID },
    });

    await prisma.studentExam.create({
      data: { studentID: studentIDInt, examID, submitted: false, score: 0 },
    });

    console.log("Data being inserted into studentExam:", { studentID: studentIDInt, examID });

    res.status(201).json({
      message: 'Student enrolled successfully and linked to the exam.',
      enrollment: newEnrollment,
    });
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ error: 'Failed to enroll student.' });
  }
};


exports.addExam = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const { examID, examTitle, courseCode, examDate, examTime, duration } = req.body;

    if (!examID || !examTitle || !examDate || !examTime || !duration) {
      console.log("Validation Error: Missing required fields.");
      return res.status(400).json({ error: "All fields are required" });
    }

    const course = await prisma.course.findUnique({ where: { courseCode } });
    
    if (!course) {
      console.log("The course code is invalid input another")
      return res.status(400).json({ error: "Invalid course code" });
    }

    const existingExam = await prisma.exam.findFirst({
      where: { examID, courseId: course.id },
    });
    if (existingExam) {
      return res.status(409).json({ error: "Exam with this ID already exists for the course" });
    }

    const exam = await prisma.exam.create({
      data: {
        examID,
        examTitle,
        courseId: course.id,
        examDate: new Date(examDate),
        examTime,
        duration,
      },
    });

    res.status(201).json({
      message: "Exam added successfully",
      exam,
    });
  } catch (err) {  
    console.error("Error adding exam:", err); 
    res.status(500).json({ error: "Failed to add exam" });
  }
};


exports.addQuestion = async (req, res) => {
  try {
    const { questionText, courseCode, examID, questionType, options, correctAnswer } = req.body;

    console.log("Received request body:", req.body);

    if (!questionText || !courseCode || !examID || !questionType) {
      console.error("Validation Error: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    if (questionType === 'MCQ') {
      if (!Array.isArray(options) || options.length === 0) {
        console.error("Validation Error: Options are required for MCQ type");
        return res.status(400).json({ error: "Options are required for MCQ type" });
      }
      if (!correctAnswer || !options.includes(correctAnswer)) {
        console.error("Validation Error: A valid correct answer is required for MCQ type");
        return res.status(400).json({ error: "A valid correct answer is required for MCQ type" });
      }
    }

    console.log("Fetching course with courseCode:", courseCode);
    const course = await prisma.course.findUnique({ where: { courseCode } });
    if (!course) {
      console.error("Course not found for courseCode:", courseCode);
      return res.status(404).json({ error: "Course not found" });
    }
    console.log("Found course:", course);

    console.log("Checking exam with ID:", examID, "and courseId:", course.id);
    const exam = await prisma.exam.findUnique({
      where: { examID: examID, courseId: course.id },
    });
    if (!exam) {
      console.error("Exam not found for ID:", examID, "and courseId:", course.id);
      return res.status(404).json({ error: "Exam not found" });
    }
    console.log("Found exam:", exam);

    const questionCount = await prisma.question.count({
      where: { examID: examID, courseId: course.id },
    });
    console.log("Current question count for exam:", questionCount);
    const questionNumber = questionCount + 1;

    const generateQuestionID = (courseCode, examID, questionNumber) => {
      return `${courseCode}_${examID}_QSTN${String(questionNumber).padStart(3, '0')}`;
    };
    const questionID = generateQuestionID(courseCode, examID, questionNumber);
    console.log("Generated Question ID:", questionID);

    const existingQuestion = await prisma.question.findUnique({
      where: { questionID },
    });

    if (existingQuestion) {
      console.error("Duplicate Question ID:", questionID);
      return res.status(400).json({ error: "Question ID already exists" });
    }

    console.log("Creating question with details:", {
      questionID,
      questionText,
      questionType,
      options,
      correctAnswer,
      examID: exam.examID,
      courseId: course.id,
    });

    const question = await prisma.question.create({
      data: {
        questionID,
        questionText,
        questionType,
        options: questionType === 'MCQ' ? options : undefined,
        correctAnswer: questionType === 'MCQ' ? correctAnswer : undefined,
        examID: exam.examID,
        courseId: course.id,
      },
    });

    res.status(201).json({
      message: "Question added successfully",
      question,
    });

  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Failed to add question" });
  }
};

exports.viewResults = async (req, res) => {
  try {
    console.log('Admin viewResults endpoint called');

    const adminID = req.user.id;
    const studentID = parseInt(req.query.studentID || req.body.studentID, 10);

    if (!studentID) {
      return res.status(400).json({ message: 'StudentID is required to fetch results.' });
    }

    console.log(`AdminID: ${adminID}, StudentID: ${studentID}`);

    const results = await prisma.result.findMany({
      where: { studentID },
      include: {
        exam: true,
        course: true,
      },
    });

    if (results.length === 0) {
      console.log('No results found');
      return res.status(404).json({ message: 'No results found for this student.' });
    }

    console.log('Results fetched:', results);

    res.status(200).json({
      message: 'Results retrieved successfully',
      results,
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: `Failed to retrieve results: ${error.message}` });
  }
};







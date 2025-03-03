const prisma = require('../models/prisma');
const { getResults: getResultsStudent } = require('../services/resultService');


exports.getAvailableExams = async (req, res) => {
  try {
    console.log("This is the request object...", req.user)
    console.log("Request received for getAvailableExams"); 

    const studentID = req.user.id;
    console.log("studentID:", studentID); 

    if (!studentID || isNaN(studentID)) {
      throw new Error('Invalid student ID');
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { student: { id: studentID } },
      include: { course: true },
    });
    console.log("Enrollments fetched:", enrollments); 

    const courseIds = enrollments.map((enrollment) => enrollment.courseId);
    console.log("Course IDs:", courseIds); 

    const exams = await prisma.exam.findMany({
      where: {
        courseId: { in: courseIds }, 
      },
      include:{
        course: {
          select: {
            courseCode: true,
          },
        },
      },
    });

    res.status(200).json({ message: "This is the available exams:", exams });
  } catch (error) {
    console.error("Error fetching available exams:", error);
    res.status(500).json({ error: "Failed to fetch available exams" });
  }
};


exports.loadExamDetails = async (req, res) => {
  try {
    const studentID = req.user.id; // Extract student ID from the authenticated user
    const { formattedExamID } = req.body; // Extract exam ID from the request body

    console.log("req.body:", req.body);
    console.log("req.user:", req.user);
    console.log("StudentID and ExamID:", { studentID, formattedExamID });

    // Check if the student is enrolled in the exam
    const studentExam = await prisma.studentExam.findUnique({
      where: {
        studentID_examID: {
          studentID: studentID,
          examID: formattedExamID,
        },
      },
    });

    if (!studentExam) {
      console.log("Student not enrolled in the exam.");
      return res.status(403).json({ error: "You are not enrolled in this exam." });
    }

    // Check if an ExamAttempt already exists for this student and exam
    let examAttempt = await prisma.examAttempt.findUnique({
      where: {
        studentID_examID: {
          studentID: studentID,
          examID: formattedExamID,
        },
      },
    });

    if (!examAttempt) {
      console.log("No existing ExamAttempt. Creating a new one.");

      // Create a new ExamAttempt record
      examAttempt = await prisma.examAttempt.create({
        data: {
          studentID: studentID,
          examID: formattedExamID,
          totalScore: 0, // Default score to 0 until grading
          grade: "", // Leave grade empty initially
        },
      });

      console.log("New ExamAttempt created:", examAttempt);
    } else {
      console.log("Existing ExamAttempt found:", examAttempt);
    }

    // Fetch the exam details
    const exam = await prisma.exam.findUnique({
      where: { examID: formattedExamID },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            options: true,
          },
        },
      },
    });

    if (!exam) {
      console.log("Exam not found in the database.");
      return res.status(404).json({ error: "Exam not found" });
    }

    console.log("Exam details retrieved successfully:", exam);

    // Respond with exam details
    res.status(200).json({
      examID: exam.examID,
      examTitle: exam.examTitle,
      duration: exam.duration,
      questions: exam.questions,
      attemptDetails: {
        attemptDate: examAttempt.attemptDate,
        totalScore: examAttempt.totalScore,
        grade: examAttempt.grade,
      },
    });
  } catch (error) {
    console.error("Error loading exam details:", error);
    res.status(500).json({ error: "Failed to load exam details" });
  }
};

exports.fetchQuestions = async (req, res) => {
  const { examID } = req.query;

  try {
    const examIdInt = parseInt(examID, 10);
    const studentID = req.user.id;

    console.log("req.query.examID:", req.query.examID, typeof req.query.examID);
    console.log("examIdInt:", examIdInt, typeof examIdInt);
    console.log("studentID:", studentID, typeof studentID);

    if (isNaN(examIdInt)) {
      return res.status(400).json({ error: "Invalid exam ID format." });
    }

    function convertExamIdToString(examIdInt) {
      return `EXAM${examIdInt.toString().padStart(3, "0")}`;
    }

    const examIDString = convertExamIdToString(examIdInt);

    const studentExam = await prisma.studentExam.findUnique({
      where: {
        studentID_examID: {
          studentID: studentID,
          examID: examIDString,
        },
      },
    });

    console.log("studentExam fetched:", studentExam);

    if (!studentExam || studentExam.submitted) {
      return res.status(403).json({ message: "You have already submitted this exam." });
    }

    const exam = await prisma.exam.findUnique({
      where: { id: examIdInt },
      include: {
        questions: {
          select: {
            id: true,
            questionText: true,
            options: true,
          },
        },
      },
    });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    return res.status(200).json({ questions: exam.questions });

  } catch (error) {
    console.error("Error fetching exam questions:", error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};


exports.submitAnswer = async (req, res) => {
  try {
    const studentID = req.user.id;
    console.log('Received request to submit answer:', req.body);

    const { examID, answers } = req.body;
    console.log('Extracted examID, studentID, and answers:', examID, studentID, answers);

    const parsedExamID = parseInt(examID, 10);
    if (isNaN(parsedExamID)) {
      console.log("Validation Error: Invalid examID provided.");
      return res.status(400).json({ error: "Invalid examID" });
    }

    console.log('Parsed examID:', parsedExamID);

    if (!parsedExamID || !studentID || !Array.isArray(answers)) {
      console.log("Validation Error: Missing required fields or invalid answers format");
      return res.status(400).json({ error: "examID, studentID, and answers (array) are required." });
    }

    if (!answers.every(answer => answer.questionID && answer.selectedOption)) {
      console.log("Validation Error: Invalid answer format");
      return res.status(400).json({ error: "Each answer must include questionID and selectedOption." });
    }

    console.log("Validated request payload structure successfully.");

    const exam = await prisma.exam.findUnique({
      where: { id: parsedExamID },
      include: {
        Enrollment: {
          where: { studentID: studentID },
        },
      },
    });

    console.log('Fetched exam:', exam);

    if (!exam) {
      console.log('Exam not found:', parsedExamID);
      return res.status(404).json({ error: "Exam not found" });
    }

    if (exam.Enrollment.length < 1) {
      console.log('Student is not enrolled in this exam.');
      return res.status(400).json({ error: "Student is not enrolled in this exam." });
    }

    const correctExamID = exam.examID;
    console.log('Using correct examID:', correctExamID);

    const examEndTime = new Date(exam.examDate);
    examEndTime.setMinutes(examEndTime.getMinutes() + exam.duration);
    const currentTime = new Date();

    console.log('Exam end time:', examEndTime, 'Current time:', currentTime);

    if (currentTime >= examEndTime) {
      console.log('Time\'s up! You cannot submit answers anymore.');
      return res.status(400).json({ error: "Time's up! You cannot submit answers anymore." });
    }

    const studentExam = await prisma.studentExam.findUnique({
      where: {
        studentID_examID: { studentID: studentID, examID: correctExamID },
      },
    });
    
    if (studentExam?.submitted) {
      return res.status(403).json({ error: "Cannot submit answers. Exam already submitted." });
    }
    

    console.log('Processing answers...');

    const saveOrUpdatePromises = answers.map(async (answer) => {
      const existingAnswer = await prisma.answer.findFirst({
        where: {
          studentID: studentID,
          examID: correctExamID,
          questionID: answer.questionID,
        },
      });

      if (existingAnswer) {
        console.log(`Updating answer for questionID ${answer.questionID}`);
        return prisma.answer.update({
          where: { id: existingAnswer.id },
          data: { answer: answer.selectedOption },
        });
      } else {
        console.log(`Creating new answer for questionID ${answer.questionID}`);
        return prisma.answer.create({
          data: {
            studentID: studentID,
            examID: correctExamID,
            questionID: answer.questionID,
            answer: answer.selectedOption,
          },
        });
      }
    });

    const savedAnswers = await Promise.all(saveOrUpdatePromises);

    console.log('Answers submitted successfully:', savedAnswers);
    res.status(200).json({ message: "Answers submitted successfully", savedAnswers });
  } catch (error) {
    console.error('Error submitting answers:', error);
    res.status(500).json({ error: "Failed to submit answers" });
  }
};


exports.submitExam = async (req, res) => {
  try {
    const studentID = req.user.id;
    const { examID } = req.body;

    // Validate inputs
    if (!examID || !studentID) {
      return res.status(400).json({ error: "Both 'examID' and 'studentID' are required" });
    }

    console.log('Received submitExam request with:', { examID, studentID });

    // Ensure examID string starts with "EXAM"
    const examIDString = examID.toString().startsWith("EXAM")
      ? examID.toString()
      : `EXAM${examID.toString().padStart(3, "0")}`;

    console.log('Formatted examIDString:', examIDString);

    // Update the StudentExam record to mark as submitted
    const updatedExamAttempt = await prisma.studentExam.update({
      where: { studentID_examID: { studentID, examID: examIDString } },
      data: {
        submitted: true,
        submittedAt: new Date(),
      },
    });

    console.log('Exam successfully submitted:', updatedExamAttempt);

    // Fetch answers and calculate the score
    const answers = await prisma.answer.findMany({
      where: { studentID, question: { examID: examIDString } },
      include: { question: true },
    });

    console.log('Fetched Answers:', answers);

    if (!answers.length) {
      throw new Error("No answers found for this exam.");
    }

    let score = 0;
    answers.forEach(answer => {
      if (answer.answer === answer.question.correctAnswer) {
        score += 2; // Assuming each correct answer is worth 2 points
      }
    });

    console.log('Calculated Score:', score);

    // Calculate grade
    const totalQuestions = 50;
    const totalMarks = totalQuestions * 2; // Assuming each question is worth 2 marks
    const percentage = (score / totalMarks) * 100;
    let grade;
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    else grade = 'F';

    console.log('Calculated Grade:', grade);

    // Retrieve course and exam details
    const exam = await prisma.exam.findUnique({
      where: { examID: examIDString },
      select: { courseId: true, examTitle: true, examDate: true },
    });

    if (!exam) {
      throw new Error(`Exam not found for ID: ${examIDString}`);
    }

    const course = await prisma.course.findUnique({
      where: { id: exam.courseId },
      select: { courseTitle: true, courseDescription: true, credits: true, department: true, level: true },
    });

    const student = await prisma.student.findUnique({
      where: { id: studentID },
      select: { name: true },
    });

    if (!student) {
      throw new Error(`Student not found for ID: ${studentID}`);
    }

    console.log(`Student Name: ${student.name}`);

    const examAttempt = await prisma.examAttempt.findFirst({
      where: {
        studentID,
        examID: examIDString,
      },
    });
    
    if (!examAttempt) {
      return res.status(404).json({ message: "Exam attempt not found." });
    }
    
    const examAttemptID = examAttempt.id; // Use this ID

   console.log('This is exam attempt ID', examAttemptID)     

    // Check for existing result
    const existingResult = await prisma.result.findUnique({
      where: {
        studentID_examID_examAttemptID: {
          studentID,
          examID: examIDString,
          examAttemptID, // Add this value
        },
      },
    });   
    
    console.log('This is existing result', existingResult)

    if (existingResult) {
      console.log("Result already exists:", existingResult);
      return res.status(409).json({
        message: "Result already exists for this student and exam.",
        result: existingResult,
      });
    }

    // Create new result
    const result = await prisma.result.create({
      data: {
        student: { connect: { id: studentID } },
        exam: { connect: { examID: examIDString } },
        course: { connect: { id: exam.courseId } },
        studentName: student.name,
        examTitle: exam.examTitle,
        examDate: exam.examDate,
        courseTitle: course.courseTitle,
        courseDescription: course.courseDescription,
        credits: course.credits,
        department: course.department,
        level: course.level,
        totalScore: score,
        grade,
        examAttempt: { connect: { id: examAttempt.id } },
      },
    });

    console.log("Result created successfully:", result);

    return res.status(201).json({
      message: "Exam submitted and result created successfully.",
      result,
    });
  } catch (error) {
    console.error("Error submitting exam:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || "Failed to submit exam" });
    }
  }
};

exports.viewResults = async (req, res) => {
  try {
    console.log('viewResults endpoint called');
    const studentID = req.user.id;
    const examID = (req.query.examID || req.body.examID).toString(); 

    console.log(`Received studentID: ${studentID}`);
    console.log(`Received examID: ${examID}`);

    if (!studentID || !examID) {
      return res.status(400).json({ message: "Both studentID and examID are required." });
    }

    console.log('Querying with:', { studentID, examID, });

    const CorrectExamID = 'EXAM001';
    console.log("Corect Exam ID", CorrectExamID)

    const results = await prisma.result.findMany({
      where: {
        studentID: studentID,
        examID: CorrectExamID,
      },
    });


    console.log('Results fetched:', results);

    if (!results || results.length === 0) {
      console.log('No results found or results is undefined/null');
      return res.status(404).json({ message: "No results found for this student in the specified exam." });
    }

    console.log('Sending response...');
    res.status(200).json({ message: "These are your results", results });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: `Failed to retrieve results: ${error.message}` });
  }
};










  
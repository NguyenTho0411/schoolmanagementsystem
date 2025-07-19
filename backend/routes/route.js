const router = require('express').Router();

const { adminRegister, adminLogIn, getAdminDetail } = require('../controllers/admin-controller.js');
const { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents } = require('../controllers/class-controller.js');
const { complainCreate, complainList } = require('../controllers/complain-controller.js');
const { noticeCreate, noticeList, deleteNotices, deleteNotice, updateNotice } = require('../controllers/notice-controller.js');
const {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance
} = require('../controllers/student_controller.js');
const {
    subjectCreate,
    classSubjects,
    deleteSubjectsByClass,
    getSubjectDetail,
    deleteSubject,
    freeSubjectList,
    allSubjects,
    deleteSubjects
} = require('../controllers/subject-controller.js');
const {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    deleteTeachers,
    deleteTeachersByClass,
    deleteTeacher,
    updateTeacherSubject,
    teacherAttendance
} = require('../controllers/teacher-controller.js');

/* ========== ADMIN ========== */
/**
 * @swagger
 * /AdminLogin:
 *   post:
 *     summary: Đăng nhập cho Admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/AdminLogin', adminLogIn);

/**
 * @swagger
 * /AdminReg:
 *   post:
 *     summary: Đăng ký tài khoản Admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Admin"
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               schoolName:
 *                 type: string
 *                 example: "Truong Test"
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
router.post('/AdminReg', adminRegister);

/**
 * @swagger
 * /Admin/{id}:
 *   get:
 *     summary: Lấy chi tiết Admin theo id
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chi tiết Admin
 */
router.get("/Admin/:id", getAdminDetail);

/* ========== STUDENT ========== */
/**
 * @swagger
 * /StudentReg:
 *   post:
 *     summary: Đăng ký sinh viên
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               rollNum:
 *                 type: number
 *               password:
 *                 type: string
 *               sclassName:
 *                 type: string
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
router.post('/StudentReg', studentRegister);

/**
 * @swagger
 * /StudentLogin:
 *   post:
 *     summary: Đăng nhập sinh viên
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rollNum:
 *                 type: number
 *               studentName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/StudentLogin', studentLogIn);

/**
 * @swagger
 * /Students/{id}:
 *   get:
 *     summary: Lấy danh sách sinh viên theo school id
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sinh viên
 */
router.get("/Students/:id", getStudents);

/**
 * @swagger
 * /Student/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 sinh viên
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin sinh viên
 */
router.get("/Student/:id", getStudentDetail);

router.delete("/Students/:id", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/:id', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

/* ========== TEACHER ========== */
/**
 * @swagger
 * /TeacherReg:
 *   post:
 *     summary: Đăng ký giáo viên
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               school:
 *                 type: string
 *               teachSubject:
 *                 type: string
 *               teachSclass:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 */
router.post('/TeacherReg', teacherRegister);

/**
 * @swagger
 * /TeacherLogin:
 *   post:
 *     summary: Đăng nhập giáo viên
 *     tags: [Teacher]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 */
router.post('/TeacherLogin', teacherLogIn);

/**
 * @swagger
 * /Teachers/{id}:
 *   get:
 *     summary: Lấy danh sách giáo viên theo school id
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách giáo viên
 */
router.get("/Teachers/:id", getTeachers);

/**
 * @swagger
 * /Teacher/{id}:
 *   get:
 *     summary: Lấy chi tiết 1 giáo viên
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin giáo viên
 */
router.get("/Teacher/:id", getTeacherDetail);

router.delete("/Teachers/:id", deleteTeachers);
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);
router.put("/TeacherSubject", updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);

/* ========== SCLASS (CLASS) ========== */
/**
 * @swagger
 * /SclassCreate:
 *   post:
 *     summary: Tạo lớp học mới
 *     tags: [Sclass]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sclassName:
 *                 type: string
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo lớp học thành công
 */
router.post('/SclassCreate', sclassCreate);

/**
 * @swagger
 * /SclassList/{id}:
 *   get:
 *     summary: Lấy danh sách lớp theo school id
 *     tags: [Sclass]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách lớp học
 */
router.get('/SclassList/:id', sclassList);

/**
 * @swagger
 * /Sclass/{id}:
 *   get:
 *     summary: Lấy chi tiết lớp học
 *     tags: [Sclass]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin lớp học
 */
router.get("/Sclass/:id", getSclassDetail);

/**
 * @swagger
 * /Sclass/Students/{id}:
 *   get:
 *     summary: Lấy danh sách sinh viên của 1 lớp
 *     tags: [Sclass]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách sinh viên của lớp
 */
router.get("/Sclass/Students/:id", getSclassStudents);

router.delete("/Sclasses/:id", deleteSclasses);
router.delete("/Sclass/:id", deleteSclass);

/* ========== SUBJECT ========== */
/**
 * @swagger
 * /SubjectCreate:
 *   post:
 *     summary: Tạo môn học mới
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subName:
 *                 type: string
 *               subCode:
 *                 type: string
 *               sessions:
 *                 type: number
 *               sclassName:
 *                 type: string
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo môn học thành công
 */
router.post('/SubjectCreate', subjectCreate);

/**
 * @swagger
 * /AllSubjects/{id}:
 *   get:
 *     summary: Lấy tất cả môn học theo school id
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách môn học
 */
router.get('/AllSubjects/:id', allSubjects);

/**
 * @swagger
 * /ClassSubjects/{id}:
 *   get:
 *     summary: Lấy môn học theo class id
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách môn học của lớp
 */
router.get('/ClassSubjects/:id', classSubjects);

/**
 * @swagger
 * /FreeSubjectList/{id}:
 *   get:
 *     summary: Lấy danh sách môn học chưa có giáo viên
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách môn học trống giáo viên
 */
router.get('/FreeSubjectList/:id', freeSubjectList);

/**
 * @swagger
 * /Subject/{id}:
 *   get:
 *     summary: Lấy chi tiết môn học
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Thông tin môn học
 */
router.get("/Subject/:id", getSubjectDetail);

router.delete("/Subject/:id", deleteSubject);
router.delete("/Subjects/:id", deleteSubjects);
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

/* ========== NOTICE ========== */
/**
 * @swagger
 * /NoticeCreate:
 *   post:
 *     summary: Tạo thông báo mới
 *     tags: [Notice]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo thông báo thành công
 */
router.post('/NoticeCreate', noticeCreate);

/**
 * @swagger
 * /NoticeList/{id}:
 *   get:
 *     summary: Lấy danh sách thông báo theo school id
 *     tags: [Notice]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách thông báo
 */
router.get('/NoticeList/:id', noticeList);

router.delete("/Notices/:id", deleteNotices);
router.delete("/Notice/:id", deleteNotice);
router.put("/Notice/:id", updateNotice);

/* ========== COMPLAIN ========== */
/**
 * @swagger
 * /ComplainCreate:
 *   post:
 *     summary: Sinh viên gửi khiếu nại
 *     tags: [Complain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               complaint:
 *                 type: string
 *               school:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo khiếu nại thành công
 */
router.post('/ComplainCreate', complainCreate);

/**
 * @swagger
 * /ComplainList/{id}:
 *   get:
 *     summary: Lấy danh sách khiếu nại theo school id
 *     tags: [Complain]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách khiếu nại
 */
router.get('/ComplainList/:id', complainList);

module.exports = router;

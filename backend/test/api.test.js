const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // hoặc đường dẫn file server, ví dụ: ../server.js

chai.use(chaiHttp);
const { expect } = chai;

// Dữ liệu mẫu dùng test
const admin = {
    name: "Admin Test",
    email: "admin_test@example.com",
    password: "123456",
    schoolName: "Truong Test"
};

const teacher = {
    name: "Teacher Test",
    email: "teacher_test@example.com",
    password: "123456",
    role: "Teacher"
};

let adminToken = '';
let teacherId = '';
let studentId = '';

describe('TRƯỜNG HỌC - API ACCEPTANCE TEST', () => {

    // Đăng ký admin
    it('TC01 - Đăng ký Admin thành công', (done) => {
        chai.request(app)
            .post('/AdminReg')
            .send(admin)
            .end((err, res) => {
                expect(res.body).to.have.property('name', admin.name);
                expect(res.body).to.have.property('email', admin.email);
                expect(res.body).to.have.property('schoolName', admin.schoolName);
                done();
            });
    });

    // Đăng nhập admin
    it('TC02 - Đăng nhập Admin thành công', (done) => {
        chai.request(app)
            .post('/AdminLogin')
            .send({ email: admin.email, password: admin.password })
            .end((err, res) => {
                expect(res.body).to.have.property('email', admin.email);
                // Nếu có JWT: adminToken = res.body.token;
                done();
            });
    });

    // Đăng nhập thất bại
    it('TC03 - Đăng nhập thất bại khi sai mật khẩu', (done) => {
        chai.request(app)
            .post('/AdminLogin')
            .send({ email: admin.email, password: "sai_mat_khau" })
            .end((err, res) => {
                expect(res.body).to.have.property('message').that.includes('Invalid');
                done();
            });
    });

    // Thêm giáo viên mới
    it('TC04 - Thêm Teacher thành công', (done) => {
        chai.request(app)
            .post('/TeacherReg')
            .send({
                ...teacher,
                school: admin._id, // hoặc lấy id trường đã tạo ở trên
                teachSclass: null // có thể để null hoặc class đã tạo
            })
            .end((err, res) => {
                expect(res.body).to.have.property('email', teacher.email);
                teacherId = res.body._id;
                done();
            });
    });

    // Thêm teacher với email trùng (fail)
    it('TC05 - Thêm Teacher với email trùng (fail)', (done) => {
        chai.request(app)
            .post('/TeacherReg')
            .send({
                ...teacher,
                school: admin._id,
                teachSclass: null
            })
            .end((err, res) => {
                expect(res.body).to.have.property('message').that.includes('Email already exists');
                done();
            });
    });

    // Thêm sinh viên mới
    it('TC06 - Thêm sinh viên mới', (done) => {
        chai.request(app)
            .post('/StudentReg')
            .send({
                name: "Student A",
                rollNum: 21003001,
                password: "123456",
                sclassName: null,
                school: admin._id
            })
            .end((err, res) => {
                expect(res.body).to.have.property('name', "Student A");
                expect(res.body).to.have.property('rollNum', 21003001);
                studentId = res.body._id;
                done();
            });
    });

    // Thêm sinh viên với MSSV trùng (fail)
    it('TC07 - Thêm sinh viên với MSSV trùng', (done) => {
        chai.request(app)
            .post('/StudentReg')
            .send({
                name: "Student B",
                rollNum: 21003001,
                password: "123456",
                sclassName: null,
                school: admin._id
            })
            .end((err, res) => {
                expect(res.body).to.have.property('message').that.includes('Roll Number already exists');
                done();
            });
    });

    // Xóa sinh viên
    it('TC08 - Xóa sinh viên thành công', (done) => {
        chai.request(app)
            .delete(`/Student/${studentId}`)
            .end((err, res) => {
                expect(res.body).to.have.property('_id', studentId);
                done();
            });
    });

});

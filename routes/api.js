const router = require("express").Router();
var httpProxy = require("express-http-proxy");
const jsonResponse = require("../utils/jsonResponse");
const axios = require("axios");
// cons = require("../middlewar");
const courseService = httpProxy(`${process.env.COURSE_SERVICE}`);
const clientService = httpProxy(`${process.env.CLIENT_SERVICE}`);
const accountService = httpProxy(`${process.env.ACCOUNT_SERVICE}`);
//ACCOUNT SERVICE
/*----------------------*/
router.post("/api/account-service/v1/student-login", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Student data',
            required: true,
            schema: {
                username: "user",
                password: "1234"
            }
        }
    */

    accountService(req, res, next);
});

router.post("/api/account-service/v1/user-login", (req, res, next) => {
    /*
        #swagger.tags = ['User']
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'User data.',
            required: true,
            schema: {
                username: "user",
                password: "1234"
            }
        }
    */
    accountService(req, res, next);
});

router.post("/api/account-service/v1/change-pass", (req, res, next) => {
    /* 
        ##swagger.tags = ['default]
    */
    accountService(req, res, next);
});

router.get("/api/account-service/v1/refresh-token", (req, res, next) => {
    /* 
        ##swagger.tags = ['default]
    */
    accountService(req, res, next);
});
/*===================================================================================== */

/*===================================================================================== */
//COURSE SERVICE
/*----------------------*/
/*COURSE*/

router.get("/api/course-service/v1/course/get-all", (req, res, next) => {
    /* 
        #swagger.tags = ['Course']
        #swagger.description = 'This endpoint return a list of all course'
    */
    courseService(req, res, next);
});

router.get("/api/course-service/v1/course/get-all-deleted", (req, res, next) => {
    //  #swagger.tags = ['Course']
    courseService(req, res, next);
});
router.get("/api/course-service/v1/course/get/:courseId", (req, res, next) => {
    /*
        #swagger.tags = ['Course']
        #swagger.description = 'This endpoint return detail information of an inputed courseId'
        #swagger.parameters['courseId'] = {
            in: 'path',
            description: 'Id of a course',
            required: true,
            schema: {
                courseId: '12345'
            }
        }
        
    */
    courseService(req, res, next);
});

router.delete("/api/course-service/v1/course/delete/:courseId", (req, res, next) => {
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/course/delete/:courseId/force", (req, res, next) => {
    courseService(req, res, next);
});
router.put("/api/course-service/v1/course/restore/:courseId", (req, res, next) => {
    courseService(req, res, next);
});

router.post("/api/course-service/v1/course/new", async (req, res, next) => {
    try {
        const id_faculty = req.body.departmentAllowed || null;
        if (!id_faculty) {
            return jsonResponse({ req, res }).json({ message: `Faculty Id is required!` });
        }
        const facultyQuery = await axios.get(`${process.env.ClIENT_SERVICE}/api/client-service/v1/faculty/get/${id_faculty}`);

        courseService(req, res, next);
    } catch (error) {
        const err = new Error(error.response.data.message);
        err.status = error.response.status;
        next(err);
    }
});
/*----------------------*/

/*----------------------*/
/*ACADEMIC*/
router.get("/api/course-service/v1/academic/get", (req, res, next) => {
    /*
        #swagger.tags = ['Academic']
        #swagger.parameters['obj'] = {
            in: 'query',
            description: 'Academic data',
            required: true,
            schema: {
                studentId: '12314',
                semesterAlias: 'HK1-2023-2024'
            }
        }
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/academic/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Academic']
    */
    courseService(req, res, next);
});

router.post("/api/course-service/v1/academic/new", async (req, res, next) => {
    /*
        #swagger.tags = ['Academic']
        #swagger.description = ''
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Academic data',
            required: true,
            schema: {
                studentId: '12314',
                courseCode: '123123123123',
                semesterAlias: 'HK1-2023-2024'
            }
        }
    */
    try {
        const id_student = req.body.studentId || null;
        if (!id_student) {
            return jsonResponse({ req, res }).json({ message: `Student Id is required!` });
        }
        const studentQuery = await axios.get(`${process.env.ClIENT_SERVICE}/api/client-service/v1/student/get/${id_student}`);

        courseService(req, res, next);
    } catch (error) {
        const err = new Error(error.response.data.message);
        err.status = error.response.status;
        next(err);
    }
});
router.get("/api/course-service/v1/academic/get-academic-statistics/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Academic']
        #swagger.description = ''
        #swagger.parameters['alias'] = {
            in: 'path',
            description: 'Alias of semester.',
            required: true,
            schema: {
                alias: 'HK1-2023-2024'
            }
        }        
    */
    courseService(req, res, next);
});

router.get("/api/course-service/v1/academic/remove", (req, res, next) => {
    courseService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*SEMESTER*/
router.get("/api/course-service/v1/semester/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
        #swagger.description = 'This endpoint return a list of all semester'
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get-all-deleted", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
        #swagger.description = 'This endpoint return detail information of an alias'
    */
    courseService(req, res, next);
});
router.patch("/api/course-service/v1/semester/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
        #swagger.description = 'update status of semester'
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get/delete/:alias/force", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get-academic-statistics/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/restore/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/semester/new", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});

/*----------------------*/

/*----------------------*/
/*SCHEDULE*/
router.get("/api/course-service/v1/schedule/", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/all", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/new", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enroll", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/schedule/delete-enroll", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enrollment/all", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enrollment/semester", (req, res, next) => {
    /*
        #swagger.tags = ['schedule']
    */
    courseService(req, res, next);
});
/*===================================================================================== */

/*===================================================================================== */

//CLIENT SERVICE
/*----------------------*/
/*UPLOAD AVATAR*/
router.post("/api/client-service/v1/test/upload/:id_user", (req, res, next) => {
    /*
        #swagger.tags = ['Test']
    */
    clientService(req, res, next);
});
/*----------------------*/

/*STUDENT*/

router.get("/api/client-service/v1/student/get/:id_student", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
    */
    clientService(req, res, next);
});

router.get("/api/client-service/v1/student/student/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
    */
    clientService(req, res, next);
});
router.post("/api/client-service/v1/student/new", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                fullName: 'fullName',
                gender: 1,
                id_class: 'class',
                id_faculty: 'faculty',
                course_year: 20 
            }
        }
    */
    clientService(req, res, next);
});
router.patch("/api/client-service/v1/student/:id_student", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*CLASS*/
router.get("/api/client-service/v1/class/get/:id_class", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
    */
    clientService(req, res, next);
});

router.post("/api/client-service/v1/class/new", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                course_year: '20',
                id_faculty: '7693478'
            }
        }
    */
    clientService(req, res, next);
});

router.get("/api/client-service/v1/class/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
    */
    clientService(req, res, next);
});

router.patch("/api/client-service/v1/class/:id_class", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*USER*/

router.get("/api/client-service/v1/user/get/:id_user", (req, res, next) => {
    /*
        #swagger.tags = ['User']
    */
    clientService(req, res, next);
});

router.get("/api/client-service/v1/user/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['User']
    */
    clientService(req, res, next);
});
router.post("/api/client-service/v1/user/new", (req, res, next) => {
    /*
        #swagger.tags = ['User']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                fullName: 'fullName',
                gender: 1,
                id_faculty: 'faculty',
                role: "Student, FACULTY IT, ADMIN"
            }
        }
    */
    clientService(req, res, next);
});

router.patch("/api/client-service/v1/user/:id_user", (req, res, next) => {
    /*
        #swagger.tags = ['User']
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*FACULTY*/

router.get("/api/client-service/v1/faculty/get/:id_faculty", (req, res, next) => {
    /*
        #swagger.tags = ['Faculty']
        #swagger.description = 'This endpoint return detail information of an inputed faculty id'
    */
    clientService(req, res, next);
});

router.get("/api/client-service/v1/faculty/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Faculty']
        #swagger.description = 'This endpoint return a list of all faculty'
    */
    clientService(req, res, next);
});
router.post("/api/client-service/v1/faculty/new", (req, res, next) => {
    /*
        #swagger.tags = ['Faculty']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                faculty_name: 'Faculty name'
            }
        }
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*SCORE*/

router.get("/api/client-service/v1/score/get/:id_student", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});

router.get("/api/client-service/v1/score/get/:id_student/:id_course", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});
router.post("/api/client-service/v1/score/new", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});

router.patch("/api/client-service/v1/score/update-score", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});

module.exports = router;

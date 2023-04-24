const router = require("express").Router();
var httpProxy = require("express-http-proxy");
const jsonResponse = require("../utils/jsonResponse");
const axios = require("axios");
const authentication = require("../middleware/authentication");
const courseService = httpProxy(`${process.env.COURSE_SERVICE}`);
const clientService = httpProxy(`${process.env.CLIENT_SERVICE}`);
const accountService = httpProxy(`${process.env.ACCOUNT_SERVICE}`);
//ACCOUNT SERVICE
/*----------------------*/
router.post("/api/account-service/v1/student-login", (req, res, next) => {
    /*
        #swagger.tags = ['STUDENT']
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

router.post("/api/account-service/v1/user-login", (req, res, next) => {
    accountService(req, res, next);
});

router.post("/api/account-service/v1/change-pass", (req, res, next) => {
    accountService(req, res, next);
});

router.get("/api/account-service/v1/refresh-token", (req, res, next) => {
    accountService(req, res, next);
});
/*===================================================================================== */

/*===================================================================================== */
//COURSE SERVICE
/*----------------------*/
/*COURSE*/

router.get("/api/course-service/v1/course/get-all", authentication, (req, res, next) => {
    courseService(req, res, next);
});

router.get("/api/course-service/v1/course/get-all-deleted", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/course/get/:courseId", authentication, (req, res, next) => {
    courseService(req, res, next);
});

router.delete("/api/course-service/v1/course/delete/:courseId", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/course/delete/:courseId/force", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.put("/api/course-service/v1/course/restore/:courseId", authentication, (req, res, next) => {
    courseService(req, res, next);
});

router.post("/api/course-service/v1/course/new", async (req, res, next) => {
    try {
        const id_faculty = req.body.departmentAllowed || null;
        if (!id_faculty) {
            return jsonResponse({ req, res }).json({ message: `Faculty Id is required!` });
        }
        const facultyQuery = await axios.get(`${process.env.ClIENT_SERVICE}/api/user-service/v1/faculty/get/${id_faculty}`);

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
    courseService(req, res, next);
});
router.get("/api/course-service/v1/academic/get-all", (req, res, next) => {
    courseService(req, res, next);
});

router.post("/api/course-service/v1/academic/new", async (req, res, next) => {
    try {
        const id_student = req.body.studentId || null;
        if (!id_student) {
            return jsonResponse({ req, res }).json({ message: `Student Id is required!` });
        }
        const studentQuery = await axios.get(`${process.env.ClIENT_SERVICE}/api/user-service/v1/student/get/${id_student}`);

        courseService(req, res, next);
    } catch (error) {
        const err = new Error(error.response.data.message);
        err.status = error.response.status;
        next(err);
    }
});
router.get("/api/course-service/v1/academic/get-academic-statistics/:alias", authentication, (req, res, next) => {
    courseService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*SEMESTER*/
router.get("/api/course-service/v1/semester/get-all", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get-all-deleted", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get/:alias", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get/delete/:alias/force", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/get-academic-statistics/:alias", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.get("/api/course-service/v1/semester/restore/:alias", authentication, (req, res, next) => {
    courseService(req, res, next);
});
router.post("/api/course-service/v1/semester/new", authentication, (req, res, next) => {
    courseService(req, res, next);
});
/*===================================================================================== */

/*===================================================================================== */

//CLIENT SERVICE
/*----------------------*/
/*UPLOAD AVATAR*/
router.post("/api/user-service/v1/test/upload/:id_user", authentication, (req, res, next) => {
    clientService(req, res, next);
});
/*----------------------*/

/*STUDENT*/

router.get("/api/user-service/v1/student/get/:id_student", authentication, (req, res, next) => {
    clientService(req, res, next);
});

router.get("/api/user-service/v1/student/student/get-all", authentication, (req, res, next) => {
    clientService(req, res, next);
});
router.post("/api/user-service/v1/student/new", authentication, (req, res, next) => {
    clientService(req, res, next);
});
router.patch("/api/user-service/v1/student/:id_student", authentication, (req, res, next) => {
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*CLASS*/
router.get("/api/user-service/v1/class/get/:id_class", authentication, (req, res, next) => {
    clientService(req, res, next);
});

router.post("/api/user-service/v1/class/new", (req, res, next) => {
    clientService(req, res, next);
});

router.get("/api/user-service/v1/class/get-all", (req, res, next) => {
    clientService(req, res, next);
});

router.patch("/api/user-service/v1/class/:id_class", (req, res, next) => {
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*USER*/

router.get("/api/user-service/v1/user/get/:id_user", (req, res, next) => {
    clientService(req, res, next);
});

router.get("/api/user-service/v1/user/get-all", (req, res, next) => {
    clientService(req, res, next);
});
router.post("/api/user-service/v1/user/new", (req, res, next) => {
    clientService(req, res, next);
});

router.patch("/api/user-service/v1/user/:id_user", (req, res, next) => {
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*FACULTy*/

router.get("/api/user-service/v1/faculty/get/:id_faculty", (req, res, next) => {
    clientService(req, res, next);
});

router.get("/api/user-service/v1/faculty/get-all", (req, res, next) => {
    clientService(req, res, next);
});
router.post("/api/user-service/v1/faculty/new", (req, res, next) => {
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*SCORE*/

router.get("/api/user-service/v1/score/get/:id_student", (req, res, next) => {
    clientService(req, res, next);
});

router.get("/api/user-service/v1/score/get/:id_student/:id_course", (req, res, next) => {
    clientService(req, res, next);
});
router.post("/api/user-service/v1/score/new", (req, res, next) => {
    clientService(req, res, next);
});

router.patch("/api/user-service/v1/score/update-score", (req, res, next) => {
    clientService(req, res, next);
});

module.exports = router;

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
            required: true,
            schema: {
                username: "",
                password: ""
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
            description: 'User data',
            required: true,
            schema: {
                username: "",
                password: ""
            }
        }
    */
    accountService(req, res, next);
});

router.post("/api/account-service/v1/change-pass", (req, res, next) => {
    /* 
        #swagger.tags = ['Account']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                username: '',
                oldPassword: '',
                newPassword: ''
            }
        }
    */
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

router.get("/api/course-service/v1/course/get-all", (req, res, next) => {
    /* 
        #swagger.tags = ['Course']
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
        #swagger.parameters['courseId'] = {
            in: 'path',
            required: true,
            schema: {
                courseId: '12345'
            }
        }
        
    */
    courseService(req, res, next);
});

router.delete("/api/course-service/v1/course/delete/:courseId", (req, res, next) => {
    /*  
        # swagger.tags['Course']
    */
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/course/delete/:courseId/force", (req, res, next) => {
    /*  
        # swagger.tags['Course']
    */
    courseService(req, res, next);
});
router.put("/api/course-service/v1/course/restore/:courseId", (req, res, next) => {
    /*  
        # swagger.tags['Course']
    */
    courseService(req, res, next);
});

router.post("/api/course-service/v1/course/new", async (req, res, next) => {
    /*  
        ## swagger.tags['Course']
        ## swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                code: 1,
                name: '',
                credits: 1,
                description: '',
                departmentAllowed: ''
            }
        }
    */

    try {
        const { code, name, credits, description, prerequisite, timeAllocation, departmentAllowed } = req.body;
        const id_faculty = departmentAllowed || null;
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
    /*
        #swagger.tags = ['Academic']
        #swagger.parameters['studentId'] = {
            in: 'query',
            description: 'Id student',
            required: true,
            schema: {
                studentId: '12314',
            }
        }
        #swagger.parameters['semesterAlias'] = {
            in: 'query',
            description: 'Semester ',
            required: true,
            schema: {
                semesterAlias: '12314',
            }
        }
        
    */
    courseService(req, res, next);
});

// router.get("/api/course-service/v1/academic/get-all", (req, res, next) => {
//     /*
//         #swagger.tags = ['Academic']
//     */
//     courseService(req, res, next);
// });

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
        const studentQuery = await axios.get(`${process.env.ClIENT_SERVICE}/api/user-service/v1/student/get/${id_student}`);

        courseService(req, res, next);
    } catch (error) {
        const err = new Error(error.response.data.message);
        err.status = error.response.status;
        next(err);
    }
});
router.get("/api/course-service/v1/academic/statistics/:alias", (req, res, next) => {
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

router.delete("/api/course-service/v1/academic/remove", (req, res, next) => {
    /* 
        #swagger.tags = ['Academic']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                studentId: '',
                courseCode: 1,
                semesterAlias: ''
            }
        }
    */
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
        #swagger.description = 'Update status of semester'
    */
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/semester/delete/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});

router.delete("/api/course-service/v1/semester/delete/:alias/force", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});

// router.get("/api/course-service/v1/semester/get-academic-statistics/:alias", (req, res, next) => {
//     /*
//         #swagger.tags = ['Semester']
//     */
//     courseService(req, res, next);
// });

router.put("/api/course-service/v1/semester/restore/:alias", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/semester/new", (req, res, next) => {
    /*
        #swagger.tags = ['Semester']
        #swagger.parameters['obj] = {
            in: 'body',
            required: true,
            schema: {
                alias: '',
            }
        }
    */
    courseService(req, res, next);
});

/*----------------------*/

/*----------------------*/
/*SCHEDULE*/
// router.get("/api/course-service/v1/schedule/", (req, res, next) => {
//     /*
//         #swagger.tags = ['Schedule']
//     */
//     courseService(req, res, next);
// });
router.post("/api/course-service/v1/schedule/all", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                semesterAlias: ''
            }
        }
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/new", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                "courseCode":432,
                "semesterAlias":"",
                "groupId":1,
                "limit": 10,
                "periods": [1,2,3],
                "weeks": [1,2,3],
                "day":""
            }
        }
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enroll", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
        #swagger.parameters['obj] = {
            in: 'body',
            required: true,
            schema: { 
                studentId: '', 
                courseCode: 504070, 
                semesterAlias: '', 
                groupId: 1
            }
        }
    */
    courseService(req, res, next);
});
router.delete("/api/course-service/v1/schedule/delete-enroll", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
        #swagger.parameters['obj] = {
            in: 'body',
            required: true,
            schema: { 
                studentId: '', 
                courseCode: 504070, 
                semesterAlias: '', 
                groupId: 1
            }
        }
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enrollment/all", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
        #swagger.parameters['obj] = {
            in: 'body',
            required: true,
            schema: { 
                studentId: '',
            }
        }
    */
    courseService(req, res, next);
});
router.post("/api/course-service/v1/schedule/enrollment/semester", (req, res, next) => {
    /*
        #swagger.tags = ['Schedule']
          #swagger.parameters['obj] = {
            in: 'body',
            required: true,
            schema: { 
                studentId: '', 
                semesterAlias: ''
            }
        }
    */
    courseService(req, res, next);
});
/*===================================================================================== */

/*===================================================================================== */

//CLIENT SERVICE
/*----------------------*/
/*UPLOAD AVATAR*/
router.post("/api/user-service/v1/test/upload/:id_user", (req, res, next) => {
    /*
        #swagger.tags = ['Test']
    */
    clientService(req, res, next);
});
/*----------------------*/

/*STUDENT*/

router.get("/api/user-service/v1/student/get/:id_student", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
    */
    clientService(req, res, next);
});

router.get("/api/user-service/v1/student/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
    */
    clientService(req, res, next);
});
router.post("/api/user-service/v1/student/new", (req, res, next) => {
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
router.patch("/api/user-service/v1/student/update", (req, res, next) => {
    /*
        #swagger.tags = ['Student']
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                "id_student": 'User Id',
                fullName: 'name',
                address: '19 NHT, TP, Q7',
                phoneNumber: '0909123123'
            }
        }
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*CLASS*/
router.get("/api/user-service/v1/class/get/:id_class", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
    */
    clientService(req, res, next);
});

router.post("/api/user-service/v1/class/new", (req, res, next) => {
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

router.get("/api/user-service/v1/class/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Class']
    */
    clientService(req, res, next);
});

// router.patch("/api/user-service/v1/class/update", (req, res, next) => {
//     /*
//         #swagger.tags = ['Class']
//         #swagger.parameters['obj'] = {
//             in: 'body',
//             required: true,
//             schema: {
//                 id_class: '',
//                 id_faculty: '7693478',
//                 course_year: '20'
//             }
//         }

//     */
//     clientService(req, res, next);
// });
/*----------------------*/

/*----------------------*/
/*USER*/

router.get("/api/user-service/v1/user/get/:id_user", (req, res, next) => {
    /*
        #swagger.tags = ['User']
    */
    clientService(req, res, next);
});

router.get("/api/user-service/v1/user/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['User']
    */
    clientService(req, res, next);
});
router.post("/api/user-service/v1/user/new", (req, res, next) => {
    /*
        #swagger.tags = ['User']
        #swagger.parameters['obj'] = {
            in: 'body',
            required: true,
            schema: {
                fullName: 'fullName',
                gender: 1,
                id_faculty: 'faculty id',
                role: "FACULTY IT"
            }
        }
    */
    clientService(req, res, next);
});

router.patch("/api/user-service/v1/user/update", (req, res, next) => {
    /*
        #swagger.tags = ['User']
        #swagger.parameters['obj'] = {
            in: 'body',
            schema: {
                id_user: 'User id',
                fullName: 'name',
                address: '19 NHT, TP, Q7',
                phoneNumber: '0909123123'
            }
        }
    */
    clientService(req, res, next);
});
/*----------------------*/

/*----------------------*/
/*FACULTY*/

router.get("/api/user-service/v1/faculty/get/:id_faculty", (req, res, next) => {
    /*
        #swagger.tags = ['Faculty']
        #swagger.description = 'This endpoint return detail information of an inputed faculty id'
    */
    clientService(req, res, next);
});

router.get("/api/user-service/v1/faculty/get-all", (req, res, next) => {
    /*
        #swagger.tags = ['Faculty']
        #swagger.description = 'This endpoint return a list of all faculty'
    */
    clientService(req, res, next);
});
router.post("/api/user-service/v1/faculty/new", (req, res, next) => {
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

router.get("/api/user-service/v1/score/get/:id_student", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});

router.get("/api/user-service/v1/score/get/:id_student/:id_course", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
    */
    clientService(req, res, next);
});
router.post("/api/user-service/v1/score/new", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
        #swagger.parameters[obj] = {
            in: 'body',
            required: true,
            schema: {
                id_student: '',
                id_course: '',
                semester: ''
            }
        }
    */
    clientService(req, res, next);
});

router.patch("/api/user-service/v1/score/update-score", (req, res, next) => {
    /*
        #swagger.tags = ['Score']
        #swagger.parameters[obj] = {
            in: 'body',
            required: true,
            schema: {
                id: '',
                attendance_score: 10,
                assignment: 10,
                mid_tern: 10,
                final_tern: 10
            }
        }
    */
    clientService(req, res, next);
});

module.exports = router;

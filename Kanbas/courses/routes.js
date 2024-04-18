import * as dao from "./dao.js";

let currentCourse = null;

export default function CourseRoutes(app) {

  const findCourseById = async (req, res) => {
    const course = await dao.findCourseById(req.params.courseId);
    res.json(course);
  };
  
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    currentCourse = await dao.findCourseById(courseId);
    res.json(status);
  };

  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };

  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };

  const findAllCourses = async (req, res) => {
    const { number } = req.query;
    if (number) {
      const courses = await dao.findCourseByNumber(number);
      res.json(courses);
      return;
    }
    const courses = await dao.findAllCourses();
    res.json(courses);
    return;
  };

  app.get("/api/courses", findAllCourses);
  app.post("/api/courses", createCourse);
  app.get("/api/courses/:id", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);

}

// import Database from "../Database/index.js";
// export default function CourseRoutes(app) {
//   app.get("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = Database.courses
//       .find((c) => c._id === id);
//     if (!course) {
//       res.status(404).send("Course not found");
//       return;
//     }
//     res.send(course);
//   });

//   app.put("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     const course = req.body;
//     Database.courses = Database.courses.map((c) =>
//       c._id === id ? { ...c, ...course } : c
//     );
//     res.sendStatus(204);
//   });

//   app.delete("/api/courses/:id", (req, res) => {
//     const { id } = req.params;
//     Database.courses = Database.courses
//       .filter((c) => c._id !== id);
//     res.sendStatus(204);
//   });

//   app.post("/api/courses", (req, res) => {
//     const course = { ...req.body, _id: new Date().getTime().toString() };
//     Database.courses.push(course);
//     res.send(course);
//   });

//   app.get("/api/courses", (req, res) => {
//     const courses = Database.courses;
//     res.send(courses);
//   });
// }

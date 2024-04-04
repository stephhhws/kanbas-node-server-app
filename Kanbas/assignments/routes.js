import db from "../Database/index.js";
function AssignmentRoutes(app) {
    app.put("/api/assignments/:assign", (req, res) => {
        const { assign } = req.params;
        const assignmentIndex = db.assignments.findIndex(
          (m) => m._id === assign);
        db.assignments[assignmentIndex] = {
          ...db.assignments[assignmentIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    
    app.delete("/api/assignments/:assign", (req, res) => {
        const { assign } = req.params;
        db.assignments = db.assignments.filter((m) => m._id !== assign);
        res.sendStatus(200);
      });

      
    app.post("/api/courses/:course/assignments", (req, res) => {
        const { course } = req.params;
        const newAssignment = {
          ...req.body,
          course: course,
          _id: new Date().getTime().toString(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
      });
    

  app.get("/api/courses/:course/assignments", (req, res) => {
    const { course } = req.params;
    const assignments = db.assignments
      .filter((m) => m.course === course);
    res.send(assignments);
  });
}
export default AssignmentRoutes;
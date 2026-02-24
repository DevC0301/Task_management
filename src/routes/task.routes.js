const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  assignTask,
} = require("../controllers/task.controller");

const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");

// all task routes require authentication
router.use(protect);

// create + list tasks
router
  .route("/")
  .post(authorize("admin"), createTask)
  .get(getTasks);

// update + delete task
router
  .route("/:id")
  .put(updateTask)
  .delete(authorize("admin"), deleteTask);

// assign task
router.put("/:id/assign", authorize("admin"), assignTask);

module.exports = router;

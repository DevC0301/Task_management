const Task = require("../models/task.model");

/*
========================
CREATE TASK
========================
*/
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created",
      task,
    });
  } catch (error) {
    next(error);
  }
};

/*
========================
GET TASKS
========================
*/
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

/*
========================
UPDATE TASK
========================
*/
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task updated",
      task,
    });
  } catch (error) {
    next(error);
  }
};

/*
========================
DELETE TASK
========================
*/
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};

/*
========================
ASSIGN TASK
========================
*/
exports.assignTask = async (req, res, next) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.assignedTo = assignedTo;
    await task.save();

    res.json({
      success: true,
      message: "Task assigned",
      task,
    });
  } catch (error) {
    next(error);
  }
};

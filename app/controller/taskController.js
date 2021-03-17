const { baseResponse } = require("../utils/helper/baseResponse");
const { task } = require("./../db/models");

class TaskController {
  static async createTask(req, res, next) {
    try {
      const data = {
        userId: req.body.userId,
        assignee: req.body.assignee,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        status: "todo",
        attachment: req.body.attachment,
      };
      const createData = await task.create(data);
      return baseResponse({ message: "success create task", data: createData })(
        res,
        201
      );
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllTask(req, res, next) {
    //   if req.user == role? baru di arahkan sesuai dengan role
    // jika rolenya user dia hanya bisa get punya dirinya sendiri
    // Jika dia admin dan supervisor dia bisa liat smeuanya
    try {
      const data = await task.findAll();
      return baseResponse({ message: "Get All data", data: data })(res, 200);
    } catch (error) {
      res.status(500);
      next(error);
    }
  }

  static async getAllById(req, res, next) {
    //   if req.user == role? baru di arahkan sesuai dengan role
    // jika rolenya user dia hanya bisa get punya dirinya sendiri
    // Jika dia admin dan supervisor dia bisa liat smeuanya
    // Kenapa tidak pake findByPk karena untuk melindungi data admin
    // dan supervisor
    // findOne Where role:admin,supervisor,user
    try {
      const data = await task.findOne(req.params.id);
      if (data) {
          return baseResponse({message:"success get data",data:data})(res, 200)
      }
    //   return baseResponse({success:false,})
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
}

module.exports = TaskController;

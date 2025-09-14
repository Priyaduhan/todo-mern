import { todoModel } from "../models/todo_models.js";

export const createTodo = async (req, res) => {
  try {
    const data = req.body;
    console.log("task is ", data);
    const todo = await todoModel.create({
      title: data.task,
      isCompleted: data.isCompleted,
      user: req.user.id,
    });
    console.log("req.user from jwt token  is:", req.user);

    res.json(todo);
  } catch (error) {
    console.log("error is", error);
  }
};

export const showTodo = async (req, res) => {
  try {
    console.log("show to do ,", req);

    // console.log("user id is::", req.user_id);

    const ReadData = await todoModel.find({ user: req.user.id });
    // console.log("data came from db is", ReadData);
    res.status(200).json(ReadData);
  } catch (error) {
    console.log("some error occur while reading", error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const deleteTodo = await todoModel.findByIdAndDelete(id);
    console.log(deleteTodo);

    res.json(deleteTodo);
  } catch (error) {
    console.log("some error occur:", error);
  }
};

export const updateTask = async (req, res) => {
  try {
    // console.log("request coming is");
    const id = req.params.id;
    // console.log(req);
    const newTask = req.body.editedTask;
    console.log("req.body is ", req.body.editedTask);
    const updateNewTask = await todoModel.findByIdAndUpdate(
      id,
      { title: newTask },
      {
        new: true,
      }
    );
    if (!updateNewTask) {
      res.json({ msg: "this task doest not exist" });
    }

    res.json(updateNewTask);
  } catch (error) {
    console.log("some error occur ");
  }
};

export const updateCompletedTask = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log(req.body);
    const isChecked = req.body.isChecked;

    const updateTask = await todoModel.findByIdAndUpdate(
      id,
      { isCompleted: isChecked },
      {
        new: true,
      }
    );

    res.json({ msg: "sucess checked" });
  } catch (error) {
    console.log("some error occur", error);
  }
};

import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const [ToDo, setToDo] = useState([]);
  const [taskList, setTaskList] = useState([]); // state to show the list of all tasks
  const [editTab, setEditTab] = useState(false);
  const [editTaskId, setEditTaskId] = useState();
  const [editedTask, setEditedTask] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [completedTaskList, setCompletedTaskList] = useState([]);

  const editDialogueToggle = (id, title) => {
    // console.log(taskList.filter((item) => item.id == editTaskId));
    setEditTaskId(id);
    setEditedTask(title);
    // console.log("edit task id is ", editTaskId);

    console.log("tasklist is ", taskList);

    setEditTab(true);
  };

  const addTask = async () => {
    try {
      const response = await fetch(`${API_URL}/api`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: ToDo, isCompleted: false }),
      });

      const result = await response.json();
      console.log("result addtodo get from server is", result);
      if (result && result._id) {
        setTaskList([...taskList, result]);
      }

      setToDo("");
    } catch (error) {
      console.log("error in addTask:", error);
    }
  };

  const printTask = async () => {
    try {
      const response = await fetch(`${API_URL}/api`, {
        method: "GET",
        credentials: "include",
      });

      const result = await response.json();
      console.log(result);
      // setTaskList(result);

      if (Array.isArray(result)) {
        setTaskList(result);
        console.log("task list set successfully");
      } else {
        console.error("Expected array but got:", result);
        setTaskList([]); // fallback to empty array
      }
      console.log("task list is set");

      // console.log("task list useState is", taskList);
    } catch (error) {
      console.log("some error is ", error);
      setTaskList([]);
    }
  };

  const deleteTodoTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log("data coming from backend is", data);

      const filterTaskList = taskList.filter((item) => item._id !== data._id);
      setTaskList(filterTaskList);
    } catch (error) {
      console.log("some error occur", error);
    }
  };

  const handleEditTask = async () => {
    try {
      if (!editedTask.trim()) {
        alert("Task cannot be empty!");
        return;
      }

      const response = await fetch(`${API_URL}/api/${editTaskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editedTask }),
      });
      const updatedData = await response.json();
      setTaskList(
        taskList.map((item) => (item._id === editTaskId ? updatedData : item))
      );
      setEditTab(false);
      setEditedTask("");
      setEditTaskId("");

      console.log("data coming from backend to update", updatedData);
    } catch (error) {
      console.log("some error occur in frontend patch", error);
    }
  };

  const handleCheckedTodo = async (id, currentStatus) => {
    try {
      const newChecked = !currentStatus;
      setIsChecked(newChecked);

      const response = await fetch(`${API_URL}/api/checked/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isChecked: newChecked }),
      });
      const data = await response.json();
      console.log(data);
      setTaskList(
        taskList.map((item) =>
          item._id === id ? { ...item, isCompleted: newChecked } : item
        )
      );
    } catch (error) {
      console.log("error occur in handlecheckTodo", error);
    }
  };

  useEffect(() => {
    console.log("edit task id is ", editTaskId);
  }, [editTaskId]);

  useEffect(() => {
    console.log("Updated taskList:", taskList);
  }, [taskList]);

  useEffect(() => {
    printTask();
  }, []);

  return (
    <div>
      <div className="flex flex-col border items-center  mt-10 w-[30rem] h-[30rem] mx-auto rounded-md bg-orange-100">
        <h1 className=" text-2xl w-full flex justify-center bg-orange-200 my-2">
          ToDo App
        </h1>
        <div className="flex gap-2  ">
          <input
            className="border rounded-sm px-1"
            type="text"
            placeholder="Add your task"
            value={ToDo}
            onChange={(e) => setToDo(e.target.value)}
          />
          <button
            className="border px-2 rounded-sm bg-blue-100 font-medium cursor-pointer"
            onClick={addTask}
          >
            ADD
          </button>
        </div>
        {editTab && (
          <div className="mt-3 flex gap-1">
            <input
              type="text"
              className="border rounded-md px-2 py-0.5"
              value={editedTask}
              onChange={(e) => setEditedTask(e.target.value)}
            />
            <button
              onClick={() => handleEditTask()}
              className="border px-2 rounded-sm bg-blue-100 font-medium cursor-pointer"
            >
              EDIT
            </button>
          </div>
        )}
        <div className="flex flex-col mt-7  w-[25rem] h-auto  ">
          <div>
            {taskList.map((item, index) => (
              <div key={item._id}>
                <div className="flex border-b-1 w-full justify-between px-4 my-2">
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      className="accent-green-500"
                      checked={item.isCompleted}
                      onChange={() =>
                        handleCheckedTodo(item._id, item.isCompleted)
                      }
                    />
                    <p
                      className={
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }
                    >
                      {item.title}
                    </p>
                  </div>
                  <div className="flex gap-2 text-lg mt-0.5">
                    <FaRegEdit
                      className="cursor-pointer"
                      onClick={() => editDialogueToggle(item._id, item.title)}
                    />

                    <MdDelete
                      className="cursor-pointer"
                      onClick={() => deleteTodoTask(item._id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

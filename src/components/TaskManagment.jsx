import { useContext, useState } from "react";
import { AuthContext } from "../provaider/AuthProvaider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { FaPlusCircle } from "react-icons/fa";

const TaskManagment = () => {
  const { user } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const addedDate = new Date();

  //   send data in db
  const handleSubmit = async (e) => {
    e.preventDefault();
    const getData = e.target;

    const taskData = {
      title: getData.title.value,
      description: getData.description.value,
      category: getData.category.value,
      user: user?.email,
      date: addedDate,
    };

    await axios
      .post("https://task-server-rouge-five.vercel.app/task", taskData)
      .then((res) => {
        if (res.data.insertedId) {
          // successfull message
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Task added successfully!",
            showConfirmButton: false,
            timer: 800,
          });
          // close the modal
          document.getElementById("my_modal_3").close();

          // clear form data
          getData.reset();

          // refetch data
          refetch();
        }
      });
  };

  // get all task data
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://task-server-rouge-five.vercel.app/tasks/${user?.email}`
      );
      return data;
    },
  });
  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});

  // delete task
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You task will be delete permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E2939",
      cancelButtonColor: "#EB5971",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`https://task-server-rouge-five.vercel.app/tasks/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                position: "top-center",
                title: "Deleted!",
                text: "Your task has been deleted.",
                icon: "success",
                showConfirmButton: false,
                timer: 800,
              });
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Task updated successfully!",
                showConfirmButton: false,
                timer: 800,
              });
              refetch();
            }
          });
      }
    });
  };

  // handle update modal open with dynamic data
  const handelModal = async (id) => {
    try {
      refetch();
      await axios
        .get(`https://task-server-rouge-five.vercel.app/single-task/${id}`)
        .then((res) => {
          setTask(res.data);
          document.getElementById("updateModal").showModal();
        });
    } catch (err) {
      console.log(err);
    }
  };

  // handle update data
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedData = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
    };

    try {
      // Send the updated data to the backend
      await axios.patch(
        `https://task-server-rouge-five.vercel.app/task/${task._id}`,
        updatedData
      );

      // Success message
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Task updated successfully!",
        showConfirmButton: false,
        timer: 800,
      });

      // Close the modal
      document.getElementById("updateModal").close();

      // Refetch tasks
      refetch();
    } catch (error) {
      console.error("Error updating task:", error);
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Failed to update task.",
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  return (
    <>
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-2">
          {/* title bar */}
          <div>
            <div className="flex justify-between items-center sm:gap-5 flex-wrap mb-5 sm:mb-0 font-medium">
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
            </div>
            <div className="divider text-2xl md:text-5xl font-bold mt-8 mb-14">
              Notes
            </div>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-gray-800 p-2 rounded w-full my-8 text-white cursor-pointer flex items-center justify-center gap-2"
            >
              <FaPlusCircle />
              Add new task
            </button>
          </div>

          {/* map all task */}
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* To Do section */}
              <div className="border border-slate-200 flex flex-col gap-5 p-5">
                <h3 className="text-center font-semibold text-xl">To Do</h3>
                <div className="divider my-0"></div>
                {groupedTasks["To Do"]?.map((item) => (
                  <div key={item._id} className="card shadow-md bg-white">
                    <div className="card-body p-6">
                      <h2 className="card-title text-xl font-bold text-gray-800 mt-2">
                        {item.title.slice(0, 30)}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {item.description.slice(0, 100)}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Added on: {format(new Date(item.date), "Pp")}
                      </p>
                      <div className="card-actions flex justify-end mt-6 space-x-3">
                        <button
                          onClick={() => handelModal(item._id)}
                          className="btn btn-sm rounded bg-gray-800 text-white px-4 py-2 "
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-error btn-sm text-white px-4 py-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 flex flex-col gap-5 p-5">
                <h3 className="text-center font-semibold text-xl">
                  In Progress
                </h3>
                <div className="divider my-0"></div>
                {groupedTasks["In Progress"]?.map((item) => (
                  <div key={item._id} className="card shadow-md bg-white">
                    <div className="card-body p-6">
                      <h2 className="card-title text-xl font-bold text-gray-800 mt-2">
                        {item.title.slice(0, 30)}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {item.description.slice(0, 100)}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Added on: {format(new Date(item.date), "Pp")}
                      </p>
                      <div className="card-actions flex justify-end mt-6 space-x-3">
                        <button
                          onClick={() => handelModal(item._id)}
                          className="btn btn-sm rounded bg-gray-800 text-white px-4 py-2 "
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-error btn-sm text-white px-4 py-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border border-slate-200 flex flex-col gap-5 p-5">
                <h3 className="text-center font-semibold text-xl">Done</h3>
                <div className="divider my-0"></div>
                {groupedTasks["Done"]?.map((item) => (
                  <div key={item._id} className="card shadow-md bg-white">
                    <div className="card-body p-6">
                      <h2 className="card-title text-xl font-bold text-gray-800 mt-2">
                        {item.title.slice(0, 30)}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {item.description.slice(0, 100)}
                      </p>
                      <p className="text-sm text-gray-400 mt-2">
                        Added on: {format(new Date(item.date), "Pp")}
                      </p>
                      <div className="card-actions flex justify-end mt-6 space-x-3">
                        <button
                          onClick={() => handelModal(item._id)}
                          className="btn btn-sm rounded bg-gray-800 text-white px-4 py-2 "
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-error btn-sm text-white px-4 py-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center my-5"><p>No Task Available</p></div>
          )}
        </div>
      </div>

      {/* upload data modal */}
      <dialog id="my_modal_3" className="modal backdrop-blur-xs">
        <div className="modal-box rounded">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* add task form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-5">
            <input
              className="border w-full p-2 rounded outline-none"
              name="title"
              type="text"
              placeholder="Title"
              required
            />
            <textarea
              name="description"
              className="border w-full p-2 rounded outline-none h-32"
              placeholder="Description"
              required
            ></textarea>
            <select name="category" className="border w-full p-2 rounded">
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white p-2 rounded mt-5 cursor-pointer outline-none flex items-center gap-2 justify-center"
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>

      {/* up-date data modal */}
      <dialog id="updateModal" className="modal backdrop-blur-xs">
        <div className="modal-box rounded">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {/* update form */}
          <form onSubmit={handleUpdate} className="flex flex-col gap-5 pt-5">
            <input
              defaultValue={task?.title}
              className="border w-full p-2 rounded outline-none"
              name="title"
              type="text"
              placeholder="Title"
              required
            />
            <textarea
              defaultValue={task?.description}
              name="description"
              className="border w-full p-2 rounded outline-none h-32"
              placeholder="Description"
              required
            ></textarea>
            <select
              defaultValue={task?.category}
              name="category"
              className="border w-full p-2 rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white p-2 rounded mt-5 cursor-pointer outline-none flex items-center gap-2 justify-center"
            >
              Update
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TaskManagment;

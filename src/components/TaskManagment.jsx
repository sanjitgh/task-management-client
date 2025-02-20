import { useContext, useState } from "react";
import { FaFan, FaPlusCircle } from "react-icons/fa";
import { AuthContext } from "../provaider/AuthProvaider";
import axios from "axios";
import toast from "react-hot-toast";
const TaskManagment = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const date = new Date();

  //   send data in db
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const getData = e.target;

    const taskData = {
      title: getData.title.value,
      description: getData.description.value,
      category: getData.category.value,
      user: user?.email,
      date,
    };

    await axios.post("http://localhost:5000/task", taskData).then((res) => {
      if (res.data.insertedId) {
        // successfull message
        toast.success("Task added successfully!");

        // close the modal
        document.getElementById("my_modal_3").close();

        // loading off
        setLoading(false);

        // clear form data
        getData.reset();
      }
    });
  };

  return (
    <>
      <div className="py-10">
        <div className="max-w-6xl mx-auto px-2">
          {/* title bar */}
          <div>
            <h1 className="text-3xl text-center font-bold">Task Board</h1>
            <button
              onClick={() => document.getElementById("my_modal_3").showModal()}
              className="bg-gray-800 p-2 rounded w-full my-5 text-white cursor-pointer flex items-center justify-center gap-2"
            >
              <FaPlusCircle></FaPlusCircle> Add new task
            </button>
          </div>
          {/* map all task */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"></div>
        </div>
      </div>

      {/* Modal You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
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
              {loading ? <span>Submit</span> : <FaFan></FaFan>}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default TaskManagment;

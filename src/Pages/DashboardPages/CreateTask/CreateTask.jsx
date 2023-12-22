import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const CreateTask = () => {
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    axiosSecure.post("/todo", data).then((data) => {
      console.log(data.data);
      if (data.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully You Submit a Task",
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Title</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Type Your Task Title"
              className="input w-full input-bordered"
            />
            {errors.title && <p>title is required.</p>}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Deadline</span>
            </label>
            <input
              type="date"
              {...register("deadline", { required: true })}
              className="input w-full input-bordered"
            />
            {errors.deadline && <p>Task Deadline is required.</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task priority</span>
            </label>
            <select
              className="select select-bordered w-full "
              {...register("priority")}
              defaultValue={""}
            >
              <option value={""}>Select Priority</option>
              <option value={"low"}>Low</option>
              <option value={"medium"}>Medium</option>
              <option value={"high"}>High</option>
            </select>
            {errors.deadline && <p>Task Deadline is required.</p>}
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Description</span>
          </label>
          <textarea
            {...register("desc", { required: true })}
            cols="30"
            rows="10"
            className="textarea textarea-bordered h-24"
          ></textarea>
          {errors.desc && <p>Task Description is required.</p>}
        </div>

        <div className="form-control mt-6">
          <button className="btn bg-pink-500 text-white">Submit Task</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;

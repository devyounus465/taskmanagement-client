import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import Swal from "sweetalert2";

// drag

import { useDrag } from "react-dnd";

const TaskCard = ({ item, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/todo/${item._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  // drag

  const [{ isDragging }, drag] = useDrag({
    type: "box",
    item: { id: item._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "move",
          border: "1px solid #000",
        }}
        className="card bg-base-100 shadow-xl"
      >
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>

          <p className="text-sm">{`${item.desc}`.slice(0, 85)}...</p>
          <p>
            Deadline:<span className="text-red-500">{item.deadline}</span>
          </p>
          <div className="card-actions justify-end">
            <button className=" text-red-500 text-xl">
              <FaRegEdit />
            </button>
            <button
              onClick={() => handleDelete(item)}
              className=" text-red-500 text-xl"
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

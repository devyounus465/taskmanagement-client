import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskCard from "./TaskCard";

// drop
import { useDrop } from "react-dnd";
import { useState } from "react";

const OverView = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTask] = useState([]);
  const { data: todoList = [], refetch } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const res = await axiosSecure.get("/todo");
      return res.data;
    },
  });

  const [{ isOver }, drop] = useDrop({
    accept: "box",
    drop: (dragItem) => addItemToSection(dragItem.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const addItemToSection = (id) => {
    console.log("dropped", id);

    const mTask = todoList.filter((t) => t._id === id);
    console.log(mTask[0]._id);

    setTask([...tasks, mTask[0]]);
  };
  console.log("amr task", tasks);
  //   tasks.map((item) => {
  //     console.log(item._id);
  //   });
  //   console.log(tasks);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6">
        {/* todo list */}
        <div className="bordered border-2 p-4 rounded-sm md:col-span-2 bg-gray-100">
          <h2 className="text-2xl font-semibold bg-gray-600 p-2 mb-4 text-white">
            To DO List
          </h2>

          {/* dragable element */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todoList.map((item) => (
              <TaskCard key={item._id} item={item} refetch={refetch}></TaskCard>
            ))}
          </div>
        </div>

        {/* on going list */}
        <div
          ref={drop}
          className="bordered border-2 p-4 rounded-sm  md:col-span-2"
        >
          <h2>On Goning List</h2>
          <div className={`${isOver ? "bg-slate-200" : ""}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks?.map((task) => (
                <div key={task._id} className="card  bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{task.title}</h2>
                    <p>{`${task.desc}`.slice(0, 85)}...</p>
                    <p>
                      Deadline:
                      <span className="text-red-500">{task.deadline}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* on complete list */}
        <div className="bordered border-2 p-4 rounded-sm md:col-span-2">
          <h2>Complete List</h2>
        </div>
      </div>
    </div>
  );
};

export default OverView;

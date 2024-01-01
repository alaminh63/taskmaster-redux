import { useDispatch, useSelector } from "react-redux";
// import MyTasksCard from "./MyTasksCard";
import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { updateStatus, userTasks } from "../../redux/features/tasks/taskSlice";
import MyTasksModal from "./MyTasksModal";
import { useState } from "react";
import { useEffect } from "react";

const MyTasks = () => {
  const { tasks, userSpecificTasks } = useSelector((state) => state.tasksSlice);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { name: userName } = useSelector((state) => state.userSlice);







  
  
  
  useEffect(() => {
    dispatch(userTasks(userName));
  }, [userName, dispatch, tasks]);
  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks?.map((item) => (
          <div
            key={item.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <MyTasksModal isOpen={isOpen} setIsOpen={setIsOpen} item={item} />
            <h1>{item.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="grid place-content-center"
                title="Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() =>
                  dispatch(updateStatus({ id: item.id, status: "done" }))
                }
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;

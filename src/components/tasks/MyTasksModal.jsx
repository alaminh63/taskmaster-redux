import { ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { removeTask, updateStatus } from "../../redux/features/tasks/taskSlice";
import Modal from "../ui/Modal";

const MyTasksModal = ({ isOpen, setIsOpen, item }) => {
  const dispatch = useDispatch();

  let updatedStatus;
  if (item.status === "pending") {
    updatedStatus = "running";
  } else if (item.status === "running") {
    updatedStatus = "done";
  } else {
    updatedStatus = "archive";
  }

  let textColor;
  if (item.priority === "high") {
    textColor = "text-red-500";
  } else if (item.priority === "medium") {
    textColor = "text-blue-500";
  } else if (item.priority === "low") {
    textColor = "text-green-500";
  } else {
    textColor = "text-black";
  }
  const onCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="bg-secondary/10 rounded-md p-5 ">
       
        <h1
          className={`text-lg font-semibold mb-3  
          ${textColor}
        `}
        >
          {item?.title}
        </h1>
        <p className="mb-3">{item?.description}</p>
        <p className="text-sm">Assigned to - {item?.assignedTo}</p>
        <div className="flex justify-between mt-3">
          <p>{item?.date}</p>
          <div className="flex gap-3">
            <button
              onClick={() => dispatch(removeTask(item.id))}
              title="Delete"
            >
              <TrashIcon className="h-5 w-5 text-red-500" />
            </button>
            <button
              onClick={() =>
                dispatch(updateStatus({ id: item.id, status: updatedStatus }))
              }
              title="Update Status"
            >
              <ArrowRightIcon className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
        <div className="flex justify-center">

          <button
            onClick={() => onCancel()}
            type="button"
            className="btn btn-danger mt-4 "
            >
            Cancel
          </button>
              </div>
      </div>
    </Modal>
  );
};

export default MyTasksModal;

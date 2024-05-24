"use client";

import CustomButton from "../ui/CustomButton";
import { useAppContext } from "../../_contexts/AppContext";
import { createNewTask } from "../../_service/taskService";

import { NewTask } from "../../_types/models/task";

export default function NewTaskInterface() {
  const { showToast } = useAppContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const task: NewTask = {
      task: form.task.value,
      date: new Date(form.date.value).toUTCString(),
      createdById: "ADMIN",
      assignedToId: "ALL",
      expiration:
        form.expiration.value !== ""
          ? new Date(form.expiration.value).toUTCString()
          : null,
      priortiy: null,
    };

    const foo = await createNewTask(JSON.stringify(task));

    if (foo.acknowledged) {
      showToast({
        title: "Task Created",
        message: "Task has been created successfully",
        type: "success",
      });
    } else {
      showToast({
        title: "Task Not Created",
        message: "Task could not be created.",
        type: "warning",
      });
    }
    
    form.reset();
  };

  return (
    <div className="border border-white p-2 flex flex-col gap-2 items-center">
      <h2 className="font-bold">Create a Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2">
            <DashboardInput
              type="text"
              id="task"
              name="task"
              placeholder="Task"
              required
            />
            <DashboardInput
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              required
            />
            <DashboardInput
              type="text"
              id="createdBy"
              name="createdBy"
              placeholder="Created By"
            />
            <DashboardInput
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Assigned To"
            />
            <DashboardInput
              type="date"
              id="expiration"
              name="expiration"
              placeholder="Expiration"
            />
          </div>
          <CustomButton type="submit" text={"Submit"} />
        </div>
      </form>
    </div>
  );
}

type DashboardInputProps = React.ComponentPropsWithoutRef<"input">;

const DashboardInput = (props: DashboardInputProps) => {
  const { ...attr } = props;
  return (
    <input
      className="border border-blue-300 px-2 py-0.5 rounded-md text-zinc-900"
      {...attr}
    />
  );
};

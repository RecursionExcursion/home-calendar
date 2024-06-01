"use client";

import Button from "../ui/Button";
import { createNewTask } from "../../api/service/taskService";

import { NewTask } from "../../types/task";
import React from "react";
import { dateAndTimeToDate, getDateAndTime } from "./util";
import { useAppContext } from "../../contexts/AppContext";

export default function NewTaskInterface() {
  const { showToast } = useAppContext();

  const [newTaskForm, setNewTaskForm] = React.useState<NewTaskForm>(
    getBaseTaskForm()
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newDate = dateAndTimeToDate({
      date: newTaskForm.date,
      time: newTaskForm.time,
    });

    console.log({ allDay: form.allDay.checked });

    const taskToSubmit: NewTask = {
      task: newTaskForm.task,
      date: newDate.toUTCString(),
      allDay: form.allDay.checked,
      createdById: newTaskForm.createdById,
      assignedToId: newTaskForm.assignedToId,
      expiration: newTaskForm.expiration
        ? new Date(newTaskForm.expiration).toUTCString()
        : null,
      priortiy: newTaskForm.priortiy,
    };

    const response = await createNewTask(JSON.stringify(taskToSubmit));

    if (response.acknowledged) {
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

    setNewTaskForm(getBaseTaskForm());
  };

  const priorities: number[] = [0, 1, 2, 3];

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetName = e.target.name;
    let targetValue: string | number = e.target.value;

    if (targetName === "priortiy") {
      targetValue = parseInt(targetValue);
      if (!priorities.includes(parseInt(e.target.value))) {
        return;
      }
    }

    if (targetName === "task") {
      if (String(targetValue).length > 10) {
        return;
      }
    }

    setNewTaskForm({
      ...newTaskForm,
      [targetName]: targetValue,
    });
  };

  /* TODO: For Testing */
  const addNumTasks = async (num: number) => {
    const insert20Prom = Array.from({ length: num }).map(async (_, i) => {
      const dateString = dateAndTimeToDate({
        date: newTaskForm.date,
        time: newTaskForm.time,
      }).toUTCString();

      const taskToSubmit: NewTask = {
        task: `Task ${i}`,
        date: dateString,
        allDay: false,
        createdById: "ADMIN",
        assignedToId: "ALL",
        expiration: null,
        priortiy: 0,
      };

      return createNewTask(JSON.stringify(taskToSubmit));
    });

    Promise.all(insert20Prom).then((res) => {
      const success = res.filter((r) => r.acknowledged).length;
      const failed = res.length - success;

      showToast({
        title: "Tasks Created",
        message: `${success} tasks created, ${failed} failed.`,
        type: failed > 0 ? "warning" : "success",
      });
    });
  };

  return (
    <div className="p-2 flex flex-col gap-2 items-center">
      <h2 className="font-bold">Create a Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2">
            <DashboardInput
              type="text"
              id="task"
              name="task"
              placeholder="Task"
              value={newTaskForm.task}
              onChange={handleFormChange}
              required
            />
            <DashboardInput
              type="date"
              id="date"
              name="date"
              value={newTaskForm.date}
              onChange={handleFormChange}
              required
            />
            <div className="flex justify-evenly items-center">
              <DashboardInput
                type="time"
                id="time"
                name="time"
                value={newTaskForm.time}
                onChange={handleFormChange}
                required
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="allDay">All Day</label>
                <DashboardInput type="checkbox" id="allDay" name="allDay" />
              </div>
            </div>
            <DashboardInput
              type="text"
              id="createdBy"
              name="createdBy"
              placeholder="Created By"
              value={newTaskForm.createdById}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            <DashboardInput
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Assigned To"
              value={newTaskForm.assignedToId ?? undefined}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            <DashboardInput
              type="date"
              id="expiration"
              name="expiration"
              placeholder="Expiration"
              value={newTaskForm.expiration ?? undefined}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            {/* TODO: Will need to be a select that pulls down the priority */}
            <DashboardInput
              type="number"
              id="priortiy"
              name="priortiy"
              value={newTaskForm.priortiy}
              onChange={handleFormChange}
            />
          </div>
          <Button type="submit" text={"Submit"} />
        </div>
      </form>
      {/* TODO: For testing */}
      <Button text="Add 20" onClick={() => addNumTasks(20)} />
    </div>
  );
}

type NewTaskForm = NewTask & {
  time: string;
};

const getBaseTaskForm = () => {
  const now = getDateAndTime(new Date());

  const baseTaskForm: NewTaskForm = {
    task: "",
    date: now.date,
    time: now.time,
    allDay: false,
    createdById: "ADMIN",
    assignedToId: "ALL",
    expiration: null,
    priortiy: 0,
  };

  return { ...baseTaskForm };
};

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

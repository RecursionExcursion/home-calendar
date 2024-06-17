"use client";

import React, { useState } from "react";
import { createNewTask } from "../../../api/task/taskService";
import { NewTask } from "../../../types/task";
import { dateAndTimeToDate, getDateAndTime } from "../../../util";
import { useDashboardContext } from "../../../contexts";
import DatePicker from "../../base/datePicker/DatePicker";

export default function NewTaskInterface() {
  const { showToast } = useDashboardContext();

  const [newTaskForm, setNewTaskForm] = useState<NewTaskForm>(getBaseTaskForm());
  const [newTaskDate, setNewTaskDate] = useState(new Date(newTaskForm.date));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newDate = dateAndTimeToDate({
      date: newTaskDate.toISOString().split("T")[0],
      time: newTaskForm.time,
    });

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

  return (
    <div className="greedy-container col-container gap-0_5">
      <h2 className="db-h2">Create a Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="greedy-container">
          <div
            className="greedy-container col-container gap-0_5"
            style={{ alignItems: "normal" }}
          >
            <input
              className="db-input"
              type="text"
              id="task"
              name="task"
              placeholder="Task"
              value={newTaskForm.task}
              onChange={handleFormChange}
              required
            />
            <div className="row-container gap-0_5">
              {/* TODO: Need to handle invalid state preventing submission */}
              <DatePicker date={newTaskDate} setDate={setNewTaskDate} />
            </div>
            <div className="row-container" style={{ justifyContent: "space-evenly" }}>
              <input
                className="db-input"
                type="time"
                id="time"
                name="time"
                value={newTaskForm.time}
                onChange={handleFormChange}
                required
              />
              <div className="row-container gap-0_5">
                <label htmlFor="allDay">All Day</label>
                <input
                  className="db-checkbox"
                  type="checkbox"
                  id="allDay"
                  name="allDay"
                />
              </div>
            </div>

            {/* Hidden ad disabled for now */}
            <input
              className="db-input"
              type="text"
              id="createdBy"
              name="createdBy"
              placeholder="Created By"
              value={newTaskForm.createdById}
              onChange={handleFormChange}
              disabled
              hidden
            />

            <input
              className="db-input"
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Assigned To"
              value={newTaskForm.assignedToId ?? undefined}
              onChange={handleFormChange}
              disabled
              hidden
            />

            <input
              className="db-input"
              type="date"
              id="expiration"
              name="expiration"
              placeholder="Expiration"
              value={newTaskForm.expiration ?? undefined}
              onChange={handleFormChange}
              disabled
              hidden
            />

            <div className="row-container gap-0_5">
              {/* TODO: Will need to be a select that pulls down the priority */}
              <label
                className="text-lg"
                htmlFor="priortiy"
                style={{ fontWeight: "600" }}
                hidden
              >
                Priority
              </label>
              <input
                className="db-input"
                type="number"
                id="priortiy"
                name="priortiy"
                value={newTaskForm.priortiy}
                onChange={handleFormChange}
                disabled
                hidden
              />
            </div>
            {/* end hidden and disabled*/}
          </div>
          <button className="db-button" type="submit">
            Submit
          </button>
        </div>
      </form>
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

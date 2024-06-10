"use client";

import React from "react";
import { createNewTask } from "../../api/service/taskService";

import { NewTask } from "../../types/task";
import { dateAndTimeToDate, getDateAndTime } from "./util";
import { useAppContext } from "../../contexts/AppContext";
import { Button, H2, Input } from "../base";

export default function NewTaskInterface() {
  const { showToast } = useAppContext();

  const [newTaskForm, setNewTaskForm] = React.useState<NewTaskForm>(getBaseTaskForm());

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    const newDate = dateAndTimeToDate({
      date: newTaskForm.date,
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <H2 theme="task">Create a Task</H2>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Input
              theme="dashboard"
              type="text"
              id="task"
              name="task"
              placeholder="Task"
              value={newTaskForm.task}
              onChange={handleFormChange}
              required
            />
            <Input
              theme="dashboard"
              type="date"
              id="date"
              name="date"
              value={newTaskForm.date}
              onChange={handleFormChange}
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Input
                theme="dashboard"
                type="time"
                id="time"
                name="time"
                value={newTaskForm.time}
                onChange={handleFormChange}
                required
              />
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <label htmlFor="allDay">All Day</label>
                <Input theme="checkbox" type="checkbox" id="allDay" name="allDay" />
              </div>
            </div>
            <Input
              theme="dashboard"
              type="text"
              id="createdBy"
              name="createdBy"
              placeholder="Created By"
              value={newTaskForm.createdById}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            <Input
              theme="dashboard"
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Assigned To"
              value={newTaskForm.assignedToId ?? undefined}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            <Input
              theme="dashboard"
              type="date"
              id="expiration"
              name="expiration"
              placeholder="Expiration"
              value={newTaskForm.expiration ?? undefined}
              onChange={handleFormChange}
              //TODO Disabled for now
              disabled
            />
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* TODO: Will need to be a select that pulls down the priority */}
              <label htmlFor="priortiy" style={{ fontWeight: "600" }}>
                Priority
              </label>
              <Input
                theme="dashboard"
                type="number"
                id="priortiy"
                name="priortiy"
                value={newTaskForm.priortiy}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <Button type="submit" child={"Submit"} />
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

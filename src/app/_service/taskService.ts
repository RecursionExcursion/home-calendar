import { taskRepo } from "../_repository/taskRepo";
import { NewTask, Task, createNewTask } from "../_types/task";
import { User } from "../_types/user";

export const taskService = {
  createNewTask: async (task: string, dueDate: Date, creator: User) => {
    const newTask: Task = createNewTask({
      task: task,
      createdBy: creator,
      assignedTo: null,
      expiration: dueDate,
    });
    const result = await taskRepo.save(newTask);
    return result;
  },

  getTaskById: async (id: string) => {
    const task = await taskRepo.getById(id);
    return task;
  },

  updateTask: async (task: Task) => {
    const result = await taskRepo.update(task);
    return result;
  },

  deleteTask: async (id: string) => {
    const result = await taskRepo.delete(id);
    return result;
  },
};

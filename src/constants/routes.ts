import { log } from "console";

const displayBase = "/display";
const calendarBase = "/calendar";

const calendarRoutes = {
  day: `${displayBase}${calendarBase}/day`,
  week: `${displayBase}${calendarBase}/week`,
  month: `${displayBase}${calendarBase}/month`,
};

const dashboardBase = "/dashboard";

const dashboardRoutes = {
  tasks: `${dashboardBase}/tasks`,
  budget: `${dashboardBase}/budget`,
  logout: `${dashboardBase}/logout`,
};

const miscRoutes = {
  login: "/login",
  register: "/register",
};

export { calendarRoutes, dashboardRoutes, miscRoutes };

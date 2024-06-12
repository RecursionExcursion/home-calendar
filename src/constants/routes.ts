const displayBase = "/display";
const calendarBase = "/calendar";

const calendarRoutes = {
  day: `${displayBase}${calendarBase}/day`,
  week: `${displayBase}${calendarBase}/week`,
  month: `${displayBase}${calendarBase}/month`,
};

const dashboardBase = "/dashboard";

const dashboardRoutes = {
  budget: `${dashboardBase}/budget`,
  display: `${dashboardBase}/display`,
  logout: `${dashboardBase}/logout`,
  settings: `${dashboardBase}/settings`,
  tasks: `${dashboardBase}/tasks`,
};

const miscRoutes = {
  login: "/login",
  register: "/register",
};

export { calendarRoutes, dashboardRoutes, miscRoutes };

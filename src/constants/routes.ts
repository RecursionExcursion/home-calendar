const displayBase = "/display";
const calendarBase = "/calendar";

const calendarRoutes = {
  day: `${displayBase}${calendarBase}/day`,
  week: `${displayBase}${calendarBase}/week`,
  month: `${displayBase}${calendarBase}/month`,
};

const dashboardBase = "/dashboard";

const dashboardRoutes = {
  base: dashboardBase,
  budget: `${dashboardBase}/budget`,
  fitness: `${dashboardBase}/fitness`,
  database: `${dashboardBase}/database`,
  display: `${dashboardBase}/display`,
  home: `${dashboardBase}/`,
  logout: `${dashboardBase}/logout`,
  settings: `${dashboardBase}/settings`,
  surf: `${dashboardBase}/surf`,
  tasks: `${dashboardBase}/tasks`,
};

const miscRoutes = {
  login: "/login",
  register: "/register",
};

export { calendarRoutes, dashboardRoutes, miscRoutes };

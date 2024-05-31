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
};

export { calendarRoutes, dashboardRoutes };

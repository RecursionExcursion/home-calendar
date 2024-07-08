import {
  FaHouse,
  FaListCheck,
  FaDollarSign,
  FaGear,
  FaRightFromBracket,
  FaCalendarDays,
  FaDatabase,
  FaWater,
  FaBars,
  FaPersonRunning,
} from "react-icons/fa6";
import {
  FiDatabase,
  FiDollarSign,
  FiHome,
  FiList,
  FiLogOut,
  FiMenu,
  FiMonitor,
  FiSettings,
  FiSun,
  FiDribbble,
} from "react-icons/fi";
import {
  IoCalendar,
  IoHome,
  IoCashOutline,
  IoListOutline,
  IoSettingsOutline,
  IoLogInOutline,
  IoServerOutline,
  IoSunnyOutline,
  IoMenuOutline,
  IoPizzaOutline,
} from "react-icons/io5";

export type DashboardIconPackage = "fa" | "io" | "fi";
export type DashboardIconTypes = keyof typeof dashboardIconMappings;

export const dashboardIconMappings = {
  home: {
    fa: FaHouse,
    io: IoHome,
    fi: FiHome,
  },
  tasks: {
    fa: FaListCheck,
    io: IoListOutline,
    fi: FiList,
  },
  budget: {
    fa: FaDollarSign,
    io: IoCashOutline,
    fi: FiDollarSign,
  },
  display: {
    fa: FaCalendarDays,
    io: IoCalendar,
    fi: FiMonitor,
  },
  settings: {
    fa: FaGear,
    io: IoSettingsOutline,
    fi: FiSettings,
  },
  database: {
    fa: FaDatabase,
    io: IoServerOutline,
    fi: FiDatabase,
  },
  logout: {
    fa: FaRightFromBracket,
    io: IoLogInOutline,
    fi: FiLogOut,
  },
  surf: {
    fa: FaWater,
    io: IoSunnyOutline,
    fi: FiSun,
  },
  fitness: {
    fa: FaPersonRunning,
    io: IoPizzaOutline,
    fi: FiDribbble,
  },
  menu: {
    fa: FaBars,
    io: IoMenuOutline,
    fi: FiMenu,
  },
};

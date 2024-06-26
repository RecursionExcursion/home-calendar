import {
  FaHouse,
  FaListCheck,
  FaDollarSign,
  FaGear,
  FaRightFromBracket,
  FaCalendarDays,
  FaDatabase,
  FaWater,
} from "react-icons/fa6";
import {
  IoCalendar,
  IoHome,
  IoCashOutline,
  IoListOutline,
  IoSettingsOutline,
  IoLogInOutline,
  IoServerOutline,
  IoSunnyOutline,
} from "react-icons/io5";

export const dashboardIconMappings = {
  home: {
    fa: FaHouse,
    io: IoHome,
  },
  tasks: {
    fa: FaListCheck,
    io: IoListOutline,
  },
  budget: {
    fa: FaDollarSign,
    io: IoCashOutline,
  },
  display: {
    fa: FaCalendarDays,
    io: IoCalendar,
  },
  settings: {
    fa: FaGear,
    io: IoSettingsOutline,
  },
  database: {
    fa: FaDatabase,
    io: IoServerOutline,
  },
  logout: {
    fa: FaRightFromBracket,
    io: IoLogInOutline,
  },
  surf: {
    fa: FaWater,
    io: IoSunnyOutline,
  },
};

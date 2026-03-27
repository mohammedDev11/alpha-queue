// import type { IconType } from "react-icons";
// import {
//   RiDashboardFill,
//   RiGroupLine,
//   RiFileList2Line,
//   RiNotification3Line,
//   RiSettings3Line,
//   RiInformationLine,
//   RiHistoryLine,
//   RiWallet3Line,
//   RiUploadCloud2Line,
// } from "react-icons/ri";
// import {
//   HiOutlineUsers,
//   HiOutlineUserCircle,
//   HiOutlinePrinter,
//   HiOutlineDevicePhoneMobile,
// } from "react-icons/hi2";
// import { TbChecklist, TbReportSearch } from "react-icons/tb";
// import { MdOutlinePayments } from "react-icons/md";
// import { BiAddToQueue } from "react-icons/bi";

// export type SidebarItem = {
//   label: string;
//   icon: IconType;
//   href: string;
// };

// export type SidebarSectionVideo = {
//   title: string;
//   description?: string;
//   videoSrc: string;
//   poster?: string;
// };

// export type SidebarSection = {
//   title: string;
//   items: SidebarItem[];
//   video?: SidebarSectionVideo;
// };

// export type NavbarRole = "admin" | "user";

// export const adminSidebarSections: SidebarSection[] = [
//   {
//     title: "MENU",
//     items: [
//       {
//         label: "Dashboard",
//         icon: RiDashboardFill,
//         href: "/sections/admin/dashboard",
//       },
//       { label: "Users", icon: HiOutlineUsers, href: "/sections/admin/users" },
//       { label: "Groups", icon: RiGroupLine, href: "/sections/admin/groups" },
//       {
//         label: "Accounts",
//         icon: HiOutlineUserCircle,
//         href: "/sections/admin/accounts",
//       },
//       {
//         label: "Printers",
//         icon: HiOutlinePrinter,
//         href: "/sections/admin/printers",
//       },
//       {
//         label: "Queue Manger",
//         icon: BiAddToQueue,
//         href: "/sections/admin/queue-manger",
//       },
//       {
//         label: "Print Release",
//         icon: TbChecklist,
//         href: "/sections/admin/print-release",
//       },
//       {
//         label: "Reports",
//         icon: TbReportSearch,
//         href: "/sections/admin/reports",
//       },
//       { label: "Logs", icon: RiFileList2Line, href: "/sections/admin/logs" },
//     ],
//     video: {
//       title: "How to use Admin Menu",
//       description: "Quick tutorial for the main admin pages and actions.",
//       videoSrc: "video",
//     },
//   },
//   {
//     title: "ACCOUNT",
//     items: [
//       {
//         label: "Notifications",
//         icon: RiNotification3Line,
//         href: "/sections/admin/notifications",
//       },
//       {
//         label: "Settings",
//         icon: RiSettings3Line,
//         href: "/sections/admin/settings",
//       },
//       {
//         label: "About",
//         icon: RiInformationLine,
//         href: "/sections/about",
//       },
//     ],
//     video: {
//       title: "How to use Admin Account",
//       description:
//         "Quick tutorial for notifications, settings, and system info.",
//       videoSrc: "video",
//     },
//   },
// ];

// export const userSidebarSections: SidebarSection[] = [
//   {
//     title: "MENU",
//     items: [
//       {
//         label: "Dashboard",
//         icon: RiDashboardFill,
//         href: "/sections/user/dashboard",
//       },
//       {
//         label: "Print",
//         icon: RiUploadCloud2Line,
//         href: "/sections/user/print",
//       },
//       {
//         label: "Recent Print Jobs",
//         icon: RiFileList2Line,
//         href: "/sections/user/recent-print-jobs",
//       },
//       {
//         label: "Pending Jobs",
//         icon: TbChecklist,
//         href: "/sections/user/pending-jobs",
//       },
//       {
//         label: "History",
//         icon: RiHistoryLine,
//         href: "/sections/user/history",
//       },
//       {
//         label: "Wallet",
//         icon: RiWallet3Line,
//         href: "/sections/user/wallet",
//       },
//       {
//         label: "Redeem",
//         icon: MdOutlinePayments,
//         href: "/sections/user/redeem",
//       },
//       {
//         label: "Profile",
//         icon: HiOutlineUserCircle,
//         href: "/sections/user/profile",
//       },
//     ],
//     video: {
//       title: "How to use User Menu",
//       description:
//         "Quick tutorial for printing, tracking jobs, and wallet usage.",
//       videoSrc: "video",
//     },
//   },
//   {
//     title: "SYSTEM",
//     items: [
//       {
//         label: "Notifications",
//         icon: RiNotification3Line,
//         href: "/sections/user/notifications",
//       },
//       {
//         label: "Settings",
//         icon: RiSettings3Line,
//         href: "/sections/user/settings",
//       },
//     ],
//     video: {
//       title: "How to use User System",
//       description: "Quick tutorial for user notifications and settings.",
//       videoSrc: "video",
//     },
//   },
// ];

// export const sidebarSectionsByRole: Record<NavbarRole, SidebarSection[]> = {
//   admin: adminSidebarSections,
//   user: userSidebarSections,
// };

// export const getDockItems = (sections: SidebarSection[]) =>
//   sections.flatMap((section) => section.items);

//============NEW===================
import type { IconType } from "react-icons";
import {
  RiDashboardFill,
  RiGroupLine,
  RiFileList2Line,
  RiNotification3Line,
  RiSettings3Line,
  RiInformationLine,
  RiHistoryLine,
  RiWallet3Line,
  RiUploadCloud2Line,
  RiLogoutBoxRLine, // ✅ logout icon
} from "react-icons/ri";
import {
  HiOutlineUsers,
  HiOutlineUserCircle,
  HiOutlinePrinter,
} from "react-icons/hi2";
import { TbChecklist, TbReportSearch } from "react-icons/tb";
import { MdOutlinePayments } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";

export type SidebarItem = {
  label: string;
  icon: IconType;
  href: string;
  video?: string; // ✅ NEW
};

export type SidebarSection = {
  title: string;
  items: SidebarItem[];
};

export type NavbarRole = "admin" | "user";

const TEST_VIDEO = "/videos/test.mov"; // ✅ ONE SOURCE

/* ================= ADMIN ================= */
export const adminSidebarSections: SidebarSection[] = [
  {
    title: "MENU",
    items: [
      {
        label: "Dashboard",
        icon: RiDashboardFill,
        href: "/sections/admin/dashboard",
        video: TEST_VIDEO,
      },
      {
        label: "Users",
        icon: HiOutlineUsers,
        href: "/sections/admin/users",
        video: TEST_VIDEO,
      },
      {
        label: "Groups",
        icon: RiGroupLine,
        href: "/sections/admin/groups",
        video: TEST_VIDEO,
      },
      {
        label: "Accounts",
        icon: HiOutlineUserCircle,
        href: "/sections/admin/accounts",
        video: TEST_VIDEO,
      },
      {
        label: "Printers",
        icon: HiOutlinePrinter,
        href: "/sections/admin/printers",
        video: TEST_VIDEO,
      },
      {
        label: "Queue Manger",
        icon: BiAddToQueue,
        href: "/sections/admin/queue-manger",
        video: TEST_VIDEO,
      },
      {
        label: "Print Release",
        icon: TbChecklist,
        href: "/sections/admin/print-release",
        video: TEST_VIDEO,
      },
      {
        label: "Reports",
        icon: TbReportSearch,
        href: "/sections/admin/reports",
        video: TEST_VIDEO,
      },
      {
        label: "Logs",
        icon: RiFileList2Line,
        href: "/sections/admin/logs",
        video: TEST_VIDEO,
      },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      {
        label: "Notifications",
        icon: RiNotification3Line,
        href: "/sections/admin/notifications",
        video: TEST_VIDEO,
      },
      {
        label: "Settings",
        icon: RiSettings3Line,
        href: "/sections/admin/settings",
        video: TEST_VIDEO,
      },
      {
        label: "About",
        icon: RiInformationLine,
        href: "/sections/about",
        video: TEST_VIDEO,
      },

      // ✅ NEW MAIN PAGE LINK
      {
        label: "Main Page",
        icon: RiLogoutBoxRLine,
        href: "/",
        video: TEST_VIDEO,
      },
    ],
  },
];

/* ================= USER ================= */
export const userSidebarSections: SidebarSection[] = [
  {
    title: "MENU",
    items: [
      {
        label: "Dashboard",
        icon: RiDashboardFill,
        href: "/sections/user/dashboard",
        video: TEST_VIDEO,
      },
      {
        label: "Print",
        icon: RiUploadCloud2Line,
        href: "/sections/user/print",
        video: TEST_VIDEO,
      },
      {
        label: "Recent Print Jobs",
        icon: RiFileList2Line,
        href: "/sections/user/recent-print-jobs",
        video: TEST_VIDEO,
      },
      {
        label: "Pending Jobs",
        icon: TbChecklist,
        href: "/sections/user/pending-jobs",
        video: TEST_VIDEO,
      },
      {
        label: "History",
        icon: RiHistoryLine,
        href: "/sections/user/history",
        video: TEST_VIDEO,
      },
      {
        label: "Wallet",
        icon: RiWallet3Line,
        href: "/sections/user/wallet",
        video: TEST_VIDEO,
      },
      {
        label: "Redeem",
        icon: MdOutlinePayments,
        href: "/sections/user/redeem",
        video: TEST_VIDEO,
      },
      {
        label: "Profile",
        icon: HiOutlineUserCircle,
        href: "/sections/user/profile",
        video: TEST_VIDEO,
      },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      {
        label: "Notifications",
        icon: RiNotification3Line,
        href: "/sections/user/notifications",
        video: TEST_VIDEO,
      },
      {
        label: "Settings",
        icon: RiSettings3Line,
        href: "/sections/user/settings",
        video: TEST_VIDEO,
      },

      // ✅ NEW MAIN PAGE LINK
      {
        label: "Main Page",
        icon: RiLogoutBoxRLine,
        href: "/",
        video: TEST_VIDEO,
      },
    ],
  },
];

/* ================= HELPER ================= */
export const sidebarSectionsByRole: Record<NavbarRole, SidebarSection[]> = {
  admin: adminSidebarSections,
  user: userSidebarSections,
};

export const getDockItems = (sections: SidebarSection[]) =>
  sections.flatMap((section) => section.items);

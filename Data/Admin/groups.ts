export type GroupRestrictedStatus = "Locked" | "Unlocked";
export type GroupPeriod = "None" | "Monthly";

export type GroupItem = {
  id: string;
  name: string;
  members: number;
  initialCredit: number;
  restricted: GroupRestrictedStatus;
  scheduleAmount: number;
  period: GroupPeriod;
  selectedByDefault?: boolean;
};

export const printingGroupsData: GroupItem[] = [
  {
    id: "all-users",
    name: "All Users",
    members: 3000,
    initialCredit: 0,
    restricted: "Locked",
    scheduleAmount: 0,
    period: "None",
    selectedByDefault: true,
  },
  {
    id: "ccm-it",
    name: "CCM-IT",
    members: 45,
    initialCredit: 0,
    restricted: "Unlocked",
    scheduleAmount: 0,
    period: "None",
    selectedByDefault: true,
  },
  {
    id: "ccm-staff",
    name: "CCM-Staff",
    members: 60,
    initialCredit: 0,
    restricted: "Locked",
    scheduleAmount: 0,
    period: "None",
  },
  {
    id: "coe-faculty",
    name: "COE-Faculty",
    members: 35,
    initialCredit: 100,
    restricted: "Locked",
    scheduleAmount: 100,
    period: "Monthly",
  },
  {
    id: "coe-graduate",
    name: "COE-Graduate",
    members: 120,
    initialCredit: 100,
    restricted: "Unlocked",
    scheduleAmount: 0,
    period: "None",
    selectedByDefault: true,
  },
  {
    id: "coe-ug",
    name: "COE-UG",
    members: 600,
    initialCredit: 50,
    restricted: "Unlocked",
    scheduleAmount: 50,
    period: "Monthly",
    selectedByDefault: true,
  },
  {
    id: "ics-faculty",
    name: "ICS-Faculty",
    members: 30,
    initialCredit: 100,
    restricted: "Locked",
    scheduleAmount: 0,
    period: "None",
  },
];

export type GroupSortKey =
  | "name"
  | "members"
  | "initialCredit"
  | "restricted"
  | "scheduleAmount"
  | "period";

export const groupColumns: {
  key: GroupSortKey;
  label: string;
  sortable: boolean;
}[] = [
  { key: "name", label: "Group Name", sortable: true },
  { key: "members", label: "Members", sortable: true },
  { key: "initialCredit", label: "Initial Credit", sortable: true },
  { key: "restricted", label: "Restricted", sortable: true },
  { key: "scheduleAmount", label: "Schedule Amount", sortable: true },
  { key: "period", label: "Period", sortable: true },
];

export const groupRestrictedSortOrder: Record<GroupRestrictedStatus, number> = {
  Unlocked: 1,
  Locked: 2,
};

export const groupPeriodSortOrder: Record<GroupPeriod, number> = {
  None: 1,
  Monthly: 2,
};

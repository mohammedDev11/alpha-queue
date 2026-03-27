// export type UserAccount = {
//   id: string;
//   username: string;
//   full_name: string;
//   balance: number;
//   restricted: boolean;
//   pages: number;
//   jobs: number;
// };

// export const userAccounts: UserAccount[] = [
//   {
//     id: '1',
//     username: '202322750',
//     full_name: 'Ali Alorud',
//     balance: 50,
//     restricted: true,
//     pages: 10,
//     jobs: 4,
//   },
//   {
//     id: '2',
//     username: '202300245',
//     full_name: 'Khalid Alqahtani',
//     balance: 120,
//     restricted: false,
//     pages: 84,
//     jobs: 5,
//   },
//   {
//     id: '3',
//     username: 'a.alshammari',
//     full_name: 'Abdullah Alshammari',
//     balance: 300,
//     restricted: false,
//     pages: 140,
//     jobs: 9,
//   },
//   {
//     id: '4',
//     username: '202301876',
//     full_name: 'Fahad Aldossari',
//     balance: 0,
//     restricted: true,
//     pages: 0,
//     jobs: 0,
//   },
//   {
//     id: '5',
//     username: 'a.almalki',
//     full_name: 'Mohammed Almalki',
//     balance: 75,
//     restricted: false,
//     pages: 45,
//     jobs: 3,
//   },
//   {
//     id: '6',
//     username: '202300981',
//     full_name: 'Saad Almutairi',
//     balance: 20,
//     restricted: false,
//     pages: 30,
//     jobs: 2,
//   },
//   {
//     id: '7',
//     username: 'a.alqahtani',
//     full_name: 'Nasser Alqahtani',
//     balance: 0,
//     restricted: true,
//     pages: 0,
//     jobs: 0,
//   },
// ];

//===========New===================
export type UserRestrictedStatus = "Locked" | "Unlocked";

export type UserAccountItem = {
  id: string;
  username: string;
  fullName: string;
  balance: number;
  restricted: UserRestrictedStatus;
  pages: number;
  jobs: number;
};

export type UserSortKey =
  | "username"
  | "fullName"
  | "balance"
  | "restricted"
  | "pages"
  | "jobs";

export const userAccountsData: UserAccountItem[] = [
  {
    id: "user-1",
    username: "202322750",
    fullName: "Ali Alorud",
    balance: 50,
    restricted: "Locked",
    pages: 10,
    jobs: 4,
  },
  {
    id: "user-2",
    username: "202300245",
    fullName: "Khalid Alqahtani",
    balance: 120,
    restricted: "Unlocked",
    pages: 84,
    jobs: 5,
  },
  {
    id: "user-3",
    username: "a.alshammari",
    fullName: "Abdullah Alshammari",
    balance: 300,
    restricted: "Unlocked",
    pages: 140,
    jobs: 9,
  },
  {
    id: "user-4",
    username: "202301876",
    fullName: "Fahad Aldossari",
    balance: 0,
    restricted: "Locked",
    pages: 0,
    jobs: 0,
  },
  {
    id: "user-5",
    username: "a.almalki",
    fullName: "Mohammed Almalki",
    balance: 75,
    restricted: "Unlocked",
    pages: 45,
    jobs: 3,
  },
  {
    id: "user-6",
    username: "202300981",
    fullName: "Saad Almutairi",
    balance: 20,
    restricted: "Unlocked",
    pages: 30,
    jobs: 2,
  },
];

export const userTableColumns: {
  key: UserSortKey;
  label: string;
  sortable: boolean;
}[] = [
  { key: "username", label: "Username", sortable: true },
  { key: "fullName", label: "Full Name", sortable: true },
  { key: "balance", label: "Balance", sortable: true },
  { key: "restricted", label: "Restricted", sortable: true },
  { key: "pages", label: "Pages", sortable: true },
  { key: "jobs", label: "Jobs", sortable: true },
];

export const userRestrictedSortOrder: Record<UserRestrictedStatus, number> = {
  Unlocked: 1,
  Locked: 2,
};

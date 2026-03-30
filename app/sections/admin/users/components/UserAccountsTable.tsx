// "use client";

// import React, { useMemo, useState } from "react";
// import { Lock, LockOpen, SlidersHorizontal } from "lucide-react";
// import Modal from "@/app/components/ui/modal/Modal";
// import {
//   Dropdown,
//   DropdownContent,
//   DropdownItem,
//   DropdownTrigger,
// } from "@/app/components/ui/dropdown/Dropdown";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableCheckbox,
//   TableControls,
//   TableEmptyState,
//   TableGrid,
//   TableHeader,
//   TableHeaderCell,
//   TableMain,
//   TableSearch,
//   TableTitleBlock,
//   TableTop,
// } from "@/app/components/shared/table/Table";
// import {
//   UserAccountItem,
//   UserRestrictedStatus,
//   UserSortKey,
//   userAccountsData,
//   userRestrictedSortOrder,
//   userTableColumns,
// } from "@/Data/Admin/users";
// import Button from "@/app/components/ui/button/Button";

// type SortDir = "asc" | "desc";
// type ActionValue = "delete-selected" | "export-users" | "assign-balance";

// const columnsClassName =
//   "[grid-template-columns:72px_minmax(220px,1.1fr)_minmax(320px,1.6fr)_minmax(160px,0.9fr)_minmax(170px,0.9fr)_minmax(120px,0.7fr)_minmax(100px,0.6fr)]";

// const formatMoney = (value: number) => value.toFixed(2);

// function RestrictedBadge({ status }: { status: UserRestrictedStatus }) {
//   const isUnlocked = status === "Unlocked";

//   return (
//     <div
//       className="inline-flex h-14 w-14 items-center justify-center rounded-full"
//       style={{
//         background: isUnlocked
//           ? "rgba(34, 197, 94, 0.16)"
//           : "rgba(239, 68, 68, 0.16)",
//       }}
//     >
//       {isUnlocked ? (
//         <LockOpen className="h-6 w-6 text-success-500" />
//       ) : (
//         <Lock className="h-6 w-6 text-danger-500" />
//       )}
//     </div>
//   );
// }

// /*function SecondaryButton({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button onClick={onClick} className="btn-secondary h-14 px-6 text-base">
//       {children}
//     </button>
//   );
// }*/

// const UserAccountsTable = () => {
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState<UserSortKey>("username");
//   const [sortDir, setSortDir] = useState<SortDir>("asc");

//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [openUserModal, setOpenUserModal] = useState<UserAccountItem | null>(
//     null
//   );
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [actionModal, setActionModal] = useState<ActionValue | null>(null);

//   const handleSort = (key: UserSortKey) => {
//     if (sortKey === key) {
//       setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
//       return;
//     }

//     setSortKey(key);
//     setSortDir("asc");
//   };

//   const toggleRowSelection = (id: string) => {
//     setSelectedIds((prev) =>
//       prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
//     );
//   };

//   const filteredUsers = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     return [...userAccountsData]
//       .filter((user) => {
//         if (!term) return true;

//         return (
//           user.username.toLowerCase().includes(term) ||
//           user.fullName.toLowerCase().includes(term) ||
//           user.restricted.toLowerCase().includes(term)
//         );
//       })
//       .sort((a, b) => {
//         const getSortValue = (item: UserAccountItem) => {
//           switch (sortKey) {
//             case "username":
//               return item.username.toLowerCase();
//             case "fullName":
//               return item.fullName.toLowerCase();
//             case "balance":
//               return item.balance;
//             case "restricted":
//               return userRestrictedSortOrder[item.restricted];
//             case "pages":
//               return item.pages;
//             case "jobs":
//               return item.jobs;
//             default:
//               return item.username.toLowerCase();
//           }
//         };

//         const aValue = getSortValue(a);
//         const bValue = getSortValue(b);

//         if (typeof aValue === "number" && typeof bValue === "number") {
//           return sortDir === "asc" ? aValue - bValue : bValue - aValue;
//         }

//         return sortDir === "asc"
//           ? String(aValue).localeCompare(String(bValue))
//           : String(bValue).localeCompare(String(aValue));
//       });
//   }, [search, sortKey, sortDir]);

//   const allVisibleIds = filteredUsers.map((user) => user.id);
//   const isAllSelected =
//     allVisibleIds.length > 0 &&
//     allVisibleIds.every((id) => selectedIds.includes(id));

//   const toggleSelectAll = () => {
//     if (isAllSelected) {
//       setSelectedIds((prev) =>
//         prev.filter((id) => !allVisibleIds.includes(id))
//       );
//       return;
//     }

//     setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
//   };

//   const actionTitleMap: Record<ActionValue, string> = {
//     "delete-selected": "Delete selected",
//     "export-users": "Export users",
//     "assign-balance": "Assign balance",
//   };

//   return (
//     <>
//       <Table>
//         <TableTop>
//           <TableTitleBlock title="User Accounts" />

//           <TableControls>
//             <TableSearch
//               id="search-users"
//               label="Search printers"
//               value={search}
//               onChange={setSearch}
//             />

//             {/*<SecondaryButton onClick={() => setIsFilterModalOpen(true)}>
//               <SlidersHorizontal className="mr-2 h-5 w-5" />
//               Filter
//             </SecondaryButton>*/}
//             {/*Special Button has diffrent styles */}
//             <Button
//               variant="outline"
//               iconLeft={<SlidersHorizontal className="h-4 w-4" />}
//               className="h-14 px-6 text-base"
//               onClick={() => setIsFilterModalOpen(true)}
//             >
//               Filter
//             </Button>

//             <Dropdown
//               onValueChange={(value) => setActionModal(value as ActionValue)}
//             >
//               <DropdownTrigger className="h-14 min-w-[160px] px-6 text-base">
//                 Actions
//               </DropdownTrigger>

//               <DropdownContent align="right" widthClassName="w-[260px]">
//                 <DropdownItem value="delete-selected" className="py-4 text-lg">
//                   Delete selected
//                 </DropdownItem>
//                 <DropdownItem value="export-users" className="py-4 text-lg">
//                   Export users
//                 </DropdownItem>
//                 <DropdownItem value="assign-balance" className="py-4 text-lg">
//                   Assign balance
//                 </DropdownItem>
//               </DropdownContent>
//             </Dropdown>
//           </TableControls>
//         </TableTop>

//         <TableMain>
//           <TableGrid minWidthClassName="min-w-[1200px]">
//             <TableHeader columnsClassName={columnsClassName}>
//               <TableCell className="justify-center">
//                 <TableCheckbox
//                   checked={isAllSelected}
//                   onToggle={toggleSelectAll}
//                 />
//               </TableCell>

//               {userTableColumns.map((column) => (
//                 <TableHeaderCell
//                   key={column.key}
//                   label={column.label}
//                   sortable={column.sortable}
//                   active={sortKey === column.key}
//                   direction={sortDir}
//                   onClick={() => handleSort(column.key)}
//                 />
//               ))}
//             </TableHeader>

//             <TableBody>
//               {filteredUsers.length === 0 ? (
//                 <TableEmptyState text="No users found" />
//               ) : (
//                 filteredUsers.map((user) => {
//                   const isSelected = selectedIds.includes(user.id);

//                   return (
//                     <div
//                       key={user.id}
//                       onClick={() => setOpenUserModal(user)}
//                       className={`grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-5 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
//                     >
//                       <TableCell className="justify-center">
//                         <TableCheckbox
//                           checked={isSelected}
//                           onToggle={() => toggleRowSelection(user.id)}
//                         />
//                       </TableCell>

//                       <TableCell className="text-[32px] font-semibold text-[var(--title)] sm:text-base">
//                         {user.username}
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {user.fullName}
//                       </TableCell>

//                       <TableCell className="text-[32px] font-semibold text-[var(--title)] sm:text-base">
//                         {formatMoney(user.balance)}
//                       </TableCell>

//                       <TableCell>
//                         <RestrictedBadge status={user.restricted} />
//                       </TableCell>

//                       <TableCell className="text-[32px] font-medium text-[var(--title)] sm:text-base">
//                         {user.pages}
//                       </TableCell>

//                       <TableCell className="text-[32px] font-medium text-[var(--title)] sm:text-base">
//                         {user.jobs}
//                       </TableCell>
//                     </div>
//                   );
//                 })
//               )}
//             </TableBody>
//           </TableGrid>
//         </TableMain>
//       </Table>

//       <Modal
//         open={Boolean(openUserModal)}
//         onClose={() => setOpenUserModal(null)}
//       >
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">{openUserModal?.username}</h3>
//           <p className="paragraph">...</p>
//         </div>
//       </Modal>

//       <Modal
//         open={isFilterModalOpen}
//         onClose={() => setIsFilterModalOpen(false)}
//       >
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">Filter Users</h3>
//           <p className="paragraph">...</p>
//         </div>
//       </Modal>

//       <Modal open={Boolean(actionModal)} onClose={() => setActionModal(null)}>
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">
//             {actionModal ? actionTitleMap[actionModal] : "Action"}
//           </h3>
//           <p className="paragraph">...</p>
//           <p className="paragraph">
//             Selected rows:{" "}
//             <span className="font-semibold">{selectedIds.length}</span>
//           </p>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default UserAccountsTable;

"use client";

import React, { useMemo, useState } from "react";
import { Lock, LockOpen, SlidersHorizontal } from "lucide-react";
import Modal from "@/app/components/ui/modal/Modal";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/ui/dropdown/Dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableCheckbox,
  TableControls,
  TableEmptyState,
  TableGrid,
  TableHeader,
  TableHeaderCell,
  TableMain,
  TableSearch,
  TableTitleBlock,
  TableTop,
} from "@/app/components/shared/table/Table";
import {
  UserAccountItem,
  UserRestrictedStatus,
  UserSortKey,
  userAccountsData,
  userRestrictedSortOrder,
  userTableColumns,
} from "@/Data/Admin/users";
import Button from "@/app/components/ui/button/Button";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";

type SortDir = "asc" | "desc";
type ActionValue = "delete-selected" | "export-users" | "assign-balance";

const columnsClassName =
  "[grid-template-columns:72px_minmax(220px,1.1fr)_minmax(320px,1.6fr)_minmax(160px,0.9fr)_minmax(170px,0.9fr)_minmax(120px,0.7fr)_minmax(100px,0.6fr)]";

const formatMoney = (value: number) => value.toFixed(2);

function RestrictedBadge({ status }: { status: UserRestrictedStatus }) {
  const isUnlocked = status === "Unlocked";

  return (
    <StatusBadge
      label=""
      tone={isUnlocked ? "success" : "danger"}
      icon={
        isUnlocked ? (
          <LockOpen className="h-5 w-5" />
        ) : (
          <Lock className="h-5 w-5" />
        )
      }
      className="justify-center [&>span:first-child]:border-0 [&>span:first-child]:rounded-none [&>span:first-child]:h-auto [&>span:first-child]:w-auto"
    />
  );
}

/*function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="btn-secondary h-14 px-6 text-base">
      {children}
    </button>
  );
}*/

const UserAccountsTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<UserSortKey>("username");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openUserModal, setOpenUserModal] = useState<UserAccountItem | null>(
    null
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<ActionValue | null>(null);

  const handleSort = (key: UserSortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDir("asc");
  };

  const toggleRowSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...userAccountsData]
      .filter((user) => {
        if (!term) return true;

        return (
          user.username.toLowerCase().includes(term) ||
          user.fullName.toLowerCase().includes(term) ||
          user.restricted.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const getSortValue = (item: UserAccountItem) => {
          switch (sortKey) {
            case "username":
              return item.username.toLowerCase();
            case "fullName":
              return item.fullName.toLowerCase();
            case "quota":
              return item.quota;
            case "restricted":
              return userRestrictedSortOrder[item.restricted];
            case "pages":
              return item.pages;
            case "jobs":
              return item.jobs;
            default:
              return item.username.toLowerCase();
          }
        };

        const aValue = getSortValue(a);
        const bValue = getSortValue(b);

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDir === "asc" ? aValue - bValue : bValue - aValue;
        }

        return sortDir === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [search, sortKey, sortDir]);

  const allVisibleIds = filteredUsers.map((user) => user.id);
  const isAllSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !allVisibleIds.includes(id))
      );
      return;
    }

    setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
  };

  const actionTitleMap: Record<ActionValue, string> = {
    "delete-selected": "Delete selected",
    "export-users": "Export users",
    "assign-balance": "Assign balance",
  };

  return (
    <>
      <Table>
        <TableTop>
          <TableTitleBlock title="User Accounts" />

          <TableControls>
            <TableSearch
              id="search-users"
              label="Search printers"
              value={search}
              onChange={setSearch}
            />

            {/*<SecondaryButton onClick={() => setIsFilterModalOpen(true)}>
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filter
            </SecondaryButton>*/}
            {/*Special Button has diffrent styles */}
            <Button
              variant="outline"
              iconLeft={<SlidersHorizontal className="h-4 w-4" />}
              className="h-14 px-6 text-base"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filter
            </Button>

            <Dropdown
              onValueChange={(value) => setActionModal(value as ActionValue)}
            >
              <DropdownTrigger className="h-14 min-w-[160px] px-6 text-base">
                Actions
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[260px]">
                <DropdownItem value="delete-selected" className="py-4 text-lg">
                  Delete selected
                </DropdownItem>
                <DropdownItem value="export-users" className="py-4 text-lg">
                  Export users
                </DropdownItem>
                <DropdownItem value="assign-balance" className="py-4 text-lg">
                  Assign balance
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </TableControls>
        </TableTop>

        <TableMain>
          <TableGrid minWidthClassName="min-w-[1200px]">
            <TableHeader columnsClassName={columnsClassName}>
              <TableCell className="justify-center">
                <TableCheckbox
                  checked={isAllSelected}
                  onToggle={toggleSelectAll}
                />
              </TableCell>

              {userTableColumns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  label={column.label}
                  sortable={column.sortable}
                  active={sortKey === column.key}
                  direction={sortDir}
                  onClick={() => handleSort(column.key)}
                />
              ))}
            </TableHeader>

            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableEmptyState text="No users found" />
              ) : (
                filteredUsers.map((user) => {
                  const isSelected = selectedIds.includes(user.id);

                  return (
                    <div
                      key={user.id}
                      onClick={() => setOpenUserModal(user)}
                      className={`grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-5 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
                    >
                      <TableCell className="justify-center">
                        <TableCheckbox
                          checked={isSelected}
                          onToggle={() => toggleRowSelection(user.id)}
                        />
                      </TableCell>

                      <TableCell className="text-[32px] font-semibold text-[var(--title)] sm:text-base">
                        {user.username}
                      </TableCell>

                      <TableCell className="paragraph">
                        {user.fullName}
                      </TableCell>

                      <TableCell className="text-[32px] font-semibold text-[var(--title)] sm:text-base">
                        {formatMoney(user.quota)}
                      </TableCell>

                      <TableCell>
                        <RestrictedBadge status={user.restricted} />
                      </TableCell>

                      <TableCell className="text-[32px] font-medium text-[var(--title)] sm:text-base">
                        {user.pages}
                      </TableCell>

                      <TableCell className="text-[32px] font-medium text-[var(--title)] sm:text-base">
                        {user.jobs}
                      </TableCell>
                    </div>
                  );
                })
              )}
            </TableBody>
          </TableGrid>
        </TableMain>
      </Table>

      <Modal
        open={Boolean(openUserModal)}
        onClose={() => setOpenUserModal(null)}
      >
        <div className="space-y-3 pr-8">
          <h3 className="title-md">{openUserModal?.username}</h3>
          <p className="paragraph">...</p>
        </div>
      </Modal>

      <Modal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <div className="space-y-3 pr-8">
          <h3 className="title-md">Filter Users</h3>
          <p className="paragraph">...</p>
        </div>
      </Modal>

      <Modal open={Boolean(actionModal)} onClose={() => setActionModal(null)}>
        <div className="space-y-3 pr-8">
          <h3 className="title-md">
            {actionModal ? actionTitleMap[actionModal] : "Action"}
          </h3>
          <p className="paragraph">...</p>
          <p className="paragraph">
            Selected rows:{" "}
            <span className="font-semibold">{selectedIds.length}</span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default UserAccountsTable;

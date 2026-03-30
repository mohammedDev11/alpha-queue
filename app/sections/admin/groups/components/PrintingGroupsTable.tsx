// "use client";

// import React, { useMemo, useState } from "react";
// import { Lock, LockOpen, Plus, SlidersHorizontal } from "lucide-react";
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
//   GroupItem,
//   GroupRestrictedStatus,
//   GroupSortKey,
//   groupColumns,
//   groupPeriodSortOrder,
//   groupRestrictedSortOrder,
//   printingGroupsData,
// } from "@/Data/Admin/groups";
// import Button from "@/app/components/ui/button/Button";
// import StatusBadge from "@/app/components/ui/badge/StatusBadge";

// type SortDir = "asc" | "desc";
// type ActionValue = "delete-selected" | "export-groups" | "assign-credits";

// const columnsClassName =
//   "[grid-template-columns:72px_minmax(220px,1.5fr)_minmax(130px,0.9fr)_minmax(170px,1fr)_minmax(170px,1fr)_minmax(200px,1.2fr)_minmax(120px,0.8fr)]";

// const formatMoney = (value: number) => value.toFixed(2);

// function RestrictedBadge({ status }: { status: GroupRestrictedStatus }) {
//   const isUnlocked = status === "Unlocked";

//   return (
//     <StatusBadge
//       label=""
//       tone={isUnlocked ? "success" : "danger"}
//       icon={
//         isUnlocked ? (
//           <LockOpen className="h-5 w-5" />
//         ) : (
//           <Lock className="h-5 w-5" />
//         )
//       }
//       className="justify-center [&>span:first-child]:border-0 [&>span:first-child]:rounded-none [&>span:first-child]:h-auto [&>span:first-child]:w-auto"
//     />
//   );
// }

// {
//   /*function PrimaryButton({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button onClick={onClick} className="btn-primary h-14 px-6 text-base">
//       {children}
//     </button>
//   );
// }*/
// }

// {
//   /*function SecondaryButton({
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
// }

// const PrintingGroupsTable = () => {
//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState<GroupSortKey>("name");
//   const [sortDir, setSortDir] = useState<SortDir>("asc");

//   const [selectedIds, setSelectedIds] = useState<string[]>(
//     printingGroupsData
//       .filter((item) => item.selectedByDefault)
//       .map((item) => item.id)
//   );

//   const [openGroupModal, setOpenGroupModal] = useState<GroupItem | null>(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [actionModal, setActionModal] = useState<ActionValue | null>(null);

//   const handleSort = (key: GroupSortKey) => {
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

//   const filteredGroups = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     return [...printingGroupsData]
//       .filter((group) => {
//         if (!term) return true;

//         return (
//           group.name.toLowerCase().includes(term) ||
//           group.period.toLowerCase().includes(term) ||
//           group.restricted.toLowerCase().includes(term)
//         );
//       })
//       .sort((a, b) => {
//         const getSortValue = (item: GroupItem) => {
//           switch (sortKey) {
//             case "name":
//               return item.name.toLowerCase();
//             case "members":
//               return item.members;
//             case "initialCredit":
//               return item.initialCredit;
//             case "restricted":
//               return groupRestrictedSortOrder[item.restricted];
//             case "scheduleAmount":
//               return item.scheduleAmount;
//             case "period":
//               return groupPeriodSortOrder[item.period];
//             default:
//               return item.name.toLowerCase();
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

//   const allVisibleIds = filteredGroups.map((group) => group.id);
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
//     "export-groups": "Export groups",
//     "assign-credits": "Assign credits",
//   };

//   return (
//     <>
//       <Table>
//         <TableTop>
//           <TableTitleBlock title="Printing Groups" />

//           <TableControls>
//             <TableSearch
//               id="search-groups"
//               label="Search groups"
//               value={search}
//               onChange={setSearch}
//             />

//             {/*<PrimaryButton onClick={() => setIsAddModalOpen(true)}>
//               <Plus className="mr-2 h-5 w-5" />
//               Add Group
//             </PrimaryButton>*/}

//             <Button
//               variant="primary"
//               iconLeft={<Plus className="h-5 w-5" />}
//               className="h-14 px-6 text-base"
//               onClick={() => setIsAddModalOpen(true)}
//             >
//               Add Group
//             </Button>

//             {/*<SecondaryButton onClick={() => setIsFilterModalOpen(true)}>
//               <SlidersHorizontal className="mr-2 h-5 w-5" />
//               Filter
//             </SecondaryButton>*/}

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
//               <DropdownTrigger className="h-14 min-w-[180px] px-6 text-base">
//                 Actions
//               </DropdownTrigger>

//               <DropdownContent align="right" widthClassName="w-[280px]">
//                 <DropdownItem value="delete-selected" className="py-4 text-lg">
//                   Delete selected
//                 </DropdownItem>
//                 <DropdownItem value="export-groups" className="py-4 text-lg">
//                   Export groups
//                 </DropdownItem>
//                 <DropdownItem value="assign-credits" className="py-4 text-lg">
//                   Assign credits
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

//               {groupColumns.map((column) => (
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
//               {filteredGroups.length === 0 ? (
//                 <TableEmptyState text="No groups found" />
//               ) : (
//                 filteredGroups.map((group) => {
//                   const isSelected = selectedIds.includes(group.id);

//                   return (
//                     <div
//                       key={group.id}
//                       onClick={() => setOpenGroupModal(group)}
//                       className={`grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-4 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
//                     >
//                       <TableCell className="justify-center">
//                         <TableCheckbox
//                           checked={isSelected}
//                           onToggle={() => toggleRowSelection(group.id)}
//                         />
//                       </TableCell>

//                       <TableCell className="paragraph font-medium text-[var(--paragraph)]">
//                         {group.name}
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {group.members}
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {formatMoney(group.initialCredit)}
//                       </TableCell>

//                       <TableCell>
//                         <RestrictedBadge status={group.restricted} />
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {formatMoney(group.scheduleAmount)}
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {group.period}
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
//         open={Boolean(openGroupModal)}
//         onClose={() => setOpenGroupModal(null)}
//       >
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">{openGroupModal?.name}</h3>
//           <p className="paragraph">...</p>
//         </div>
//       </Modal>

//       <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">Add Group</h3>
//           <p className="paragraph">...</p>
//         </div>
//       </Modal>

//       <Modal
//         open={isFilterModalOpen}
//         onClose={() => setIsFilterModalOpen(false)}
//       >
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">Filter Groups</h3>
//           <p className="paragraph">...</p>
//         </div>
//       </Modal>

//       <Modal open={Boolean(actionModal)} onClose={() => setActionModal(null)}>
//         <div className="space-y-3 pr-8">
//           <h3 className="title-md">
//             {actionModal ? actionTitleMap[actionModal] : "Action"}
//           </h3>
//           <p className="paragraph">...</p>
//           {actionModal === "delete-selected" ? (
//             <p className="paragraph">
//               Selected rows:{" "}
//               <span className="font-semibold">{selectedIds.length}</span>
//             </p>
//           ) : null}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default PrintingGroupsTable;

//========NEW==========
"use client";

import React, { useMemo, useState } from "react";
import { Lock, LockOpen, Plus, SlidersHorizontal } from "lucide-react";
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
  GroupItem,
  GroupRestrictedStatus,
  GroupSortKey,
  groupColumns,
  groupPeriodSortOrder,
  groupRestrictedSortOrder,
  printingGroupsData,
} from "@/Data/Admin/groups";
import Button from "@/app/components/ui/button/Button";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";
import AddGroupModal from "./AddGroupModal";
import FilterGroupsModal from "./FilterGroupsModal";
import GroupDetailsModal from "./GroupDetailsModal";
import GroupActionModal, { type GroupActionValue } from "./GroupActionModal";

type SortDir = "asc" | "desc";

const columnsClassName =
  "[grid-template-columns:72px_minmax(220px,1.5fr)_minmax(130px,0.9fr)_minmax(170px,1fr)_minmax(170px,1fr)_minmax(200px,1.2fr)_minmax(120px,0.8fr)]";

const formatMoney = (value: number) => value.toFixed(2);

function RestrictedBadge({ status }: { status: GroupRestrictedStatus }) {
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
      className="justify-center [&>span:first-child]:h-auto [&>span:first-child]:w-auto [&>span:first-child]:rounded-none [&>span:first-child]:border-0"
    />
  );
}

const PrintingGroupsTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<GroupSortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const [selectedIds, setSelectedIds] = useState<string[]>(
    printingGroupsData
      .filter((item) => item.selectedByDefault)
      .map((item) => item.id)
  );

  const [openGroupModal, setOpenGroupModal] = useState<GroupItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<GroupActionValue | null>(null);

  const handleSort = (key: GroupSortKey) => {
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

  const filteredGroups = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...printingGroupsData]
      .filter((group) => {
        if (!term) return true;

        return (
          group.name.toLowerCase().includes(term) ||
          group.period.toLowerCase().includes(term) ||
          group.restricted.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const getSortValue = (item: GroupItem) => {
          switch (sortKey) {
            case "name":
              return item.name.toLowerCase();
            case "members":
              return item.members;
            case "initialCredit":
              return item.initialCredit;
            case "restricted":
              return groupRestrictedSortOrder[item.restricted];
            case "scheduleAmount":
              return item.scheduleAmount;
            case "period":
              return groupPeriodSortOrder[item.period];
            default:
              return item.name.toLowerCase();
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

  const allVisibleIds = filteredGroups.map((group) => group.id);
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

  return (
    <>
      <Table>
        <TableTop>
          <TableTitleBlock title="Printing Groups" />

          <TableControls>
            <TableSearch
              id="search-groups"
              label="Search groups"
              value={search}
              onChange={setSearch}
            />

            <Button
              variant="primary"
              iconLeft={<Plus className="h-5 w-5" />}
              className="h-14 px-6 text-base"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Group
            </Button>

            <Button
              variant="outline"
              iconLeft={<SlidersHorizontal className="h-4 w-4" />}
              className="h-14 px-6 text-base"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filter
            </Button>

            <Dropdown
              onValueChange={(value) =>
                setActionModal(value as GroupActionValue)
              }
            >
              <DropdownTrigger className="h-14 min-w-[180px] px-6 text-base">
                Actions
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[280px]">
                <DropdownItem value="delete-selected" className="py-4 text-lg">
                  Delete selected
                </DropdownItem>
                <DropdownItem value="export-groups" className="py-4 text-lg">
                  Export groups
                </DropdownItem>
                <DropdownItem value="assign-credits" className="py-4 text-lg">
                  Assign credits
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

              {groupColumns.map((column) => (
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
              {filteredGroups.length === 0 ? (
                <TableEmptyState text="No groups found" />
              ) : (
                filteredGroups.map((group) => {
                  const isSelected = selectedIds.includes(group.id);

                  return (
                    <div
                      key={group.id}
                      onClick={() => setOpenGroupModal(group)}
                      className={`grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-4 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
                    >
                      <TableCell
                        className="justify-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <TableCheckbox
                          checked={isSelected}
                          onToggle={() => toggleRowSelection(group.id)}
                        />
                      </TableCell>

                      <TableCell className="paragraph font-medium text-[var(--paragraph)]">
                        {group.name}
                      </TableCell>

                      <TableCell className="paragraph">
                        {group.members}
                      </TableCell>

                      <TableCell className="paragraph">
                        {formatMoney(group.initialCredit)}
                      </TableCell>

                      <TableCell>
                        <RestrictedBadge status={group.restricted} />
                      </TableCell>

                      <TableCell className="paragraph">
                        {formatMoney(group.scheduleAmount)}
                      </TableCell>

                      <TableCell className="paragraph">
                        {group.period}
                      </TableCell>
                    </div>
                  );
                })
              )}
            </TableBody>
          </TableGrid>
        </TableMain>
      </Table>

      <GroupDetailsModal
        open={Boolean(openGroupModal)}
        onClose={() => setOpenGroupModal(null)}
        group={openGroupModal}
      />

      <AddGroupModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <FilterGroupsModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      />

      <GroupActionModal
        open={Boolean(actionModal)}
        onClose={() => setActionModal(null)}
        action={actionModal}
        selectedCount={selectedIds.length}
      />
    </>
  );
};

export default PrintingGroupsTable;

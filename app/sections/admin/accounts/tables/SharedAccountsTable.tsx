// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { Check, Minus, SlidersHorizontal, X } from "lucide-react";
// import Modal from "@/app/components/ui/modal/Modal";
// import FloatingInput from "@/app/components/ui/input/FloatingInput";
// import StatusBadge from "@/app/components/ui/badge/StatusBadge";
// import UsageProgress from "@/app/components/shared/features/UsageProgress";
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
// import { cn } from "@/app/components/lib/cn";
// import {
//   SharedAccountBulkStatusAction,
//   SharedAccountFilterValue,
//   SharedAccountItem,
//   SharedAccountSortKey,
//   SharedAccountStatus,
//   sharedAccountFilterOptions,
//   sharedAccountStatusMeta,
//   sharedAccountStatusSortOrder,
//   sharedAccountsData,
//   sharedAccountsTableColumns,
// } from "@/Data/Admin/accounts";
// import Button from "@/app/components/ui/button/Button";

// type SortDir = "asc" | "desc";

// const columnsClassName =
//   "[grid-template-columns:72px_minmax(260px,1.5fr)_minmax(220px,1.2fr)_minmax(160px,0.9fr)_minmax(140px,0.8fr)_minmax(230px,1fr)_minmax(180px,0.8fr)]";

// const formatMoney = (value: number) => value.toFixed(2);
// const formatNumber = (value: number) => value.toLocaleString();

// /*function SecondaryButton({
//   children,
//   onClick,
// }: {
//   children: React.ReactNode;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="btn-secondary h-14 rounded-md px-6 text-base"
//     >
//       {children}
//     </button>
//   );
// }*/

// function AccountStatusBadge({ status }: { status: SharedAccountStatus }) {
//   const config = sharedAccountStatusMeta[status];

//   const icon =
//     status === "Active" ? (
//       <Check className="h-4 w-4" strokeWidth={2.8} />
//     ) : status === "Suspended" ? (
//       <X className="h-4 w-4" strokeWidth={2.8} />
//     ) : (
//       <Minus className="h-4 w-4" strokeWidth={2.8} />
//     );

//   return <StatusBadge label={config.label} tone={config.tone} icon={icon} />;
// }

// const SharedAccountsTable = () => {
//   const [accounts, setAccounts] =
//     useState<SharedAccountItem[]>(sharedAccountsData);

//   const [search, setSearch] = useState("");
//   const [sortKey, setSortKey] = useState<SharedAccountSortKey>("name");
//   const [sortDir, setSortDir] = useState<SortDir>("asc");
//   const [filterValue, setFilterValue] =
//     useState<SharedAccountFilterValue>("all");

//   const [selectedIds, setSelectedIds] = useState<string[]>([]);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

//   const [openAccountModal, setOpenAccountModal] =
//     useState<SharedAccountItem | null>(null);

//   const [editBalance, setEditBalance] = useState("");
//   const [editQuota, setEditQuota] = useState("");
//   const [editStatus, setEditStatus] = useState<SharedAccountStatus>("Active");

//   const handleSort = (key: SharedAccountSortKey) => {
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

//   const filteredAccounts = useMemo(() => {
//     const term = search.trim().toLowerCase();

//     return [...accounts]
//       .filter((account) => {
//         const matchesSearch =
//           !term ||
//           account.name.toLowerCase().includes(term) ||
//           account.department.toLowerCase().includes(term) ||
//           account.status.toLowerCase().includes(term);

//         if (!matchesSearch) return false;

//         switch (filterValue) {
//           case "active":
//             return account.status === "Active";
//           case "suspended":
//             return account.status === "Suspended";
//           case "inactive":
//             return account.status === "Inactive";
//           case "high-usage":
//             return account.pagesUsedPercent >= 80;
//           case "low-balance":
//             return account.balance <= 500;
//           default:
//             return true;
//         }
//       })
//       .sort((a, b) => {
//         const getSortValue = (item: SharedAccountItem) => {
//           switch (sortKey) {
//             case "name":
//               return item.name.toLowerCase();
//             case "department":
//               return item.department.toLowerCase();
//             case "balance":
//               return item.balance;
//             case "quota":
//               return item.quota;
//             case "pagesUsedPercent":
//               return item.pagesUsedPercent;
//             case "status":
//               return sharedAccountStatusSortOrder[item.status];
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
//   }, [accounts, filterValue, search, sortDir, sortKey]);

//   const allVisibleIds = filteredAccounts.map((account) => account.id);
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

//   const handleBulkStatusChange = (
//     nextStatus: SharedAccountBulkStatusAction
//   ) => {
//     if (selectedIds.length === 0) return;

//     setAccounts((prev) =>
//       prev.map((account) =>
//         selectedIds.includes(account.id)
//           ? { ...account, status: nextStatus }
//           : account
//       )
//     );
//   };

//   useEffect(() => {
//     if (!openAccountModal) return;

//     setEditBalance(String(openAccountModal.balance));
//     setEditQuota(String(openAccountModal.quota));
//     setEditStatus(openAccountModal.status);
//   }, [openAccountModal]);

//   const handleSaveAccountChanges = () => {
//     if (!openAccountModal) return;

//     const nextBalance = Number(editBalance);
//     const nextQuota = Number(editQuota);

//     setAccounts((prev) =>
//       prev.map((account) =>
//         account.id === openAccountModal.id
//           ? {
//               ...account,
//               balance: Number.isNaN(nextBalance)
//                 ? account.balance
//                 : nextBalance,
//               quota: Number.isNaN(nextQuota) ? account.quota : nextQuota,
//               status: editStatus,
//             }
//           : account
//       )
//     );

//     setOpenAccountModal((prev) =>
//       prev
//         ? {
//             ...prev,
//             balance: Number.isNaN(nextBalance) ? prev.balance : nextBalance,
//             quota: Number.isNaN(nextQuota) ? prev.quota : nextQuota,
//             status: editStatus,
//           }
//         : prev
//     );
//   };

//   return (
//     <>
//       <Table>
//         <TableTop>
//           <TableTitleBlock
//             title="Shared Accounts"
//             description={`${filteredAccounts.length} cost centers`}
//           />

//           <TableControls>
//             <TableSearch
//               id="search-shared-accounts"
//               label="Search accounts..."
//               value={search}
//               onChange={setSearch}
//             />

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
//               onValueChange={(value) =>
//                 handleBulkStatusChange(value as SharedAccountBulkStatusAction)
//               }
//             >
//               <DropdownTrigger className="h-14 min-w-[170px] rounded-md px-6 text-base">
//                 Actions
//               </DropdownTrigger>

//               <DropdownContent align="right" widthClassName="w-[220px]">
//                 <DropdownItem value="Active" className="py-4 text-lg">
//                   Active
//                 </DropdownItem>
//                 <DropdownItem value="Inactive" className="py-4 text-lg">
//                   Inactive
//                 </DropdownItem>
//                 <DropdownItem value="Suspended" className="py-4 text-lg">
//                   Suspended
//                 </DropdownItem>
//               </DropdownContent>
//             </Dropdown>
//           </TableControls>
//         </TableTop>

//         <TableMain>
//           <TableGrid minWidthClassName="min-w-[1290px]">
//             <TableHeader columnsClassName={columnsClassName}>
//               <TableCell className="justify-center">
//                 <TableCheckbox
//                   checked={isAllSelected}
//                   onToggle={toggleSelectAll}
//                 />
//               </TableCell>

//               {sharedAccountsTableColumns.map((column) => (
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
//               {filteredAccounts.length === 0 ? (
//                 <TableEmptyState text="No shared accounts found" />
//               ) : (
//                 filteredAccounts.map((account) => {
//                   const isSelected = selectedIds.includes(account.id);

//                   return (
//                     <div
//                       key={account.id}
//                       onClick={() => setOpenAccountModal(account)}
//                       className={cn(
//                         "grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-5 transition last:border-b-0 hover:bg-brand-50/30",
//                         columnsClassName
//                       )}
//                     >
//                       <TableCell className="justify-center">
//                         <TableCheckbox
//                           checked={isSelected}
//                           onToggle={() => toggleRowSelection(account.id)}
//                         />
//                       </TableCell>

//                       <TableCell className="text-base font-semibold text-[var(--title)]">
//                         {account.name}
//                       </TableCell>

//                       <TableCell className="paragraph">
//                         {account.department}
//                       </TableCell>

//                       <TableCell className="text-base font-semibold text-[var(--title)]">
//                         {formatMoney(account.balance)}
//                       </TableCell>

//                       <TableCell className="text-base font-medium text-[var(--paragraph)]">
//                         {formatNumber(account.quota)}
//                       </TableCell>

//                       <TableCell>
//                         <UsageProgress value={account.pagesUsedPercent} />
//                       </TableCell>

//                       <TableCell>
//                         <AccountStatusBadge status={account.status} />
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
//         open={isFilterModalOpen}
//         onClose={() => setIsFilterModalOpen(false)}
//       >
//         <div className="space-y-4 pr-8">
//           <div>
//             <h3 className="title-md">Filter Shared Accounts</h3>
//             <p className="paragraph mt-1">
//               Narrow down the shared account list.
//             </p>
//           </div>

//           <Dropdown
//             value={filterValue}
//             onValueChange={(value) =>
//               setFilterValue(value as SharedAccountFilterValue)
//             }
//           >
//             <DropdownTrigger className="h-14 w-full rounded-md px-4 text-left text-base">
//               {
//                 sharedAccountFilterOptions.find(
//                   (option) => option.value === filterValue
//                 )?.label
//               }
//             </DropdownTrigger>

//             <DropdownContent widthClassName="w-full">
//               {sharedAccountFilterOptions.map((option) => (
//                 <DropdownItem
//                   key={option.value}
//                   value={option.value}
//                   className="py-3 text-base"
//                 >
//                   {option.label}
//                 </DropdownItem>
//               ))}
//             </DropdownContent>
//           </Dropdown>
//         </div>
//       </Modal>

//       <Modal
//         open={Boolean(openAccountModal)}
//         onClose={() => setOpenAccountModal(null)}
//       >
//         <div className="space-y-5 pr-8">
//           <div>
//             <h3 className="title-md">{openAccountModal?.name}</h3>
//             <p className="paragraph mt-1">
//               Update the selected shared account information.
//             </p>
//           </div>

//           <div className="space-y-4">
//             <FloatingInput
//               id="shared-account-balance"
//               label="Balance"
//               type="number"
//               value={editBalance}
//               onChange={(e) => setEditBalance(e.target.value)}
//             />

//             <FloatingInput
//               id="shared-account-quota"
//               label="Quota"
//               type="number"
//               value={editQuota}
//               onChange={(e) => setEditQuota(e.target.value)}
//             />

//             <Dropdown
//               value={editStatus}
//               onValueChange={(value) =>
//                 setEditStatus(value as SharedAccountStatus)
//               }
//             >
//               <DropdownTrigger className="h-14 w-full rounded-md px-4 text-left text-base">
//                 {editStatus}
//               </DropdownTrigger>

//               <DropdownContent widthClassName="w-full">
//                 <DropdownItem value="Active" className="py-3 text-base">
//                   Active
//                 </DropdownItem>
//                 <DropdownItem value="Suspended" className="py-3 text-base">
//                   Suspended
//                 </DropdownItem>
//                 <DropdownItem value="Inactive" className="py-3 text-base">
//                   Inactive
//                 </DropdownItem>
//               </DropdownContent>
//             </Dropdown>
//           </div>

//           <div className="flex justify-end">
//             {/*<MainButton
//               label="Save Changes"
//               onClick={handleSaveAccountChanges}
//             />*/}

//             <Button variant="primary" onClick={handleSaveAccountChanges}>
//               Save Changes
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default SharedAccountsTable;
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Check, Minus, SlidersHorizontal, X } from "lucide-react";
import Modal from "@/app/components/ui/modal/Modal";
import FloatingInput from "@/app/components/ui/input/FloatingInput";
//import MainButton from "@/app/Mohammed/components/MainButton";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";
import UsageProgress from "@/app/components/shared/features/UsageProgress";
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
import { cn } from "@/app/components/lib/cn";
import {
  SharedAccountBulkStatusAction,
  SharedAccountFilterValue,
  SharedAccountItem,
  SharedAccountSortKey,
  SharedAccountStatus,
  sharedAccountFilterOptions,
  sharedAccountStatusMeta,
  sharedAccountStatusSortOrder,
  sharedAccountsData,
  sharedAccountsTableColumns,
} from "@/Data/Admin/accounts";
import Button from "@/app/components/ui/button/Button";

type SortDir = "asc" | "desc";

const columnsClassName =
  "[grid-template-columns:72px_minmax(260px,1.5fr)_minmax(220px,1.2fr)_minmax(140px,0.8fr)_minmax(230px,1fr)_minmax(180px,0.8fr)]";

const formatNumber = (value: number) => value.toLocaleString();

/*function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn-secondary h-14 rounded-md px-6 text-base"
    >
      {children}
    </button>
  );
}*/

function AccountStatusBadge({ status }: { status: SharedAccountStatus }) {
  const config = sharedAccountStatusMeta[status];

  const icon =
    status === "Active" ? (
      <Check className="h-4 w-4" strokeWidth={2.8} />
    ) : status === "Suspended" ? (
      <X className="h-4 w-4" strokeWidth={2.8} />
    ) : (
      <Minus className="h-4 w-4" strokeWidth={2.8} />
    );

  return <StatusBadge label={config.label} tone={config.tone} icon={icon} />;
}

const SharedAccountsTable = () => {
  const [accounts, setAccounts] =
    useState<SharedAccountItem[]>(sharedAccountsData);

  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SharedAccountSortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [filterValue, setFilterValue] =
    useState<SharedAccountFilterValue>("all");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [openAccountModal, setOpenAccountModal] =
    useState<SharedAccountItem | null>(null);

  const [editQuota, setEditQuota] = useState("");
  const [editStatus, setEditStatus] = useState<SharedAccountStatus>("Active");

  const handleSort = (key: SharedAccountSortKey) => {
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

  const filteredAccounts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...accounts]
      .filter((account) => {
        const matchesSearch =
          !term ||
          account.name.toLowerCase().includes(term) ||
          account.department.toLowerCase().includes(term) ||
          account.status.toLowerCase().includes(term);

        if (!matchesSearch) return false;

        switch (filterValue) {
          case "active":
            return account.status === "Active";
          case "suspended":
            return account.status === "Suspended";
          case "inactive":
            return account.status === "Inactive";
          case "high-usage":
            return account.pagesUsedPercent >= 80;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const getSortValue = (item: SharedAccountItem) => {
          switch (sortKey) {
            case "name":
              return item.name.toLowerCase();
            case "department":
              return item.department.toLowerCase();
            case "quota":
              return item.quota;
            case "pagesUsedPercent":
              return item.pagesUsedPercent;
            case "status":
              return sharedAccountStatusSortOrder[item.status];
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
  }, [accounts, filterValue, search, sortDir, sortKey]);

  const allVisibleIds = filteredAccounts.map((account) => account.id);
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

  const handleBulkStatusChange = (
    nextStatus: SharedAccountBulkStatusAction
  ) => {
    if (selectedIds.length === 0) return;

    setAccounts((prev) =>
      prev.map((account) =>
        selectedIds.includes(account.id)
          ? { ...account, status: nextStatus }
          : account
      )
    );
  };

  useEffect(() => {
    if (!openAccountModal) return;

    setEditQuota(String(openAccountModal.quota));
    setEditStatus(openAccountModal.status);
  }, [openAccountModal]);

  const handleSaveAccountChanges = () => {
    if (!openAccountModal) return;

    const nextQuota = Number(editQuota);

    setAccounts((prev) =>
      prev.map((account) =>
        account.id === openAccountModal.id
          ? {
              ...account,
              quota: Number.isNaN(nextQuota) ? account.quota : nextQuota,
              status: editStatus,
            }
          : account
      )
    );

    setOpenAccountModal((prev) =>
      prev
        ? {
            ...prev,
            quota: Number.isNaN(nextQuota) ? prev.quota : nextQuota,
            status: editStatus,
          }
        : prev
    );
  };

  return (
    <>
      <Table>
        <TableTop>
          <TableTitleBlock
            title="Shared Accounts"
            description={`${filteredAccounts.length} cost centers`}
          />

          <TableControls>
            <TableSearch
              id="search-shared-accounts"
              label="Search accounts..."
              value={search}
              onChange={setSearch}
            />

            {/*<SecondaryButton onClick={() => setIsFilterModalOpen(true)}>
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filter
            </SecondaryButton>*/}

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
                handleBulkStatusChange(value as SharedAccountBulkStatusAction)
              }
            >
              <DropdownTrigger className="h-14 min-w-[170px] rounded-md px-6 text-base">
                Actions
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[220px]">
                <DropdownItem value="Active" className="py-4 text-lg">
                  Active
                </DropdownItem>
                <DropdownItem value="Inactive" className="py-4 text-lg">
                  Inactive
                </DropdownItem>
                <DropdownItem value="Suspended" className="py-4 text-lg">
                  Suspended
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </TableControls>
        </TableTop>

        <TableMain>
          <TableGrid minWidthClassName="min-w-[1130px]">
            <TableHeader columnsClassName={columnsClassName}>
              <TableCell className="justify-center">
                <TableCheckbox
                  checked={isAllSelected}
                  onToggle={toggleSelectAll}
                />
              </TableCell>

              {sharedAccountsTableColumns.map((column) => (
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
              {filteredAccounts.length === 0 ? (
                <TableEmptyState text="No shared accounts found" />
              ) : (
                filteredAccounts.map((account) => {
                  const isSelected = selectedIds.includes(account.id);

                  return (
                    <div
                      key={account.id}
                      onClick={() => setOpenAccountModal(account)}
                      className={cn(
                        "grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-5 transition last:border-b-0 hover:bg-brand-50/30",
                        columnsClassName
                      )}
                    >
                      <TableCell className="justify-center">
                        <TableCheckbox
                          checked={isSelected}
                          onToggle={() => toggleRowSelection(account.id)}
                        />
                      </TableCell>

                      <TableCell className="text-base font-semibold text-[var(--title)]">
                        {account.name}
                      </TableCell>

                      <TableCell className="paragraph">
                        {account.department}
                      </TableCell>

                      <TableCell className="text-base font-medium text-[var(--paragraph)]">
                        {formatNumber(account.quota)}
                      </TableCell>

                      <TableCell>
                        <UsageProgress value={account.pagesUsedPercent} />
                      </TableCell>

                      <TableCell>
                        <AccountStatusBadge status={account.status} />
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
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <div className="space-y-4 pr-8">
          <div>
            <h3 className="title-md">Filter Shared Accounts</h3>
            <p className="paragraph mt-1">
              Narrow down the shared account list.
            </p>
          </div>

          <Dropdown
            value={filterValue}
            onValueChange={(value) =>
              setFilterValue(value as SharedAccountFilterValue)
            }
          >
            <DropdownTrigger className="h-14 w-full rounded-md px-4 text-left text-base">
              {
                sharedAccountFilterOptions.find(
                  (option) => option.value === filterValue
                )?.label
              }
            </DropdownTrigger>

            <DropdownContent widthClassName="w-full">
              {sharedAccountFilterOptions.map((option) => (
                <DropdownItem
                  key={option.value}
                  value={option.value}
                  className="py-3 text-base"
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      </Modal>

      <Modal
        open={Boolean(openAccountModal)}
        onClose={() => setOpenAccountModal(null)}
      >
        <div className="space-y-5 pr-8">
          <div>
            <h3 className="title-md">{openAccountModal?.name}</h3>
            <p className="paragraph mt-1">
              Update the selected shared account information.
            </p>
          </div>

          <div className="space-y-4">
            <FloatingInput
              id="shared-account-quota"
              label="Quota"
              type="number"
              value={editQuota}
              onChange={(e) => setEditQuota(e.target.value)}
            />

            <Dropdown
              value={editStatus}
              onValueChange={(value) =>
                setEditStatus(value as SharedAccountStatus)
              }
            >
              <DropdownTrigger className="h-14 w-full rounded-md px-4 text-left text-base">
                {editStatus}
              </DropdownTrigger>

              <DropdownContent widthClassName="w-full">
                <DropdownItem value="Active" className="py-3 text-base">
                  Active
                </DropdownItem>
                <DropdownItem value="Suspended" className="py-3 text-base">
                  Suspended
                </DropdownItem>
                <DropdownItem value="Inactive" className="py-3 text-base">
                  Inactive
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>

          <div className="flex justify-end">
            {/*<MainButton
              label="Save Changes"
              onClick={handleSaveAccountChanges}
            />*/}

            <Button variant="primary" onClick={handleSaveAccountChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SharedAccountsTable;

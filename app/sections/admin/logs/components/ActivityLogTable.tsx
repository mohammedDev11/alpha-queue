"use client";

import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  FileText,
  Laptop,
  Printer,
  Shield,
  Wrench,
} from "lucide-react";
import Modal from "@/app/components/ui/modal/Modal";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";
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
  ActivityLogItem,
  ActivityLogSortKey,
  ActivityLogStatus,
  ActivityLogType,
  ActivityLogStatusFilter,
  ActivityLogTypeFilter,
  activityLogColumns,
  activityLogsData,
  activityLogStatusOptions,
  activityLogTypeOptions,
} from "@/Data/Admin/logs";

type SortDir = "asc" | "desc";

const columnsClassName =
  "[grid-template-columns:minmax(180px,1fr)_minmax(180px,0.9fr)_minmax(260px,1.5fr)_minmax(160px,0.9fr)_minmax(210px,1fr)_minmax(100px,0.6fr)_minmax(150px,0.8fr)]";

function LogTypeBadge({ type }: { type: ActivityLogType }) {
  const config: Record<
    ActivityLogType,
    {
      label: string;
      icon: React.ReactNode;
      className: string;
    }
  > = {
    "Print Job": {
      label: "Print Job",
      icon: <Printer className="h-4 w-4" />,
      className: "bg-brand-50 text-brand-500",
    },
    System: {
      label: "System",
      icon: <Laptop className="h-4 w-4" />,
      className: "bg-violet-50 text-violet-500",
    },
    Device: {
      label: "Device",
      icon: <Wrench className="h-4 w-4" />,
      className: "bg-sky-50 text-sky-600",
    },
    Security: {
      label: "Security",
      icon: <Shield className="h-4 w-4" />,
      className: "bg-amber-50 text-amber-600",
    },
  };

  const item = config[type];

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${item.className}`}
    >
      {item.icon}
      <span>{item.label}</span>
    </span>
  );
}

function LogStatusBadge({ status }: { status: ActivityLogStatus }) {
  if (status === "Success") {
    return <StatusBadge label="Success" tone="success" />;
  }

  if (status === "Failed") {
    return <StatusBadge label="Failed" tone="danger" />;
  }

  if (status === "Warning") {
    return <StatusBadge label="Warning" tone="warning" />;
  }

  return <StatusBadge label="Info" tone="inactive" />;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  if (!value && value !== 0) return null;

  return (
    <div
      className="flex items-start justify-between gap-4 rounded-xl px-4 py-3"
      style={{ background: "var(--surface-2)" }}
    >
      <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      <span className="text-right text-sm font-semibold text-[var(--foreground)]">
        {value}
      </span>
    </div>
  );
}

const ActivityLogTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<ActivityLogSortKey>("time");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [typeFilter, setTypeFilter] = useState<ActivityLogTypeFilter>("all");
  const [statusFilter, setStatusFilter] =
    useState<ActivityLogStatusFilter>("all");
  const [openLogModal, setOpenLogModal] = useState<ActivityLogItem | null>(
    null
  );

  const handleSort = (key: ActivityLogSortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(key);
    setSortDir("asc");
  };

  const filteredLogs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...activityLogsData]
      .filter((log) => {
        const matchesSearch =
          !term ||
          log.time.toLowerCase().includes(term) ||
          log.type.toLowerCase().includes(term) ||
          log.title.toLowerCase().includes(term) ||
          log.description.toLowerCase().includes(term) ||
          log.user.toLowerCase().includes(term) ||
          log.printer.toLowerCase().includes(term) ||
          log.status.toLowerCase().includes(term) ||
          (log.documentName ?? "").toLowerCase().includes(term) ||
          (log.location ?? "").toLowerCase().includes(term);

        const matchesType =
          typeFilter === "all" ? true : log.type === typeFilter;

        const matchesStatus =
          statusFilter === "all" ? true : log.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a, b) => {
        const getValue = (item: ActivityLogItem) => {
          switch (sortKey) {
            case "time":
              return item.time.toLowerCase();
            case "type":
              return item.type.toLowerCase();
            case "title":
              return item.title.toLowerCase();
            case "user":
              return item.user.toLowerCase();
            case "printer":
              return item.printer.toLowerCase();
            case "pages":
              return item.pages ?? -1;
            case "status":
              return item.status.toLowerCase();
            default:
              return item.time.toLowerCase();
          }
        };

        const aValue = getValue(a);
        const bValue = getValue(b);

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDir === "asc" ? aValue - bValue : bValue - aValue;
        }

        return sortDir === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [search, sortKey, sortDir, typeFilter, statusFilter]);

  return (
    <>
      <Table>
        <TableTop>
          <TableTitleBlock
            title="Activity Log"
            description={`${filteredLogs.length} entries`}
          />

          <TableControls>
            <TableSearch
              id="search-activity-logs"
              label="Search logs..."
              value={search}
              onChange={setSearch}
              wrapperClassName="w-full md:w-[330px]"
            />

            <Dropdown
              value={typeFilter}
              onValueChange={(value) =>
                setTypeFilter(value as ActivityLogTypeFilter)
              }
            >
              <DropdownTrigger className="h-14 min-w-[170px] rounded-2xl px-5 text-base">
                {activityLogTypeOptions.find(
                  (item) => item.value === typeFilter
                )?.label ?? "All Types"}
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[220px]">
                {activityLogTypeOptions.map((item) => (
                  <DropdownItem key={item.value} value={item.value}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>

            <Dropdown
              value={statusFilter}
              onValueChange={(value) =>
                setStatusFilter(value as ActivityLogStatusFilter)
              }
            >
              <DropdownTrigger className="h-14 min-w-[180px] rounded-2xl px-5 text-base">
                {activityLogStatusOptions.find(
                  (item) => item.value === statusFilter
                )?.label ?? "All Statuses"}
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[220px]">
                {activityLogStatusOptions.map((item) => (
                  <DropdownItem key={item.value} value={item.value}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </TableControls>
        </TableTop>

        <TableMain>
          <TableGrid minWidthClassName="min-w-[1500px]">
            <TableHeader columnsClassName={columnsClassName}>
              {activityLogColumns.map((column) => (
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
              {filteredLogs.length === 0 ? (
                <TableEmptyState text="No activity logs found" />
              ) : (
                filteredLogs.map((log) => {
                  return (
                    <div
                      key={log.id}
                      onClick={() => setOpenLogModal(log)}
                      className={`grid w-full cursor-pointer border-b border-[var(--border)] px-6 py-5 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
                    >
                      <TableCell className="paragraph font-medium text-[var(--muted)]">
                        {log.time}
                      </TableCell>

                      <TableCell>
                        <LogTypeBadge type={log.type} />
                      </TableCell>

                      <TableCell className="min-w-0">
                        <div className="min-w-0">
                          <p className="paragraph font-semibold text-[var(--foreground)]">
                            {log.title}
                          </p>
                          <p className="paragraph mt-1 text-[var(--muted)]">
                            {log.description}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="paragraph">{log.user}</TableCell>

                      <TableCell className="paragraph">{log.printer}</TableCell>

                      <TableCell className="paragraph font-semibold">
                        {log.pages ?? "—"}
                      </TableCell>

                      <TableCell>
                        <LogStatusBadge status={log.status} />
                      </TableCell>
                    </div>
                  );
                })
              )}
            </TableBody>
          </TableGrid>
        </TableMain>
      </Table>

      <Modal open={Boolean(openLogModal)} onClose={() => setOpenLogModal(null)}>
        <div className="min-w-[320px] space-y-6 md:min-w-[760px]">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              {openLogModal ? <LogTypeBadge type={openLogModal.type} /> : null}
              {openLogModal ? (
                <LogStatusBadge status={openLogModal.status} />
              ) : null}
            </div>

            <h3 className="title-md">{openLogModal?.title}</h3>
            <p className="paragraph">{openLogModal?.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <DetailRow label="Time" value={openLogModal?.time} />
            <DetailRow label="User" value={openLogModal?.user} />
            <DetailRow label="Printer" value={openLogModal?.printer} />
            <DetailRow label="Pages" value={openLogModal?.pages ?? "—"} />
            <DetailRow
              label="Document Name"
              value={openLogModal?.documentName}
            />
            <DetailRow label="Device IP" value={openLogModal?.deviceIp} />
            <DetailRow label="Queue Name" value={openLogModal?.queueName} />
            <DetailRow
              label="Serial Number"
              value={openLogModal?.serialNumber}
            />
            <DetailRow label="Location" value={openLogModal?.location} />
          </div>

          {openLogModal?.resolutionNote ? (
            <div
              className="rounded-2xl px-4 py-4"
              style={{ background: "var(--surface-2)" }}
            >
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-brand-500" />
                <p className="text-sm font-semibold text-[var(--foreground)]">
                  Resolution / Note
                </p>
              </div>

              <p className="text-sm text-[var(--paragraph)]">
                {openLogModal.resolutionNote}
              </p>
            </div>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default ActivityLogTable;

"use client";

import React from "react";
import Button from "@/app/components/ui/button/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/ui/dropdown/Dropdown";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";
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
  TableTop,
} from "@/app/components/shared/table/Table";
import { XCircle, CheckCheck} from "lucide-react";
import RefreshTimer from "./RefreshTimer";
import {
  formatLabel,
  formatTypeLabel,
  getSeverityTone,
  getStatusTone,
  Notification,
  NotificationFilters,
  NotificationSource,
  NotificationStatus,
  NotificationType,
} from "@/Data/Admin/notifications";

type Props = {
  notifications: Notification[];
  filters: NotificationFilters;
  setFilters: React.Dispatch<React.SetStateAction<NotificationFilters>>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  secondsLeft: number;
  onRefreshNow: () => void;
  onBulkRead: (ids: string[]) => void;
  onBulkResolve: (ids: string[]) => void;
  onBulkDismiss: (ids: string[]) => void;
  onBulkDelete: (ids: string[]) => void;
  onResolveOne: (id: string) => void;
  onDismissOne: (id: string) => void;
  onDeleteOne: (id: string) => void;
};

const columnsClassName =
  "[grid-template-columns:72px_minmax(280px,1.7fr)_170px_120px_120px_150px_140px_130px]";

export default function NotificationTable({
  notifications,
  filters,
  setFilters,
  selectedIds,
  setSelectedIds,
  secondsLeft,
  onRefreshNow,
  onBulkRead,
  onBulkResolve,
  onBulkDismiss,
  onBulkDelete,
  onResolveOne,
  onDismissOne,
  onDeleteOne,
}: Props) {
  const allVisibleIds = notifications.map((item) => item.id);
  const isAllSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allVisibleIds.includes(id)));
      return;
    }

    setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
  };

  const toggleRowSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Table>
      <TableTop className="pb-4">
        <TableControls>
          <TableSearch
            id="search-notifications"
            label="Search by title, message, device..."
            value={filters.search}
            onChange={(value: string) =>
              setFilters((prev) => ({ ...prev, search: value }))
            }
            wrapperClassName="w-full md:w-[440px]"
          />

          <Dropdown
            value={filters.type}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                type: value as NotificationType | "all",
              }))
            }
          >
            <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
              {filters.type === "all" ? "All Types" : formatTypeLabel(filters.type)}
            </DropdownTrigger>
            <DropdownContent widthClassName="w-[220px]">
              <DropdownItem value="all">All Types</DropdownItem>
              <DropdownItem value="printer_alert">Printer Alert</DropdownItem>
              <DropdownItem value="device_error">Device Error</DropdownItem>
              <DropdownItem value="toner_low">Toner Low</DropdownItem>
              <DropdownItem value="queue_warning">Queue Warning</DropdownItem>
              <DropdownItem value="maintenance_reminder">
                Maintenance Reminder
              </DropdownItem>
              <DropdownItem value="system_warning">System Warning</DropdownItem>
              <DropdownItem value="job_issue">Job Issue</DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.severity}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                severity: value as NotificationFilters["severity"],
              }))
            }
          >
            <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
              {filters.severity === "all"
                ? "All Severities"
                : formatLabel(filters.severity)}
            </DropdownTrigger>
            <DropdownContent widthClassName="w-[220px]">
              <DropdownItem value="all">All Severities</DropdownItem>
              <DropdownItem value="info">Info</DropdownItem>
              <DropdownItem value="warning">Warning</DropdownItem>
              <DropdownItem value="error">Error</DropdownItem>
              <DropdownItem value="critical">Critical</DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.status}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                status: value as NotificationStatus | "all",
              }))
            }
          >
            <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
              {filters.status === "all"
                ? "All Statuses"
                : formatLabel(filters.status)}
            </DropdownTrigger>
            <DropdownContent widthClassName="w-[220px]">
              <DropdownItem value="all">All Statuses</DropdownItem>
              <DropdownItem value="unread">Unread</DropdownItem>
              <DropdownItem value="read">Read</DropdownItem>
              <DropdownItem value="resolved">Resolved</DropdownItem>
              <DropdownItem value="dismissed">Dismissed</DropdownItem>
            </DropdownContent>
          </Dropdown>

          <Dropdown
            value={filters.source}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                source: value as NotificationSource | "all",
              }))
            }
          >
            <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
              {filters.source === "all" ? "All Sources" : filters.source}
            </DropdownTrigger>
            <DropdownContent widthClassName="w-[220px]">
              <DropdownItem value="all">All Sources</DropdownItem>
              <DropdownItem value="Printer">Printer</DropdownItem>
              <DropdownItem value="Device">Device</DropdownItem>
              <DropdownItem value="Queue">Queue</DropdownItem>
              <DropdownItem value="System">System</DropdownItem>
              <DropdownItem value="Report Scheduler">Report Scheduler</DropdownItem>
            </DropdownContent>
          </Dropdown>

          <RefreshTimer
            secondsLeft={secondsLeft}
            onRefreshNow={onRefreshNow}
          />

          <div
            className={selectedIds.length === 0 ? "pointer-events-none opacity-50" : ""}
          >
            <Dropdown
              onValueChange={(value) => {
                if (value === "read") onBulkRead(selectedIds);
                if (value === "resolve") onBulkResolve(selectedIds);
                if (value === "dismiss") onBulkDismiss(selectedIds);
                if (value === "delete") onBulkDelete(selectedIds);
              }}
            >
              <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
                Actions
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[220px]">
                <DropdownItem value="read" className="py-4 text-lg">
                  Read
                </DropdownItem>
                <DropdownItem value="resolve" className="py-4 text-lg">
                  Resolve
                </DropdownItem>
                <DropdownItem value="dismiss" className="py-4 text-lg">
                  Dismiss
                </DropdownItem>
                <DropdownItem value="delete" className="py-4 text-lg">
                  Delete
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </div>
        </TableControls>
      </TableTop>

      <TableMain>
        <TableGrid minWidthClassName="min-w-[1280px]">
          <TableHeader columnsClassName={columnsClassName}>
            <TableCell className="justify-center">
              <TableCheckbox checked={isAllSelected} onToggle={toggleSelectAll} />
            </TableCell>

            <TableHeaderCell label="Title" />
            <TableHeaderCell label="Type" />
            <TableHeaderCell label="Source" />
            <TableHeaderCell label="Severity" />
            <TableHeaderCell label="Date" />
            <TableHeaderCell label="Status" />

            <div
              className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs"
              style={{ color: "var(--muted)" }}
            >
              Quick Actions
            </div>
          </TableHeader>

          <TableBody>
            {notifications.length === 0 ? (
              <TableEmptyState text="No notifications found" />
            ) : (
              notifications.map((notification) => {
                const isSelected = selectedIds.includes(notification.id);

                return (
                  <div
                    key={notification.id}
                    className={`grid w-full items-center border-b border-[var(--border)] px-6 py-4 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
                  >
                    <TableCell className="justify-center">
                      <TableCheckbox
                        checked={isSelected}
                        onToggle={() => toggleRowSelection(notification.id)}
                      />
                    </TableCell>

                    <TableCell className="min-w-0 flex-col items-start gap-0.5">
                      <span className="block truncate text-sm font-semibold text-[var(--title)]">
                        {notification.title}
                      </span>
                      <span className="block truncate text-sm text-[var(--muted)]">
                        {notification.message}
                      </span>
                    </TableCell>

                    <TableCell className="min-w-0 paragraph font-medium">
                      <span className="block truncate">
                        {formatTypeLabel(notification.type)}
                      </span>
                    </TableCell>

                    <TableCell className="min-w-0 paragraph font-medium">
                      <span className="block truncate">{notification.source}</span>
                    </TableCell>

                    <TableCell>
                      <StatusBadge
                        label={formatLabel(notification.severity)}
                        tone={getSeverityTone(notification.severity)}
                        className="px-3 py-1.5 text-xs"
                      />
                    </TableCell>

                    <TableCell className="min-w-0 paragraph font-medium">
                      <span className="block truncate">{notification.createdAt}</span>
                    </TableCell>

                    <TableCell>
                      <StatusBadge
                        label={formatLabel(notification.status)}
                        tone={getStatusTone(notification.status)}
                        className="px-3 py-1.5 text-xs"
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          className="h-9 px-2 text-[var(--muted)] hover:bg-[var(--surface-2)]"
                          onClick={() => onResolveOne(notification.id)}
                          title="Resolve"
                        >
                          <CheckCheck className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          className="h-9 px-2 text-[var(--muted)] hover:bg-[var(--surface-2)]"
                          onClick={() => onDismissOne(notification.id)}
                          title="Dismiss"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </div>
                );
              })
            )}
          </TableBody>
        </TableGrid>
      </TableMain>
    </Table>
  );
}
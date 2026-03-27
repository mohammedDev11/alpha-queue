"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  FileText,
  Play,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";
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
  TableTop,
} from "@/app/components/shared/table/Table";
import {
  PrintReleaseItem,
  PrintReleaseSortKey,
  printReleaseColumns,
  printReleaseData,
} from "@/Data/Admin/printRelease";
import Button from "@/app/components/ui/button/Button";

type SortDir = "asc" | "desc";
type ActionValue =
  | "release-all"
  | "release-selected"
  | "delete-selected"
  | "export-queue";

const columnsClassName =
  "[grid-template-columns:72px_150px_minmax(250px,1.3fr)_minmax(280px,1.5fr)_minmax(180px,1fr)_150px_150px]";

const TOTAL_SECONDS = 30;

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium status-warning">
      {status}
    </span>
  );
}

function OptionPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-medium"
      style={{
        background: "var(--surface)",
        color: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      {label}
    </span>
  );
}

{
  /*function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="btn-secondary h-12 px-5 text-base">
      {children}
    </button>
  );
}*/
}

{
  /*function ReleaseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="btn-primary h-10 px-4 text-sm"
    >
      <Play className="mr-2 h-4 w-4" />
      Release
    </button>
  );
}*/
}

function ReleaseButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="primary"
      iconLeft={<Play className="h-4 w-4" />}
      className="h-10 px-4 text-sm"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      Release
    </Button>
  );
}
{
  /*Special Button not related to Button*/
}
function RefreshTimer({
  secondsLeft,
  onRefreshNow,
}: {
  secondsLeft: number;
  onRefreshNow: () => void;
}) {
  const progress = secondsLeft / TOTAL_SECONDS;
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);
  const done = secondsLeft === 0;

  return (
    <button
      type="button"
      onClick={onRefreshNow}
      className="btn-secondary h-12 gap-3 px-4"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        {done ? (
          <CheckCircle2 className="h-5 w-5 text-success-500" />
        ) : (
          <>
            <svg className="h-6 w-6 -rotate-90" viewBox="0 0 40 40">
              <circle
                cx="20"
                cy="20"
                r={radius}
                fill="none"
                stroke="rgba(148,163,184,0.25)"
                strokeWidth="4"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="text-brand-500 transition-all duration-1000 ease-linear"
              />
            </svg>
            <RefreshCw className="absolute h-3.5 w-3.5 text-brand-500" />
          </>
        )}
      </span>

      <span className="font-medium">
        {done ? "Updated" : `${secondsLeft}s`}
      </span>
    </button>
  );
}

const PrintReleaseTable = () => {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<PrintReleaseSortKey>("jobId");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);

  const [openJobModal, setOpenJobModal] = useState<PrintReleaseItem | null>(
    null
  );
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState<ActionValue | null>(null);
  const [releasedJob, setReleasedJob] = useState<PrintReleaseItem | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 0) return TOTAL_SECONDS;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefreshNow = () => {
    setSecondsLeft(0);
    setTimeout(() => {
      setSecondsLeft(TOTAL_SECONDS);
    }, 900);
  };

  const handleSort = (key: PrintReleaseSortKey) => {
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

  const filteredJobs = useMemo(() => {
    const term = search.trim().toLowerCase();

    return [...printReleaseData]
      .filter((job) => {
        if (!term) return true;

        return (
          job.jobId.toLowerCase().includes(term) ||
          job.userName.toLowerCase().includes(term) ||
          job.userEmail.toLowerCase().includes(term) ||
          job.documentName.toLowerCase().includes(term) ||
          job.printerName.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const getSortValue = (item: PrintReleaseItem) => {
          switch (sortKey) {
            case "jobId":
              return item.jobId.toLowerCase();
            case "userName":
              return item.userName.toLowerCase();
            case "documentName":
              return item.documentName.toLowerCase();
            case "printerName":
              return item.printerName.toLowerCase();
            case "status":
              return item.status.toLowerCase();
            default:
              return item.jobId.toLowerCase();
          }
        };

        const aValue = getSortValue(a);
        const bValue = getSortValue(b);

        return sortDir === "asc"
          ? String(aValue).localeCompare(String(bValue))
          : String(bValue).localeCompare(String(aValue));
      });
  }, [search, sortKey, sortDir]);

  const allVisibleIds = filteredJobs.map((job) => job.id);
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
    "release-all": "Release all",
    "release-selected": "Release selected",
    "delete-selected": "Delete selected",
    "export-queue": "Export queue",
  };

  return (
    <>
      <Table>
        <TableTop className="pb-4">
          <p className="paragraph mt-1">{`${filteredJobs.length} jobs in queue`}</p>

          <TableControls>
            <TableSearch
              id="search-print-release"
              label="Search by user, document, printer..."
              value={search}
              onChange={setSearch}
              wrapperClassName="w-full md:w-[440px]"
            />

            <RefreshTimer
              secondsLeft={secondsLeft}
              onRefreshNow={handleRefreshNow}
            />

            {/*<SecondaryButton onClick={() => setIsFilterModalOpen(true)}>
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filter
            </SecondaryButton>*/}

            <Button
              variant="outline"
              iconLeft={<SlidersHorizontal className="h-4 w-4" />}
              className="h-12 px-5 text-base"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filter
            </Button>

            <Dropdown
              onValueChange={(value) => setActionModal(value as ActionValue)}
            >
              <DropdownTrigger className="h-12 min-w-[170px] px-5 text-base">
                Actions
              </DropdownTrigger>

              <DropdownContent align="right" widthClassName="w-[260px]">
                <DropdownItem value="release-all" className="py-4 text-lg">
                  Release all
                </DropdownItem>
                <DropdownItem value="release-selected" className="py-4 text-lg">
                  Release selected
                </DropdownItem>
                <DropdownItem value="delete-selected" className="py-4 text-lg">
                  Delete selected
                </DropdownItem>
                <DropdownItem value="export-queue" className="py-4 text-lg">
                  Export queue
                </DropdownItem>
              </DropdownContent>
            </Dropdown>
          </TableControls>
        </TableTop>

        <TableMain>
          <TableGrid minWidthClassName="min-w-[1242px]">
            <TableHeader columnsClassName={columnsClassName}>
              <TableCell className="justify-center">
                <TableCheckbox
                  checked={isAllSelected}
                  onToggle={toggleSelectAll}
                />
              </TableCell>

              {printReleaseColumns.map((column) => (
                <TableHeaderCell
                  key={column.key}
                  label={column.label}
                  sortable={column.sortable}
                  active={sortKey === column.key}
                  direction={sortDir}
                  onClick={() => handleSort(column.key)}
                />
              ))}

              <div
                className="text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs"
                style={{ color: "var(--muted)" }}
              >
                Release
              </div>
            </TableHeader>

            <TableBody>
              {filteredJobs.length === 0 ? (
                <TableEmptyState text="No jobs found" />
              ) : (
                filteredJobs.map((job) => {
                  const isSelected = selectedIds.includes(job.id);

                  return (
                    <div
                      key={job.id}
                      onClick={() => setOpenJobModal(job)}
                      className={`grid w-full cursor-pointer items-center border-b border-[var(--border)] px-6 py-4 transition last:border-b-0 hover:bg-brand-50/30 ${columnsClassName}`}
                    >
                      <TableCell className="justify-center">
                        <TableCheckbox
                          checked={isSelected}
                          onToggle={() => toggleRowSelection(job.id)}
                        />
                      </TableCell>

                      <TableCell className="min-w-0 paragraph font-medium">
                        <span className="block truncate">{job.jobId}</span>
                      </TableCell>

                      <TableCell className="min-w-0 flex-col items-start gap-0.5">
                        <span className="block truncate text-sm font-semibold text-[var(--title)]">
                          {job.userName}
                        </span>
                        <span className="block truncate text-sm text-[var(--muted)]">
                          {job.userEmail}
                        </span>
                      </TableCell>

                      <TableCell className="min-w-0 gap-2">
                        <FileText className="h-4 w-4 shrink-0 text-[var(--muted)]" />
                        <span className="paragraph block truncate">
                          {job.documentName}
                        </span>
                      </TableCell>

                      <TableCell className="min-w-0">
                        <span className="paragraph block truncate">
                          {job.printerName}
                        </span>
                      </TableCell>

                      <TableCell>
                        <StatusBadge status={job.status} />
                      </TableCell>

                      <TableCell>
                        <ReleaseButton onClick={() => setReleasedJob(job)} />
                      </TableCell>
                    </div>
                  );
                })
              )}
            </TableBody>
          </TableGrid>
        </TableMain>
      </Table>

      <Modal open={Boolean(openJobModal)} onClose={() => setOpenJobModal(null)}>
        <div className="space-y-5 pr-8">
          <div>
            <h3 className="title-md">{openJobModal?.jobId}</h3>
            <p className="paragraph mt-1">
              Review job details and manage secure release.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-[var(--muted)]">User</p>
              <p className="paragraph mt-1">{openJobModal?.userName}</p>
              <p className="text-sm text-[var(--muted)]">
                {openJobModal?.userEmail}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--muted)]">Printer</p>
              <p className="paragraph mt-1">{openJobModal?.printerName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--muted)]">
                Document
              </p>
              <p className="paragraph mt-1">{openJobModal?.documentName}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--muted)]">Status</p>
              <div className="mt-2">
                {openJobModal?.status ? (
                  <StatusBadge status={openJobModal.status} />
                ) : null}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--muted)]">Pages</p>
              <p className="paragraph mt-1">{openJobModal?.pages ?? "-"}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--muted)]">
                Submitted
              </p>
              <p className="paragraph mt-1">{openJobModal?.submittedAt}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[var(--muted)]">
              Print Options
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {openJobModal?.options?.length ? (
                openJobModal.options.map((option) => (
                  <OptionPill key={option} label={option} />
                ))
              ) : (
                <p className="paragraph">No special options</p>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
      >
        <div className="space-y-3 pr-8">
          <h3 className="title-md">Filter Print Queue</h3>
          <p className="paragraph">
            Add filters for held jobs, users, printers, or release conditions.
          </p>
        </div>
      </Modal>

      <Modal open={Boolean(actionModal)} onClose={() => setActionModal(null)}>
        <div className="space-y-3 pr-8">
          <h3 className="title-md">
            {actionModal ? actionTitleMap[actionModal] : "Action"}
          </h3>
          <p className="paragraph">
            Manage the current queue selection and apply bulk operations.
          </p>
          <p className="paragraph">
            Selected rows:{" "}
            <span className="font-semibold">{selectedIds.length}</span>
          </p>
        </div>
      </Modal>

      <Modal open={Boolean(releasedJob)} onClose={() => setReleasedJob(null)}>
        <div className="space-y-3 pr-8">
          <h3 className="title-md">Release Job</h3>
          <p className="paragraph">{releasedJob?.jobId}</p>
          <p className="paragraph">
            Confirm secure release for this print job.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default PrintReleaseTable;

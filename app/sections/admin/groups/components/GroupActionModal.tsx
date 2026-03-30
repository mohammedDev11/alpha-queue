"use client";

import React, { useState } from "react";
import Modal from "@/app/components/ui/modal/Modal";
import Button from "@/app/components/ui/button/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/app/components/ui/dropdown/Dropdown";
import Input from "@/app/components/ui/input/Input";

export type GroupActionValue =
  | "delete-selected"
  | "export-groups"
  | "assign-credits"
  | "set-fixed-credit"
  | "change-restriction"
  | "group-summary-report";

type GroupActionModalProps = {
  open: boolean;
  onClose: () => void;
  action: GroupActionValue | null;
  selectedCount: number;
};

const exportFormatOptions = ["PDF", "CSV", "Excel"];
const restrictionOptions = ["Unlocked", "Locked"];

const actionTitleMap: Record<GroupActionValue, string> = {
  "delete-selected": "Delete Selected Groups",
  "export-groups": "Export Groups",
  "assign-credits": "Adjust Credits",
  "set-fixed-credit": "Set Fixed Credit",
  "change-restriction": "Change Restriction",
  "group-summary-report": "Generate Group Summary Report",
};

const GroupActionModal = ({
  open,
  onClose,
  action,
  selectedCount,
}: GroupActionModalProps) => {
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [format, setFormat] = useState("PDF");
  const [restriction, setRestriction] = useState("Unlocked");

  if (!action) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-5 pr-8">
        <div className="space-y-2">
          <h3 className="title-md">{actionTitleMap[action]}</h3>
          <p className="paragraph">
            Selected groups:{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {selectedCount}
            </span>
          </p>
        </div>

        {(action === "assign-credits" || action === "set-fixed-credit") && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="paragraph font-medium">
                {action === "assign-credits"
                  ? "Adjust Credit By"
                  : "Set Credit To"}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="paragraph font-medium">
                Transaction Comment
              </label>
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Optional comment"
              />
            </div>
          </div>
        )}

        {action === "change-restriction" && (
          <div className="space-y-2">
            <label className="paragraph font-medium">Restriction Status</label>
            <Dropdown value={restriction} onValueChange={setRestriction}>
              <DropdownTrigger className="input h-[52px] px-4">
                {restriction}
              </DropdownTrigger>
              <DropdownContent widthClassName="w-full">
                {restrictionOptions.map((option) => (
                  <DropdownItem key={option} value={option}>
                    {option}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        )}

        {(action === "export-groups" || action === "group-summary-report") && (
          <div className="space-y-2">
            <label className="paragraph font-medium">Output Format</label>
            <Dropdown value={format} onValueChange={setFormat}>
              <DropdownTrigger className="input h-[52px] px-4">
                {format}
              </DropdownTrigger>
              <DropdownContent widthClassName="w-full">
                {exportFormatOptions.map((option) => (
                  <DropdownItem key={option} value={option}>
                    {option}
                  </DropdownItem>
                ))}
              </DropdownContent>
            </Dropdown>
          </div>
        )}

        {action === "delete-selected" && (
          <div className="rounded-md border border-[var(--color-danger-100)] bg-[var(--color-danger-50)] p-4">
            <p className="paragraph text-[var(--color-danger-600)]">
              This action will permanently remove the selected groups.
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3">
          <Button variant="outline" className="h-12 px-5" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" className="h-12 px-5" onClick={onClose}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default GroupActionModal;

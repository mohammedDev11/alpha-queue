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

type FilterGroupsModalProps = {
  open: boolean;
  onClose: () => void;
};

const restrictedOptions = ["All", "Unlocked", "Locked"];
const periodOptions = ["All", "None", "Daily", "Weekly", "Monthly"];
const memberScopeOptions = ["All Groups", "Empty Groups", "Has Members"];

const FilterGroupsModal = ({ open, onClose }: FilterGroupsModalProps) => {
  const [restricted, setRestricted] = useState("All");
  const [period, setPeriod] = useState("All");
  const [memberScope, setMemberScope] = useState("All Groups");
  const [minCredit, setMinCredit] = useState("");
  const [maxCredit, setMaxCredit] = useState("");

  const resetFilters = () => {
    setRestricted("All");
    setPeriod("All");
    setMemberScope("All Groups");
    setMinCredit("");
    setMaxCredit("");
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="pr-8">
        <div className="mb-6 space-y-2">
          <h3 className="title-md">Filter Groups</h3>
          <p className="paragraph">
            Filter groups by restriction state, quota schedule, membership, and
            credit range.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="paragraph font-medium">
                Restriction Status
              </label>
              <Dropdown value={restricted} onValueChange={setRestricted}>
                <DropdownTrigger className="input h-[52px] px-4">
                  {restricted}
                </DropdownTrigger>
                <DropdownContent widthClassName="w-full">
                  {restrictedOptions.map((option) => (
                    <DropdownItem key={option} value={option}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className="space-y-2">
              <label className="paragraph font-medium">Schedule Period</label>
              <Dropdown value={period} onValueChange={setPeriod}>
                <DropdownTrigger className="input h-[52px] px-4">
                  {period}
                </DropdownTrigger>
                <DropdownContent widthClassName="w-full">
                  {periodOptions.map((option) => (
                    <DropdownItem key={option} value={option}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="paragraph font-medium">Member Scope</label>
              <Dropdown value={memberScope} onValueChange={setMemberScope}>
                <DropdownTrigger className="input h-[52px] px-4">
                  {memberScope}
                </DropdownTrigger>
                <DropdownContent widthClassName="w-full">
                  {memberScopeOptions.map((option) => (
                    <DropdownItem key={option} value={option}>
                      {option}
                    </DropdownItem>
                  ))}
                </DropdownContent>
              </Dropdown>
            </div>

            <div className="space-y-2">
              <label className="paragraph font-medium">
                Min Initial Credit
              </label>
              <Input
                type="number"
                value={minCredit}
                onChange={(e) => setMinCredit(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label className="paragraph font-medium">
                Max Initial Credit
              </label>
              <Input
                type="number"
                value={maxCredit}
                onChange={(e) => setMaxCredit(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              variant="outline"
              className="h-12 px-5"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button variant="primary" className="h-12 px-5" onClick={onClose}>
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FilterGroupsModal;

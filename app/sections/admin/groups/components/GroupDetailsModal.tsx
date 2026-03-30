"use client";

import React from "react";
import {
  CalendarClock,
  CircleDollarSign,
  Lock,
  LockOpen,
  Users,
  WalletCards,
} from "lucide-react";
import Modal from "@/app/components/ui/modal/Modal";
import Button from "@/app/components/ui/button/Button";
import StatusBadge from "@/app/components/ui/badge/StatusBadge";
import { GroupItem } from "@/Data/Admin/groups";

type GroupDetailsModalProps = {
  open: boolean;
  onClose: () => void;
  group: GroupItem | null;
};

const formatMoney = (value: number) => value.toFixed(2);

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="card p-4">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <p className="paragraph font-medium">{label}</p>
      </div>
      <p className="title-md">{value}</p>
    </div>
  );
}

const GroupDetailsModal = ({
  open,
  onClose,
  group,
}: GroupDetailsModalProps) => {
  if (!group) return null;

  const isUnlocked = group.restricted === "Unlocked";

  return (
    <Modal open={open} onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto pr-4 sm:pr-8">
        <div className="mb-6 space-y-2">
          <h3 className="title-md">{group.name}</h3>
          <p className="paragraph">
            View group details, quota schedule, default user settings, and quick
            actions for members.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <InfoCard
            icon={<Users className="h-5 w-5 text-[var(--color-brand-500)]" />}
            label="Member Count"
            value={group.members}
          />

          <div className="card p-4">
            <div className="mb-2 flex items-center gap-2">
              {isUnlocked ? (
                <LockOpen className="h-5 w-5 text-[var(--color-success-500)]" />
              ) : (
                <Lock className="h-5 w-5 text-[var(--color-danger-500)]" />
              )}
              <p className="paragraph font-medium">Initially Restricted</p>
            </div>

            <StatusBadge
              label={group.restricted}
              tone={isUnlocked ? "success" : "danger"}
            />
          </div>

          <InfoCard
            icon={
              <CircleDollarSign className="h-5 w-5 text-[var(--color-brand-500)]" />
            }
            label="Initial Credit"
            value={formatMoney(group.initialCredit)}
          />

          <InfoCard
            icon={
              <CalendarClock className="h-5 w-5 text-[var(--color-brand-500)]" />
            }
            label="Schedule Amount"
            value={formatMoney(group.scheduleAmount)}
          />

          <InfoCard
            icon={
              <WalletCards className="h-5 w-5 text-[var(--color-brand-500)]" />
            }
            label="Schedule Period"
            value={group.period}
          />

          <InfoCard
            icon={<Users className="h-5 w-5 text-[var(--color-brand-500)]" />}
            label="Members View"
            value="Available"
          />
        </div>

        <div className="mt-4 card space-y-4 p-5">
          <div>
            <h4 className="title-sm text-[var(--title)]">
              Group Member Actions
            </h4>
            <p className="paragraph">
              Open members, reset usage counters, or apply bulk changes to this
              group.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" className="h-12 px-5">
              View Group Members
            </Button>
            <Button variant="outline" className="h-12 px-5">
              Reset Member Statistics
            </Button>
            <Button variant="outline" className="h-12 px-5">
              Bulk Adjust Balances
            </Button>
            <Button variant="outline" className="h-12 px-5">
              Change Restrictions
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GroupDetailsModal;

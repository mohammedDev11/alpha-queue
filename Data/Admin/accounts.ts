import type { ReactNode } from "react";
import type { StatusTone } from "@/app/components/ui/badge/StatusBadge";

export type SharedAccountStatus = "Active" | "Suspended" | "Inactive";

export type SharedAccountItem = {
  id: string;
  name: string;
  department: string;
  quota: number;
  pagesUsedPercent: number;
  status: SharedAccountStatus;
};

export type SharedAccountSortKey =
  | "name"
  | "department"
  | "quota"
  | "pagesUsedPercent"
  | "status";

export type SharedAccountFilterValue =
  | "all"
  | "active"
  | "suspended"
  | "inactive"
  | "high-usage";

export type SharedAccountBulkStatusAction = "Active" | "Inactive" | "Suspended";

export type SharedAccountStatusMeta = {
  label: string;
  tone: StatusTone;
};

export const sharedAccountsTableColumns: {
  key: SharedAccountSortKey;
  label: string;
  sortable: boolean;
}[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "department", label: "Department", sortable: true },
  { key: "quota", label: "Quota", sortable: true },
  { key: "pagesUsedPercent", label: "Pages Used", sortable: true },
  { key: "status", label: "Status", sortable: true },
];

export const sharedAccountStatusSortOrder: Record<SharedAccountStatus, number> =
  {
    Active: 0,
    Suspended: 1,
    Inactive: 2,
  };

export const sharedAccountFilterOptions: {
  value: SharedAccountFilterValue;
  label: string;
}[] = [
  { value: "all", label: "All Accounts" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
  { value: "inactive", label: "Inactive" },
  { value: "high-usage", label: "High Usage" },
];

export const sharedAccountStatusMeta: Record<
  SharedAccountStatus,
  SharedAccountStatusMeta
> = {
  Active: {
    label: "Active",
    tone: "success",
  },
  Suspended: {
    label: "Suspended",
    tone: "danger",
  },
  Inactive: {
    label: "Inactive",
    tone: "inactive",
  },
};

export const sharedAccountsData: SharedAccountItem[] = [
  {
    id: "acc-001",
    name: "Faculty of Engineering",
    department: "Engineering",
    quota: 5000,
    pagesUsedPercent: 76,
    status: "Active",
  },
  {
    id: "acc-002",
    name: "Faculty of CS",
    department: "Computer Science",
    quota: 4000,
    pagesUsedPercent: 99,
    status: "Active",
  },
  {
    id: "acc-003",
    name: "Library Services",
    department: "Administration",
    quota: 10000,
    pagesUsedPercent: 41,
    status: "Active",
  },
  {
    id: "acc-004",
    name: "Student Affairs",
    department: "Administration",
    quota: 2000,
    pagesUsedPercent: 99,
    status: "Suspended",
  },
  {
    id: "acc-005",
    name: "Faculty of Business",
    department: "Business",
    quota: 3000,
    pagesUsedPercent: 30,
    status: "Active",
  },
  {
    id: "acc-006",
    name: "Research Center",
    department: "Research",
    quota: 1500,
    pagesUsedPercent: 0,
    status: "Inactive",
  },
];

//============Transactions==================

export type TransactionType =
  | "Top-up"
  | "Print Charge"
  | "Refund"
  | "Adjustment";

export type TransactionReviewStatus = "Pending" | "Reviewed";

export type TransactionItem = {
  id: string;
  time: string;
  user: string;
  type: TransactionType;
  description: string;
  amount: number;
  quotaAfter: number;
  reviewStatus: TransactionReviewStatus;
};

export type TransactionSortKey =
  | "time"
  | "user"
  | "type"
  | "description"
  | "amount"
  | "quotaAfter"
  | "reviewStatus";

export type TransactionFilterValue =
  | "all"
  | "top-up"
  | "print-charge"
  | "refund"
  | "adjustment"
  | "reviewed"
  | "pending"
  | "positive"
  | "negative";

export type TransactionBulkAction =
  | "mark-reviewed"
  | "export-selected"
  | "add-note";

export type TransactionTypeMeta = {
  label: string;
  tone: StatusTone;
};

export type TransactionReviewMeta = {
  label: string;
  tone: StatusTone;
};

export const transactionTableColumns: {
  key: TransactionSortKey;
  label: string;
  sortable: boolean;
}[] = [
  { key: "time", label: "Time", sortable: true },
  { key: "user", label: "User", sortable: true },
  { key: "type", label: "Type", sortable: true },
  { key: "description", label: "Description", sortable: true },
  { key: "amount", label: "Amount", sortable: true },
  { key: "quotaAfter", label: "Quota After", sortable: true },
  { key: "reviewStatus", label: "Review", sortable: true },
];

export const transactionTypeSortOrder: Record<TransactionType, number> = {
  "Top-up": 0,
  "Print Charge": 1,
  Refund: 2,
  Adjustment: 3,
};

export const transactionReviewSortOrder: Record<
  TransactionReviewStatus,
  number
> = {
  Pending: 0,
  Reviewed: 1,
};

export const transactionFilterOptions: {
  value: TransactionFilterValue;
  label: string;
}[] = [
  { value: "all", label: "All Types" },
  { value: "top-up", label: "Top-up" },
  { value: "print-charge", label: "Print Charge" },
  { value: "refund", label: "Refund" },
  { value: "adjustment", label: "Adjustment" },
  { value: "reviewed", label: "Reviewed" },
  { value: "pending", label: "Pending Review" },
  { value: "positive", label: "Positive Amount" },
  { value: "negative", label: "Negative Amount" },
];

export const transactionBulkActionOptions: {
  value: TransactionBulkAction;
  label: string;
}[] = [
  { value: "mark-reviewed", label: "Mark as Reviewed" },
  { value: "export-selected", label: "Export Selected" },
  { value: "add-note", label: "Add Internal Note" },
];

export const transactionTypeMeta: Record<TransactionType, TransactionTypeMeta> =
  {
    "Top-up": {
      label: "Top-up",
      tone: "success",
    },
    "Print Charge": {
      label: "Print Charge",
      tone: "danger",
    },
    Refund: {
      label: "Refund",
      tone: "inactive",
    },
    Adjustment: {
      label: "Adjustment",
      tone: "warning",
    },
  };

export const transactionReviewMeta: Record<
  TransactionReviewStatus,
  TransactionReviewMeta
> = {
  Pending: {
    label: "Pending",
    tone: "warning",
  },
  Reviewed: {
    label: "Reviewed",
    tone: "success",
  },
};

export const transactionsData: TransactionItem[] = [
  {
    id: "txn-0001",
    time: "Mar 17, 07:07 PM",
    user: "202300112",
    type: "Top-up",
    description: "Online top-up",
    amount: 50.0,
    quotaAfter: 50.0,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0002",
    time: "Mar 17, 07:10 PM",
    user: "202300112",
    type: "Print Charge",
    description: "Thesis_Final.pdf – 45 pages",
    amount: -4.5,
    quotaAfter: 45.5,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0003",
    time: "Mar 17, 07:12 PM",
    user: "a.almalki",
    type: "Top-up",
    description: "Cash top-up at counter",
    amount: 20.0,
    quotaAfter: 20.0,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0004",
    time: "Mar 17, 07:15 PM",
    user: "a.almalki",
    type: "Print Charge",
    description: "Report.docx – 8 pages",
    amount: -0.8,
    quotaAfter: 19.2,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0005",
    time: "Mar 17, 07:18 PM",
    user: "a.almalki",
    type: "Refund",
    description: "Refund for failed print job",
    amount: 0.8,
    quotaAfter: 20.0,
    reviewStatus: "Pending",
  },
  {
    id: "txn-0006",
    time: "Mar 17, 07:21 PM",
    user: "202300245",
    type: "Top-up",
    description: "Scholarship credit applied",
    amount: 100.0,
    quotaAfter: 100.0,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0007",
    time: "Mar 17, 07:24 PM",
    user: "202300245",
    type: "Print Charge",
    description: "Assignment_3.pdf – 12 pages",
    amount: -1.2,
    quotaAfter: 98.8,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0008",
    time: "Mar 17, 07:28 PM",
    user: "a.alshammari",
    type: "Adjustment",
    description: "Admin manual adjustment",
    amount: -10.0,
    quotaAfter: 35.0,
    reviewStatus: "Pending",
  },
  {
    id: "txn-0009",
    time: "Mar 17, 07:32 PM",
    user: "202301876",
    type: "Top-up",
    description: "Online top-up",
    amount: 30.0,
    quotaAfter: 30.0,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0010",
    time: "Mar 17, 07:35 PM",
    user: "202301876",
    type: "Print Charge",
    description: "CV_Draft.docx – 3 pages",
    amount: -0.3,
    quotaAfter: 29.7,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0011",
    time: "Mar 17, 07:40 PM",
    user: "202300981",
    type: "Top-up",
    description: "Cash top-up at counter",
    amount: 25.0,
    quotaAfter: 25.0,
    reviewStatus: "Reviewed",
  },
  {
    id: "txn-0012",
    time: "Mar 17, 07:44 PM",
    user: "202300981",
    type: "Print Charge",
    description: "Lab_Report.pdf – 25 pages",
    amount: -2.5,
    quotaAfter: 22.5,
    reviewStatus: "Pending",
  },
];

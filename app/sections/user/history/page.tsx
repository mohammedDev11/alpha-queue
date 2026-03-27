import React from "react";
import UserTransactionHistoryTable from "./components/TransactionTypeBadge";
import PageIntro from "@/app/components/shared/page/PageIntro";

const page = () => {
  return (
    <div className="space-y-5">
      <PageIntro
        title="Transaction History"
        description="Review your balance changes, print charges, refunds, and redeemed credits."
      />
      <UserTransactionHistoryTable />
    </div>
  );
};

export default page;

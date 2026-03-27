import React from "react";
import RecentPrintJobsTable from "./components/RecentPrintJobsTable";
import PageIntro from "@/app/components/shared/page/PageIntro";

const page = () => {
  return (
    <div className="space-y-5">
      <PageIntro
        title="Recent Print Jobs"
        description="Review your recent print activity, including status, cost, and document details."
      />{" "}
      <RecentPrintJobsTable />
    </div>
  );
};

export default page;

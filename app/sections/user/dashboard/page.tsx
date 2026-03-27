"use client";

import React from "react";
import UserTopCards from "./components/UserTopCards";
import PageIntro from "@/app/components/shared/page/PageIntro";
import UserDashboardCharts from "./components/UserDashboardCharts";
import UserInformationCard from "./components/UserInformationCard";
import UserQuickActionsCard from "./components/UserQuickActionsCard";

const page = () => {
  return (
    <div className="space-y-5">
      <PageIntro
        title="Dashboard"
        description="Track your balance, print activity, and pending jobs in one place."
      />

      <UserTopCards />

      <UserDashboardCharts />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <UserInformationCard />
        </div>

        <div className="xl:col-span-1">
          <UserQuickActionsCard />
        </div>
      </div>
    </div>
  );
};

export default page;

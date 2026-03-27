import PageIntro from "@/app/components/shared/page/PageIntro";
import React from "react";
import PrintReleaseTable from "./components/PrintReleaseTable";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <PageIntro
        title="Print Release"
        description="Resolve held print jobs and manage secure print releases."
      />
      <PrintReleaseTable />
    </div>
  );
};

export default page;

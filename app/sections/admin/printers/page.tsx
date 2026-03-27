import PageIntro from "@/app/components/shared/page/PageIntro";
import React from "react";
import PrintersGrid from "./components/PrintersGrid";

const page = () => {
  return (
    <div>
      <PageIntro
        title="Printers"
        description="Monitor printer health, status, and activity across all connected devices."
      />
      <PrintersGrid />
    </div>
  );
};

export default page;

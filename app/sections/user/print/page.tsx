import PageIntro from "@/app/components/shared/page/PageIntro";
import React from "react";
import { FileUploadDemo } from "./components/FileUploadDemo";
import SelectPrinterCard from "./components/SelectPrinterCard";

const page = () => {
  return (
    <div className="space-y-5">
      <PageIntro
        title="Web Print"
        description="Upload and print documents from your browser"
      />
      <form action="" className="space-y-5">
        <FileUploadDemo />
        <SelectPrinterCard />
      </form>
    </div>
  );
};

export default page;

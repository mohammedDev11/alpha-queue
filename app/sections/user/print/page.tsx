"use client";

import PageIntro from "@/app/components/shared/page/Text/PageIntro";
import Button from "@/app/components/ui/button/Button";
import { useState } from "react";
import { FileUploadDemo } from "./components/FileUploadDemo";
import PrintJobModal from "./components/PrintJobModal";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [jobName, setJobName] = useState("");
  const [queue, setQueue] = useState("Secure Release");

  const handleConfirmPrint = (options: {
    copies: number;
    color: string;
    duplex: string;
  }) => {
    console.log("Print Job Submitted:", {
      jobName,
      queue,
      ...options,
    });

    setOpenModal(false);
  };

  return (
    <div className="space-y-5">
      <PageIntro
        title="Web Print"
        description="Upload and print documents from your browser"
      />

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setOpenModal(true);
        }}
      >
        <FileUploadDemo />

        <Button
          variant="primary"
          size="lg"
          className="w-full rounded-md py-3 text-sm font-semibold sm:py-3.5 sm:text-base md:py-4"
          type="submit"
        >
          Submit Print Job
        </Button>
      </form>

      <PrintJobModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        jobName={jobName}
        setJobName={setJobName}
        queue={queue}
        setQueue={setQueue}
        onConfirm={handleConfirmPrint}
      />
    </div>
  );
};

export default Page;

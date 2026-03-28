"use client";

import React from "react";
import {
  IconFileTypePdf,
  IconFileTypeDocx,
  IconFileTypeXls,
} from "@tabler/icons-react";
import { HoverFolderBadge } from "@/app/components/ui/badge/HoverFolderBadge";

const Box2 = () => {
  /* ========= TEXT CONFIG ========= */
  const content = {
    title: "Upload & Print Any File",
    description:
      "Easily upload PDF, Word, or Excel files to the secure print queue.",
  };

  /* ========= FILES ========= */
  const files = [
    {
      id: "pdf",
      label: "PDF",
      icon: IconFileTypePdf,
      iconClassName: "text-red-500",
    },
    {
      id: "docx",
      label: "WORD",
      icon: IconFileTypeDocx,
      iconClassName: "text-blue-500",
    },
    {
      id: "xls",
      label: "EXCEL",
      icon: IconFileTypeXls,
      iconClassName: "text-emerald-500",
    },
  ];

  return (
    <div className=" relative flex h-[360px] w-full flex-col items-center justify-between overflow-visible ">
      {/* ===== CENTER (ANIMATION) ===== */}
      <div className="flex flex-1 items-center justify-center">
        <HoverFolderBadge
          text=""
          items={files}
          className="overflow-visible bg-transparent"
          enableTimerPreview={true}
          previewStartDelay={1000}
          previewOpenDuration={1200}
          previewInterval={8000}
          repeatPreview={true}
          folderSize={{ width: 84, height: 62 }}
          teaserCardSize={{ width: 38, height: 26 }}
          hoverCardSize={{ width: 92, height: 64 }}
        />
      </div>

      {/* ===== BOTTOM TEXT ===== */}
      <div className="text-start space-y-2 pb-2">
        <h3 className="title-md">{content.title}</h3>
        <p className="text-sm max-w-md mx-auto">{content.description}</p>
      </div>
    </div>
  );
};

export default Box2;

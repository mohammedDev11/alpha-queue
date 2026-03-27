export type WebPrintPrinterOption = {
  label: string;
  value: string;
};

export const webPrintPrinterOptions: WebPrintPrinterOption[] = [
  { label: "CCM Secure Release Printer", value: "ccm-secure-release-printer" },
  { label: "CCM Ground Floor Printer", value: "ccm-ground-floor-printer" },
  { label: "CCM First Floor Printer", value: "ccm-first-floor-printer" },
  { label: "Faculty Queue Printer", value: "faculty-queue-printer" },
  { label: "Computer Lab Printer", value: "computer-lab-printer" },
  { label: "Library Printing Station", value: "library-printing-station" },
];

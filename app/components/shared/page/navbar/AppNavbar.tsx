"use client";

import DockNavbar from "./DockNavbar";
import SidebarNavbar from "./SidebarNavbar";
import MobileNavbar from "./MobileNavbar";
import NavbarModeSwitcher, { type NavbarMode } from "./NavbarModeSwitcher";
import type { SidebarSection } from "@/Data/Navbar";

type AppNavbarProps = {
  mode: NavbarMode;
  onModeChange: (mode: NavbarMode) => void;
  isSidebarExpanded: boolean;
  onSidebarMouseEnter: () => void;
  onSidebarMouseLeave: () => void;
  sections: SidebarSection[];
};

export default function AppNavbar({
  mode,
  onModeChange,
  isSidebarExpanded,
  onSidebarMouseEnter,
  onSidebarMouseLeave,
  sections,
}: AppNavbarProps) {
  return (
    <>
      {/* Mobile only */}
      <MobileNavbar sections={sections} />

      {/* Desktop / Tablet only */}
      <div className="fixed right-4 top-4 z-[60] hidden md:block">
        <NavbarModeSwitcher value={mode} onChange={onModeChange} />
      </div>

      {mode === "left" && (
        <SidebarNavbar
          sections={sections}
          isExpanded={isSidebarExpanded}
          onMouseEnter={onSidebarMouseEnter}
          onMouseLeave={onSidebarMouseLeave}
        />
      )}

      {mode === "bottom" && (
        <DockNavbar position="bottom" sections={sections} />
      )}
      {mode === "top" && <DockNavbar position="top" sections={sections} />}
    </>
  );
}

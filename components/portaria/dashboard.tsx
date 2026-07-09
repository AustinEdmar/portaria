"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Fab } from "@/components/Fab";
import { CheckinDialogProvider } from "@/components/checkin-dialog-context";
import { ScheduleDialogProvider } from "@/components/schedule-dialog-context";
import { VisitorDetailDialog } from "./visitor-detail-dialog";
import { OverviewTab } from "./tabs/overview-tab";
import { VisitorsTab } from "./tabs/visitors-tab";
import { ScheduleTab } from "./tabs/schedule-tab";
import { HostsTab } from "./tabs/hosts-tab";
import { ReportsTab } from "./tabs/reports-tab";
import { SettingsTab } from "./tabs/settings-tab";
import { ProfileTab } from "./tabs/profile-tab";
import { FONT_IMPORTS, font } from "@/lib/typography";
import type { NavKey, Visitor } from "@/lib/types";

const TODAY = new Intl.DateTimeFormat("pt-PT", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
}).format(new Date());

export default function VisitorControlDashboard() {
  const [active, setActive] = useState<NavKey>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  return (
    <CheckinDialogProvider>
      <ScheduleDialogProvider>
        <div style={{ fontFamily: font.body }} className="min-h-screen bg-[#F5F6F8] flex">
          <style>{FONT_IMPORTS}</style>

          <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

          <div className="flex-1 min-w-0 flex flex-col">
            <Topbar active={active} onOpenMobileMenu={() => setMobileOpen(true)} today={TODAY} />

            <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
              {active === "overview" && <OverviewTab />}
              {active === "visitors" && <VisitorsTab onSelect={setSelectedVisitor} />}
              {active === "schedule" && <ScheduleTab />}
              {active === "hosts" && <HostsTab />}
              {active === "reports" && <ReportsTab />}
              {active === "settings" && <SettingsTab />}
              {active === "profile" && <ProfileTab />}
            </main>
          </div>

          <VisitorDetailDialog visitor={selectedVisitor} onOpenChange={(open) => !open && setSelectedVisitor(null)} />
        </div>

        <Fab />
      </ScheduleDialogProvider>
    </CheckinDialogProvider>
  );
}
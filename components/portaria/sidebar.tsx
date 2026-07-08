"use client";

import {
  LayoutDashboard,
  Users,
  CalendarClock,
  Building2,
  FileBarChart,
  Settings,
  ShieldCheck,
  ChevronRight,
  X,
  LogOut,
  type LucideIcon,
  PersonStanding,
  User2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { font } from "@/lib/typography";
import type { NavKey } from "@/lib/types";


interface NavItem {
  key: NavKey;
  label: string;
  icon: LucideIcon;
}

const NAV: NavItem[] = [
  { key: "overview", label: "Painel", icon: LayoutDashboard },
  { key: "visitors", label: "Visitantes", icon: Users },
  { key: "schedule", label: "Agendamentos", icon: CalendarClock },
  { key: "hosts", label: "Funcionarios", icon: Building2 },
  { key: "reports", label: "Relatórios", icon: FileBarChart },
  { key: "settings", label: "Configurações", icon: Settings },
  { key: "profile", label: "Perfil", icon: User2 },
];

interface SidebarProps {
  active: NavKey;
  setActive: (key: NavKey) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  userName?: string;
  userEmail?: string;
  onSignOut?: () => void;
}

export function Sidebar({
  active,
  setActive,
  mobileOpen,
  setMobileOpen,
  userName = "Receção — Torre A",
  userEmail = "turno@empresa.co.ao",
  onSignOut,
}: SidebarProps) {
  const content = (
    <div className="flex flex-col h-full bg-[#0B1220] text-slate-300 w-64">
      <div className="px-5 py-5 flex items-center gap-2.5 border-b border-white/10">
        <div className="w-8 h-8 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="min-w-0">
          <p style={{ fontFamily: font.display }} className="text-white font-bold text-sm leading-none">
            Portaria+
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Controlo de visitas</p>
        </div>
        <button className="ml-auto md:hidden text-slate-400" onClick={() => setMobileOpen(false)} aria-label="Fechar menu">
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${isActive ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] text-white font-medium" : "hover:bg-white/5 text-slate-300"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-70" />}
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 cursor-pointer border-t border-white/10">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-white/10 text-white text-xs">
              {userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-white truncate">{userName}</p>
            <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
          </div>
          {onSignOut && (
            <button onClick={onSignOut} className="text-slate-500 hover:text-white shrink-0" aria-label="Terminar sessão">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block shrink-0">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full">{content}</div>
        </div>
      )}
    </>
  );
}

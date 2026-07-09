"use client";

import { Bell, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { font, pageTitle } from "@/lib/typography";
import type { NavKey } from "@/lib/types";

import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"




const titleMap: Record<NavKey, string> = {
  overview: "Visão Geral",
  visitors: "Visitantes",
  schedule: "Agendamentos",
  hosts: "Funcionarios",
  security: "Segurança",
  reports: "Relatórios",
  settings: "Configurações",
  profile: "Perfil",
};

const subtitleMap: Record<NavKey, string> = {
  overview: "Resumo do sistema",
  visitors: "Gestão de visitantes",
  schedule: "Agendamentos de visitas",
  hosts: "Gestão de anfitriões",
  security: "Controlo de segurança",
  reports: "Relatórios e estatísticas",
  settings: "Configurações do sistema",
  profile: "Informações da sua conta",
};

interface TopbarProps {
  active: NavKey;
  onOpenMobileMenu: () => void;
  onNewCheckin?: () => void;
  today: string;
}

export function Topbar({ active, onOpenMobileMenu, today }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center gap-3">
      <button className="md:hidden text-slate-500" onClick={onOpenMobileMenu} aria-label="Abrir menu">
        <Menu className="w-5 h-5" />
      </button>

      <div className="min-w-0">
        <h1 style={{ fontFamily: font.display }} className={pageTitle}>
          {titleMap[active]}
        </h1>
        <p className="text-[12px] text-slate-400 mt-0.5 hidden sm:block truncate">
          {subtitleMap[active]} · {today}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        {/*  <div className="relative hidden lg:block">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Procurar em todo o sistema..." className="pl-8 h-9 w-64" />
        </div> */}
        <Button
          variant="ghost"
          size="icon"
          className="
          cursor-pointer
          bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] text-white
          relative rounded-full
          "
        >
          <Bell className="h-5 w-5" />

          <span
            className="absolute -top-1 -right-1 flex h-5 min-w-[20px]
    items-center justify-center rounded-full bg-yellow-500
    px-1 text-[10px] font-bold text-white"
          >
            12
          </span>
        </Button>
        {/*  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-[#1d40cc] gap-2 cursor-pointer" onClick={onNewCheckin}>
          <Plus className="w-4 h-4" /> <span className="hidden sm:inline">Novo Check-in</span>
        </Button> */}
        {/* profile */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" render={<Button variant="ghost" size="icon" className="rounded-full" ><Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar></Button>} />
          <DropdownMenuContent align="end" >
            {/* <DropdownMenuGroup>

              <DropdownMenuItem>
                <BellIcon />
                Notificacoes
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="bg-red-50 text-red-600 hover:bg-red-100 focus:bg-red-100 cursor-pointer">
              <LogOutIcon className="h-4 w-4" />
              <Link href="/login" className="ml-2 font-medium">
                Sair
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

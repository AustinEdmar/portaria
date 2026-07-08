/* ------------------------------------------------------------------ */
/* Tipos partilhados do módulo Portaria+                              */
/* ------------------------------------------------------------------ */

export type VisitorStatus = "No prédio" | "Agendado" | "Atrasado" | "Finalizado";

export interface Visitor {
  id: string;
  name: string;
  doc: string;
  company: string;
  email?: string;
  leftObjects?: string[];
  host: string;
  reason: string;
  checkin: string;
  expected: string;
  status: VisitorStatus;
}

/** Estado parcial usado no formulário de check-in (ainda sem id/estado definidos) */
export type VisitorDraft = Partial<
  Pick<Visitor, "name" | "company" | "leftObjects" | "host" | "reason" | "id">
>;

export type HostStatus = "Disponível" | "Em reunião" | "Fora";

export interface Host {
  id: string;
  name: string;
  department: string;
  extension: string;
  email: string;
  status: HostStatus;
  visitsToday: number;
}

export type NavKey =
  | "overview"
  | "visitors"
  | "schedule"
  | "hosts"
  | "security"
  | "reports"
  | "settings"
  | "profile";

export type NotificationKind = "arrival" | "late" | "schedule" | "system";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export type BlocklistSeverity = "Alerta" | "Bloqueio total";

export interface BlocklistEntry {
  id: string;
  name: string;
  doc: string;
  reason: string;
  severity: BlocklistSeverity;
  addedBy: string;
  addedOn: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  building: string;
  joinedOn: string;
}

export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  detail: string;
  time: string;
}

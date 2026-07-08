import type {
  ActivityLogEntry,
  AppNotification,
  BlocklistEntry,
  Host,
  Session,
  UserProfile,
  Visitor,
} from "./types";

export const VISITORS: Visitor[] = [
  { id: "VS-2201", name: "Marina Cardoso", doc: "12.345.678-9", company: "Bravo Tech", host: "Diego Ferreira", reason: "Reunião comercial", checkin: "08:42", expected: "10:30", status: "No prédio" },
  { id: "VS-2202", name: "Ana Beatriz Souza", doc: "98.765.432-1", company: "Studio Nave", host: "Camila Rocha", reason: "Entrevista", checkin: "09:05", expected: "09:45", status: "No prédio" },
  { id: "VS-2203", name: "Rui Almeida", doc: "45.612.789-0", company: "Logivance", host: "Diego Ferreira", reason: "Entrega técnica", checkin: "07:58", expected: "09:00", status: "Atrasado" },
  { id: "VS-2204", name: "Helena Duarte", doc: "33.221.109-4", company: "—", host: "Paulo Neto", reason: "Manutenção elevador", checkin: "—", expected: "11:00", status: "Agendado" },
  { id: "VS-2205", name: "Tomás Herculano", doc: "77.884.552-3", company: "Kanzu Corp", host: "Camila Rocha", reason: "Auditoria", checkin: "06:40", expected: "08:30", status: "Finalizado" },
  { id: "VS-2206", name: "Beatriz Lima", doc: "20.117.663-8", company: "Vetro Design", host: "Paulo Neto", reason: "Apresentação", checkin: "—", expected: "14:00", status: "Agendado" },
];

export const HOSTS: Host[] = [
  { id: "H-01", name: "Diego Ferreira", department: "Comercial", extension: "1042", email: "diego.ferreira@empresa.co.ao", status: "Em reunião", visitsToday: 2 },
  { id: "H-02", name: "Camila Rocha", department: "Recursos Humanos", extension: "1108", email: "camila.rocha@empresa.co.ao", status: "Disponível", visitsToday: 2 },
  { id: "H-03", name: "Paulo Neto", department: "Facilities", extension: "1220", email: "paulo.neto@empresa.co.ao", status: "Disponível", visitsToday: 2 },
  { id: "H-04", name: "Sara Ventura", department: "Financeiro", extension: "1305", email: "sara.ventura@empresa.co.ao", status: "Fora", visitsToday: 0 },
  { id: "H-05", name: "Miguel Santos", department: "TI", extension: "1417", email: "miguel.santos@empresa.co.ao", status: "Disponível", visitsToday: 1 },
];

/** Ocupação do edifício por hora (para o gráfico do painel geral) */
export const OCCUPANCY_TODAY: { label: string; value: number }[] = [
  4, 6, 9, 12, 15, 11, 8, 13, 17, 14, 10, 6,
].map((value, i) => ({ label: `${8 + i}h`, value }));

/** Entradas por dia da semana (para relatórios) */
export const WEEKLY_VISITS: { label: string; value: number }[] = [
  { label: "Seg", value: 22 },
  { label: "Ter", value: 27 },
  { label: "Qua", value: 24 },
  { label: "Qui", value: 31 },
  { label: "Sex", value: 29 },
  { label: "Sáb", value: 6 },
  { label: "Dom", value: 2 },
];

export const REASON_BREAKDOWN: { label: string; value: number }[] = [
  { label: "Reunião", value: 46 },
  { label: "Entrevista", value: 18 },
  { label: "Entrega", value: 14 },
  { label: "Manutenção", value: 12 },
  { label: "Auditoria", value: 10 },
];

export const NOTIFICATIONS: AppNotification[] = [
  { id: "N-01", kind: "late", title: "Visitante em atraso", description: "Rui Almeida ultrapassou o tempo previsto de saída (09:00).", time: "há 12 min", read: false },
  { id: "N-02", kind: "arrival", title: "Novo check-in", description: "Ana Beatriz Souza chegou para entrevista com Camila Rocha.", time: "há 38 min", read: false },
  { id: "N-03", kind: "schedule", title: "Agendamento confirmado", description: "Beatriz Lima confirmou presença às 14:00 com Paulo Neto.", time: "há 1 h", read: true },
  { id: "N-04", kind: "system", title: "Exportação concluída", description: "O relatório de acessos de junho está pronto para download.", time: "há 3 h", read: true },
];

export const BLOCKLIST: BlocklistEntry[] = [
  { id: "BL-01", name: "Jonas Kiala", doc: "55.109.887-2", reason: "Tentativa de acesso não autorizado a área restrita", severity: "Bloqueio total", addedBy: "Segurança — Torre A", addedOn: "12/05/2026" },
  { id: "BL-02", name: "Empresa Vetrix Lda.", doc: "N/D", reason: "Contrato encerrado — aguardar reautorização do jurídico", severity: "Alerta", addedBy: "Paulo Neto", addedOn: "02/06/2026" },
];

export const CURRENT_USER: UserProfile = {
  name: "Kaylor Neto",
  email: "kaylor.neto@empresa.co.ao",
  phone: "+244 923 456 789",
  role: "Administrador do sistema",
  department: "Receção — Torre A",
  building: "Torre A — Sede Luanda",
  joinedOn: "14/01/2025",
};

export const SESSIONS: Session[] = [
  { id: "S-01", device: "Chrome · Windows", location: "Luanda, Angola", lastActive: "Agora mesmo", current: true },
  { id: "S-02", device: "App Portaria+ · Android", location: "Luanda, Angola", lastActive: "há 2 horas", current: false },
  { id: "S-03", device: "Safari · macOS", location: "Talatona, Luanda", lastActive: "ontem às 18:42", current: false },
];

export const ACTIVITY_LOG: ActivityLogEntry[] = [
  { id: "A-01", action: "Check-in registado", detail: "Ana Beatriz Souza (VS-2202)", time: "hoje, 09:05" },
  { id: "A-02", action: "Relatório exportado", detail: "Relatório de acessos — junho 2026", time: "hoje, 08:20" },
  { id: "A-03", action: "Regra de check-in alterada", detail: "Ativada exigência de foto do documento", time: "ontem, 17:12" },
  { id: "A-04", action: "Sessão iniciada", detail: "Chrome · Windows · Luanda", time: "ontem, 08:01" },
];

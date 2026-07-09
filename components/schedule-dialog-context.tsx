"use client";

import { createContext, useContext, useRef, useState, ReactNode } from "react";
import { NewScheduleDialog, type NewScheduleForm } from "@/components/new-schedule-dialog";

interface ScheduleDialogContextValue {
    openSchedule: (onConfirm?: (form: NewScheduleForm) => void) => void;
    closeSchedule: () => void;
}

const ScheduleDialogContext = createContext<ScheduleDialogContextValue | null>(null);

export function useScheduleDialog() {
    const ctx = useContext(ScheduleDialogContext);
    if (!ctx) {
        throw new Error("useScheduleDialog deve ser usado dentro de ScheduleDialogProvider");
    }
    return ctx;
}

export function ScheduleDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const onConfirmRef = useRef<((form: NewScheduleForm) => void) | undefined>(undefined);

    function openSchedule(onConfirm?: (form: NewScheduleForm) => void) {
        onConfirmRef.current = onConfirm;
        setOpen(true);
    }

    function handleConfirm(form: NewScheduleForm) {
        onConfirmRef.current?.(form);
        // TODO: se quiseres persistir globalmente (API) mesmo sem callback, chama aqui também
    }

    return (
        <ScheduleDialogContext.Provider
            value={{
                openSchedule,
                closeSchedule: () => setOpen(false),
            }}
        >
            {children}
            <NewScheduleDialog open={open} onOpenChange={setOpen} onConfirm={handleConfirm} />
        </ScheduleDialogContext.Provider>
    );
}
// components/checkin-dialog-context.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CheckinDialog } from "../components/portaria/checkin-dialog";

interface CheckinDialogContextValue {
    openCheckin: () => void;
    closeCheckin: () => void;
}

const CheckinDialogContext = createContext<CheckinDialogContextValue | null>(null);

export function useCheckinDialog() {
    const ctx = useContext(CheckinDialogContext);
    if (!ctx) {
        throw new Error("useCheckinDialog deve ser usado dentro de CheckinDialogProvider");
    }
    return ctx;
}

export function CheckinDialogProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <CheckinDialogContext.Provider
            value={{
                openCheckin: () => setOpen(true),
                closeCheckin: () => setOpen(false),
            }}
        >
            {children}
            <CheckinDialog open={open} onOpenChange={setOpen} />
        </CheckinDialogContext.Provider>
    );
}
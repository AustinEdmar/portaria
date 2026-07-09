"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, X, UserPlus, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckinDialog } from "@/components/checkin-dialog-context";
import { useScheduleDialog } from "@/components/schedule-dialog-context";

const STORAGE_KEY = "fab-position";

type Position = { x: number; y: number };

export function Fab() {
    const { openCheckin } = useCheckinDialog();
    const { openSchedule } = useScheduleDialog();

    const [menuOpen, setMenuOpen] = useState(false);
    const [position, setPosition] = useState<Position | null>(null);
    const [dragging, setDragging] = useState(false);

    const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number } | null>(null);
    const movedRef = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setPosition(JSON.parse(saved));
        } else {
            setPosition({ x: window.innerWidth - 80, y: window.innerHeight - 96 });
        }
    }, []);

    const clampPosition = (x: number, y: number): Position => {
        const size = 56;
        const maxX = window.innerWidth - size - 8;
        const maxY = window.innerHeight - size - 8;
        return { x: Math.min(Math.max(8, x), maxX), y: Math.min(Math.max(8, y), maxY) };
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        if (!position) return;
        movedRef.current = false;
        dragStartRef.current = { x: e.clientX, y: e.clientY, posX: position.x, posY: position.y };
        setDragging(true);
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragging || !dragStartRef.current) return;
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
        setPosition(clampPosition(dragStartRef.current.posX + dx, dragStartRef.current.posY + dy));
    };

    const handlePointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        if (position) localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    };

    const handleMainButtonClick = () => {
        if (movedRef.current) {
            movedRef.current = false;
            return;
        }
        setMenuOpen((v) => !v);
    };

    if (!position) return null;

    return (
        <div
            className="fixed z-50 select-none"
            style={{ left: position.x, top: position.y, width: 56, height: 56 }}
        >
            {menuOpen && (
                <div className="absolute bottom-full right-0 mb-3 flex flex-col gap-2 items-end animate-in fade-in slide-in-from-bottom-2">
                    <Button
                        variant="secondary"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 gap-2 shrink-0 shadow-[0_10px_25px_-8px_rgba(14,165,233,0.5)] hover:shadow-[0_14px_30px_-8px_rgba(14,165,233,0.65)] transition-all rounded-full pl-3 pr-4 h-11 whitespace-nowrap text-white cursor-pointer"
                        onClick={() => {
                            openCheckin();
                            setMenuOpen(false);
                        }}
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Novo check-in
                    </Button>
                    <Button
                        variant="secondary"
                        className="
                        bg-gradient-to-r from-emerald-400 to-cyan-400 text-white cursor-pointer
                        rounded-full pl-3 pr-4 h-11 whitespace-nowrap"
                        onClick={() => {
                            openSchedule();
                            setMenuOpen(false);
                        }}
                    >
                        <CalendarPlus className="mr-2 h-4 w-4" />
                        Novo agendamento
                    </Button>
                </div>
            )}

            <Button
                size="icon"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={handleMainButtonClick}
                className={`w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 gap-2 shrink-0 shadow-[0_10px_25px_-8px_rgba(14,165,233,0.5)] hover:shadow-[0_14px_30px_-8px_rgba(14,165,233,0.65)] transition-all ${dragging ? "cursor-grabbing scale-105" : "cursor-grab active:scale-95"
                    }`}
                aria-label="Ações rápidas"
            >
                {menuOpen ? <X size={24} /> : <Plus size={24} />}
            </Button>
        </div>
    );
}
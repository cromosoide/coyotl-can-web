"use client";

import { useEffect, type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}

export default function Modal({ open, onClose, title, children, wide }: ModalProps) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2d0057]/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl ${wide ? "w-full max-w-3xl" : "w-full max-w-lg"}`}>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2d0057]">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-[#555] hover:bg-gray-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

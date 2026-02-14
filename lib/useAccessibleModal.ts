"use client";

import { RefObject, useEffect } from "react";

const FOCUSABLE_SELECTOR =
  "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

export default function useAccessibleModal(
  isOpen: boolean,
  modalRef: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const pageContent = document.getElementById("page-content");

    document.body.style.overflow = "hidden";
    if (pageContent) {
      pageContent.setAttribute("aria-hidden", "true");
      pageContent.setAttribute("inert", "");
    }

    const modal = modalRef.current;
    const focusables = modal
      ? Array.from(modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    const firstFocusable = focusables[0] ?? modal;
    firstFocusable?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modal) return;

      const elements = Array.from(
        modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";

      if (pageContent) {
        pageContent.removeAttribute("aria-hidden");
        pageContent.removeAttribute("inert");
      }

      previouslyFocused?.focus();
    };
  }, [isOpen, modalRef, onClose]);
}

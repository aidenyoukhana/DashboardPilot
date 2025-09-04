import { useEffect } from 'react';

// Extend the Window interface to include botpress
declare global {
  interface Window {
    botpress?: {
      open: () => void;
      close: () => void;
    };
  }
}

type ChatPopperProps = { anchorEl: HTMLElement | null; open: boolean; onClose: () => void };

export default function ChatPopper({ open, onClose }: ChatPopperProps) {
  useEffect(() => {
    if (open && window.botpress) {
      // Open Botpress webchat when our chat should open
      window.botpress.open();
      // Close our custom UI since Botpress takes over
      onClose();
    }
  }, [open, onClose]);

  // We don't render anything since Botpress handles the UI
  return null;
}

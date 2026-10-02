import { useEffect } from 'react';
import { Check } from 'lucide-react';

/** Small confirmation message that disappears after a few seconds. */
export default function Toast({ toast, onDone }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDone, 2800);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  return (
    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">
      {toast && (
        <>
          <span className="toast-icon"><Check size={14} strokeWidth={3} /></span>
          {toast.message}
        </>
      )}
    </div>
  );
}

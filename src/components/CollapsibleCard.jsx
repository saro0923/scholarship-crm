import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * A card whose body is hidden until the header is clicked.
 * Click the header again to close it. `aria-expanded` tells screen readers the state.
 */
export default function CollapsibleCard({ title, subtitle, icon, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <section className={`card collapsible ${open ? 'is-open' : ''}`}>
      <button
        className="collapse-head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={bodyId}
      >
        {icon && <span className="collapse-icon">{icon}</span>}
        <span className="collapse-text">
          <h2>{title}</h2>
          {subtitle && <span className="card-sub">{subtitle}</span>}
        </span>
        <span className="collapse-hint">{open ? 'Hide' : 'Show'}</span>
        <ChevronDown size={18} className="chevron" />
      </button>

      {open && (
        <div className="collapse-body" id={bodyId}>
          {children}
        </div>
      )}
    </section>
  );
}

import { MapPin, ChartColumnStacked } from 'lucide-react';
import { STATES, STATUSES } from '../constants';
import { countByStatus } from '../utils';
import CollapsibleCard from './CollapsibleCard';

/**
 * "Status by state" panel: one stacked bar per state.
 * Collapsed by default; clicking a state row applies the state filter.
 */
export default function StateOverview({ scholarships, activeState, onSelect }) {
  return (
    <CollapsibleCard
      title="Status by state"
      subtitle="Published, draft and expired per state"
      icon={<ChartColumnStacked size={18} />}
    >
      <div className="legend">
        {STATUSES.map((s) => (
          <span key={s}><i className={`dot dot-${s.toLowerCase()}`} />{s}</span>
        ))}
        <span className="legend-tip">Click a state to filter the list</span>
      </div>

      <div className="state-rows">
        {STATES.map((state) => {
          const c = countByStatus(scholarships.filter((s) => s.state === state));
          const active = activeState === state;
          return (
            <button
              key={state}
              className={`state-row ${active ? 'is-active' : ''}`}
              onClick={() => onSelect(active ? 'All' : state)}
              aria-pressed={active}
            >
              <span className="state-name"><MapPin size={15} /> {state}</span>
              <span className="stack" aria-label={`${c.Published} published, ${c.Draft} draft, ${c.Expired} expired`}>
                {STATUSES.map((st) =>
                  c[st] ? (
                    <span
                      key={st}
                      className={`seg seg-${st.toLowerCase()}`}
                      style={{ flexGrow: c[st] }}
                      title={`${st}: ${c[st]}`}
                    >
                      {c[st]}
                    </span>
                  ) : null
                )}
                {c.Total === 0 && <span className="seg seg-empty">No records</span>}
              </span>
              <span className="state-total">{c.Total}</span>
            </button>
          );
        })}
      </div>
    </CollapsibleCard>
  );
}

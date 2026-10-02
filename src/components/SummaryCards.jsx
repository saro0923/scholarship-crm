import { Layers, CircleCheck, FileText, CircleX } from 'lucide-react';

const CARDS = [
  { key: 'Total', label: 'Total Scholarships', filter: 'All', icon: Layers, tone: 'total', note: 'All records' },
  { key: 'Published', label: 'Published', filter: 'Published', icon: CircleCheck, tone: 'published', note: 'Visible to students' },
  { key: 'Draft', label: 'Draft', filter: 'Draft', icon: FileText, tone: 'draft', note: 'Being prepared' },
  { key: 'Expired', label: 'Expired', filter: 'Expired', icon: CircleX, tone: 'expired', note: 'Hidden from students' },
];

/** Four clickable KPI cards. Clicking one applies that status filter to the table. */
export default function SummaryCards({ counts, activeStatus, onSelect }) {
  return (
    <section className="kpis" aria-label="Summary">
      {CARDS.map(({ key, label, filter, icon: Icon, tone, note }) => {
        const pct = counts.Total ? Math.round((counts[key] / counts.Total) * 100) : 0;
        return (
          <button
            key={key}
            className={`kpi tone-${tone} ${activeStatus === filter ? 'is-active' : ''}`}
            onClick={() => onSelect(filter)}
            aria-pressed={activeStatus === filter}
          >
            <div className="kpi-top">
              <span className="kpi-label">{label}</span>
              <span className="kpi-icon"><Icon size={20} /></span>
            </div>
            <span className="kpi-value">{counts[key]}</span>
            <div className="kpi-bar"><span style={{ width: `${key === 'Total' ? 100 : pct}%` }} /></div>
            <span className="kpi-note">{key === 'Total' ? note : `${pct}% · ${note}`}</span>
          </button>
        );
      })}
    </section>
  );
}

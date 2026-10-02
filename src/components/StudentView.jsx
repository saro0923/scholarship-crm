import { GraduationCap } from 'lucide-react';
import { STATES } from '../constants';
import StudentCard from './StudentCard';

/** Public-style listing: only Published scholarships, filtered by state. */
export default function StudentView({ scholarships, stateFilter, onStateChange }) {
  const published = scholarships.filter(
    (s) => s.status === 'Published' && (stateFilter === 'All' || s.state === stateFilter)
  );

  return (
    <main className="content">
      <section className="hero">
        <div>
          <span className="hero-kicker"><GraduationCap size={16} /> For students</span>
          <h2>Find scholarships in your state</h2>
          <p>Only <strong>Published</strong> scholarships appear here. Change a status on the dashboard and it updates instantly.</p>
        </div>
        <div className="chips" role="tablist" aria-label="Filter by state">
          {['All', ...STATES].map((st) => (
            <button
              key={st}
              role="tab"
              aria-selected={stateFilter === st}
              className={`chip ${stateFilter === st ? 'is-active' : ''}`}
              onClick={() => onStateChange(st)}
            >
              {st === 'All' ? 'All states' : st}
            </button>
          ))}
        </div>
      </section>

      {published.length === 0 ? (
        <div className="empty">
          <GraduationCap size={36} strokeWidth={1.5} />
          <strong>No published scholarships{stateFilter !== 'All' ? ` in ${stateFilter}` : ''}</strong>
          <span>Publish one from the dashboard to see it here.</span>
        </div>
      ) : (
        <div className="card-grid">
          {published.map((s) => <StudentCard key={s.id} item={s} />)}
        </div>
      )}
    </main>
  );
}

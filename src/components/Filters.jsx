import { Search } from 'lucide-react';
import { STATES, STATUSES } from '../constants';

/** Table toolbar: state tabs (with counts), status dropdown and search box. */
export default function Filters({
  scholarships, stateFilter, onStateChange, statusFilter, onStatusChange, search, onSearchChange,
}) {
  const countFor = (st) =>
    st === 'All' ? scholarships.length : scholarships.filter((s) => s.state === st).length;

  return (
    <div className="toolbar">
      <div className="tabs" role="tablist" aria-label="Filter by state">
        {['All', ...STATES].map((st) => (
          <button
            key={st}
            role="tab"
            aria-selected={stateFilter === st}
            className={`tab ${stateFilter === st ? 'is-active' : ''}`}
            onClick={() => onStateChange(st)}
          >
            {st === 'All' ? 'All states' : st}
            <span className="tab-count">{countFor(st)}</span>
          </button>
        ))}
      </div>

      <div className="toolbar-right">
        <label className="control">
          <span className="sr-only">Status</span>
          <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="All">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label className="control search">
          <Search size={16} className="control-icon" />
          <span className="sr-only">Search</span>
          <input
            type="search"
            placeholder="Search scholarships…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

import { STATUSES } from '../constants';

/** A dropdown styled as a coloured status pill. Changing it saves immediately. */
export default function StatusSelect({ value, onChange, label }) {
  return (
    <span className={`status-wrap status-${value.toLowerCase()}`}>
      <select
        className="status-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className={`opt-${s.toLowerCase()}`}>{s}</option>
        ))}
      </select>
    </span>
  );
}

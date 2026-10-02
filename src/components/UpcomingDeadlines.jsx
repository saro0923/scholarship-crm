import { CalendarClock } from 'lucide-react';
import { daysLeft, deadlineLabel, formatDate } from '../utils';
import CollapsibleCard from './CollapsibleCard';

/** Next few Published scholarships that are still open, soonest first. Collapsed by default. */
export default function UpcomingDeadlines({ scholarships, onPreview }) {
  const upcoming = scholarships
    .filter((s) => s.status === 'Published' && daysLeft(s.deadline) !== null && daysLeft(s.deadline) >= 0)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 4);

  return (
    <CollapsibleCard
      title="Upcoming deadlines"
      subtitle={`${upcoming.length} published and still open`}
      icon={<CalendarClock size={18} />}
    >
      {upcoming.length === 0 ? (
        <p className="panel-empty">No open published scholarships.</p>
      ) : (
        <ul className="deadlines">
          {upcoming.map((s) => {
            const left = daysLeft(s.deadline);
            return (
              <li key={s.id}>
                <button className="deadline-item" onClick={() => onPreview(s)}>
                  <span className="date-tile">
                    <strong>{formatDate(s.deadline).slice(0, 2)}</strong>
                    <span>{formatDate(s.deadline).slice(3, 6)}</span>
                  </span>
                  <span className="dl-text">
                    <strong>{s.name}</strong>
                    <span>{s.state} · {s.applicableClass}</span>
                  </span>
                  <span className={`pill ${left <= 7 ? 'pill-urgent' : 'pill-ok'}`}>{deadlineLabel(s.deadline)}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </CollapsibleCard>
  );
}

import { Building2, Award, BookOpen, CalendarClock, ExternalLink } from 'lucide-react';
import { formatDate, daysLeft, deadlineLabel } from '../utils';

/** The public, student-facing scholarship card. Used by Preview and Student View. */
export default function StudentCard({ item }) {
  const left = daysLeft(item.deadline);
  const closed = item.status === 'Expired' || (left !== null && left < 0);

  return (
    <article className={`student-card st-${item.state.toLowerCase()}`}>
      <div className="sc-band">
        <div className="sc-tags">
          <span className="sc-tag">{item.state}</span>
          <span className="sc-tag sc-tag-light">{item.applicableClass}</span>
        </div>
        {closed ? (
          <span className="sc-flag sc-flag-closed">Closed</span>
        ) : left !== null ? (
          <span className={`sc-flag ${left <= 7 ? 'sc-flag-urgent' : ''}`}>{deadlineLabel(item.deadline)}</span>
        ) : null}
      </div>

      <div className="sc-body">
        <h3 className="sc-title">{item.name}</h3>
        <p className="sc-provider"><Building2 size={14} /> {item.provider}</p>

        <dl className="sc-details">
          <div>
            <dt><Award size={14} /> Benefit</dt>
            <dd>{item.benefit}</dd>
          </div>
          <div>
            <dt><BookOpen size={14} /> Who can apply</dt>
            <dd>{item.eligibility}</dd>
          </div>
          <div>
            <dt><CalendarClock size={14} /> Last date</dt>
            <dd>{formatDate(item.deadline)}</dd>
          </div>
        </dl>

        <a
          className={`btn btn-apply ${closed ? 'is-disabled' : ''}`}
          href={closed ? undefined : item.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={closed}
        >
          {closed ? 'Applications closed' : <>Apply on official site <ExternalLink size={16} /></>}
        </a>
      </div>
    </article>
  );
}

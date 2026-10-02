import { Eye, Pencil, Inbox } from 'lucide-react';
import StatusSelect from './StatusSelect';
import { formatDate, deadlineLabel, daysLeft } from '../utils';

/**
 * Table on desktop. On small screens the same markup is restyled by CSS
 * into stacked cards (each cell shows its data-label).
 */
export default function ScholarshipTable({ items, onStatusChange, onEdit, onPreview }) {
  if (items.length === 0) {
    return (
      <div className="empty">
        <Inbox size={36} strokeWidth={1.5} />
        <strong>No scholarships found</strong>
        <span>Try a different state, status or search term.</span>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Scholarship</th>
            <th>State</th>
            <th>Class</th>
            <th>Deadline</th>
            <th>Status</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((s) => {
            const left = daysLeft(s.deadline);
            return (
              <tr key={s.id}>
                <td data-label="Scholarship" className="cell-name">
                  <span className={`initial st-${s.state.toLowerCase()}`} aria-hidden="true">
                    {s.state[0]}
                  </span>
                  <span>
                    <span className="name">{s.name}</span>
                    <span className="provider">{s.provider}</span>
                  </span>
                </td>
                <td data-label="State"><span className={`state-chip st-${s.state.toLowerCase()}`}>{s.state}</span></td>
                <td data-label="Class" className="nowrap">{s.applicableClass}</td>
                <td data-label="Deadline">
                  <span className="deadline-cell">
                    <span className={!s.deadline ? 'muted' : ''}>{formatDate(s.deadline)}</span>
                    {s.status === 'Published' && left !== null && (
                      <span className={`mini ${left < 0 ? 'mini-closed' : left <= 7 ? 'mini-urgent' : ''}`}>
                        {deadlineLabel(s.deadline)}
                      </span>
                    )}
                  </span>
                </td>
                <td data-label="Status">
                  <StatusSelect
                    value={s.status}
                    onChange={(status) => onStatusChange(s.id, status)}
                    label={`Status for ${s.name}, ${s.state}`}
                  />
                </td>
                <td data-label="Actions" className="col-actions">
                  <div className="actions">
                    <button className="btn btn-soft" onClick={() => onEdit(s)} aria-label={`Edit ${s.name}`}>
                      <Pencil size={15} /> <span>Edit</span>
                    </button>
                    <button className="btn btn-outline" onClick={() => onPreview(s)} aria-label={`Preview ${s.name}`}>
                      <Eye size={15} /> <span>Preview</span>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

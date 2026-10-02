import { useState } from 'react';
import Modal from './Modal';
import { STATES, STATUSES, CLASSES } from '../constants';
import { validateScholarship } from '../utils';

const EMPTY = {
  name: '', state: '', provider: '', applicableClass: '', eligibility: '',
  benefit: '', deadline: '', link: '', status: 'Draft',
};

/** Add / Edit form. The same component handles both — `initial.id` means edit. */
export default function ScholarshipForm({ initial, onCancel, onSave }) {
  const isEdit = Boolean(initial.id);
  const [values, setValues] = useState({ ...EMPTY, ...initial });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    const next = { ...values, [field]: value };
    setValues(next);
    // After the first submit attempt, re-validate live so errors clear as the user fixes them.
    if (submitted) setErrors(validateScholarship(next));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateScholarship(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first invalid field.
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    );
    onSave(trimmed);
  }

  // Small helper so every field renders label + control + error the same way.
  const field = (name, label, control, hint) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {control}
      {errors[name] ? (
        <span className="error" id={`e-${name}`}>{errors[name]}</span>
      ) : hint ? (
        <span className="hint">{hint}</span>
      ) : null}
    </div>
  );

  const common = (name) => ({
    id: `f-${name}`,
    value: values[name],
    onChange: (e) => update(name, e.target.value),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `e-${name}` : undefined,
  });

  return (
    <Modal
      title={isEdit ? 'Edit Scholarship' : 'Add Scholarship'}
      subtitle={isEdit ? 'Update the details and save your changes' : 'Fields marked * are required'}
      onClose={onCancel}
      wide
    >
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <h3 className="form-section span-2">Basic details</h3>
          <div className="span-2">
            {field('name', 'Scholarship name *',
              <input {...common('name')} placeholder="e.g. Post-Matric Scholarship for SC Students" />)}
          </div>
          {field('state', 'State *',
            <select {...common('state')}>
              <option value="">Select state</option>
              {STATES.map((s) => <option key={s}>{s}</option>)}
            </select>)}
          {field('applicableClass', 'Applicable class *',
            <select {...common('applicableClass')}>
              <option value="">Select class</option>
              {[...new Set([...CLASSES, values.applicableClass].filter(Boolean))].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>)}
          <div className="span-2">
            {field('provider', 'Provider name *',
              <input {...common('provider')} placeholder="e.g. SC & ST Welfare Department, Govt. of Bihar" />)}
          </div>
          <h3 className="form-section span-2">Eligibility &amp; benefit</h3>
          <div className="span-2">
            {field('eligibility', 'Eligibility criteria *',
              <textarea {...common('eligibility')} rows={3} placeholder="Who can apply?" />)}
          </div>
          <div className="span-2">
            {field('benefit', 'Scholarship amount or benefit *',
              <input {...common('benefit')} placeholder="e.g. ₹10,000 per year" />)}
          </div>
          <h3 className="form-section span-2">Application</h3>
          {field('deadline', 'Application deadline',
            <input type="date" {...common('deadline')} />,
            'Leave empty if not stated')}
          {field('status', 'Status *',
            <select {...common('status')}>
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>)}
          <div className="span-2">
            {field('link', 'Official application link *',
              <input type="url" {...common('link')} placeholder="https://" />)}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button type="submit" className="btn btn-primary">{isEdit ? 'Save changes' : 'Add scholarship'}</button>
        </div>
      </form>
    </Modal>
  );
}

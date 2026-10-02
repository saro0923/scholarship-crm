/** Formats an ISO date (YYYY-MM-DD) as "30 Sep 2026". Empty → "Not stated". */
export function formatDate(iso) {
  if (!iso) return 'Not stated';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return 'Not stated';
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

/** Whole days from today until the deadline (negative if passed). null if no deadline. */
export function daysLeft(iso) {
  if (!iso) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(`${iso}T00:00:00`);
  return Math.round((end - today) / 86400000);
}

/** Validates the Add/Edit form. Returns an object of { fieldName: errorMessage }. */
export function validateScholarship(values) {
  const errors = {};
  const required = {
    name: 'Scholarship name',
    state: 'State',
    provider: 'Provider name',
    applicableClass: 'Applicable class',
    eligibility: 'Eligibility criteria',
    benefit: 'Scholarship amount or benefit',
    link: 'Official application link',
    status: 'Status',
  };
  for (const [key, label] of Object.entries(required)) {
    if (!String(values[key] ?? '').trim()) errors[key] = `${label} is required`;
  }
  if (values.name && values.name.trim().length < 5) {
    errors.name = 'Name should be at least 5 characters';
  }
  if (values.link && !errors.link) {
    try {
      const url = new URL(values.link.trim());
      if (!['http:', 'https:'].includes(url.protocol)) throw new Error();
    } catch {
      errors.link = 'Enter a valid URL starting with http:// or https://';
    }
  }
  // A Published scholarship must tell students when to apply by.
  if (values.status === 'Published' && !values.deadline) {
    errors.deadline = 'A deadline is required before publishing';
  }
  return errors;
}

/** Short human label for a deadline: "Closes today", "12 days left", "Closed". */
export function deadlineLabel(iso) {
  const left = daysLeft(iso);
  if (left === null) return null;
  if (left < 0) return 'Closed';
  if (left === 0) return 'Closes today';
  return `${left} day${left === 1 ? '' : 's'} left`;
}

/** Counts records per status. */
export function countByStatus(list) {
  const c = { Total: list.length, Published: 0, Draft: 0, Expired: 0 };
  list.forEach((s) => (c[s.status] += 1));
  return c;
}

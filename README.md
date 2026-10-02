# Scholarship CRM Demo — K12 Hunar

A small frontend demo of a Scholarship Management CRM, built for the K12 Hunar Frontend Developer assessment.
Employees can filter scholarships by state, change their status, add or edit records, and preview how a
scholarship card would look to students.

**Live demo:** _add your Vercel / Netlify / GitHub Pages link here_

## Features

| Requirement | How it works |
|---|---|
| Four summary cards | Total, Published, Draft, Expired, each with an icon, a share-of-total bar and a short note. Counts follow the selected state. Clicking a card filters the table by that status. |
| Filter by Bihar / Haryana / Jharkhand | State tabs (with counts) above the table, **and** the "Status by state" chart: click a state's bar to filter. Extras: status dropdown and search. |
| Records list | Table on desktop with state-coloured badges and a "days left" hint; the same table becomes stacked cards on mobile (pure CSS). |
| Change status | A coloured status pill (green / yellow / red) in every row. Changing it saves immediately and shows a confirmation toast. |
| Add / Edit form | One form component for both, grouped into sections, covering all 9 required fields with validation (see below). |
| Preview | Opens the student-facing card: state and class tags, benefit, eligibility, deadline countdown and an Apply button. Draft/Expired records show a warning, and expired ones disable Apply. |

**Extras**
- **Student View page**: lists only the Published scholarships as students would see them, filtered by state. Publishing or expiring a record on the dashboard updates this page instantly.
- **Upcoming deadlines** panel: the next open Published scholarships, soonest first; click one to preview it.
- **Light / dark theme** toggle, remembered across visits.
- **Responsive layout**: the sidebar becomes a bottom tab bar on phones.

**Validation rules:** required fields; name ≥ 5 characters; application link must be a valid `http(s)` URL;
a scholarship cannot be **Published** without a deadline (deadline can be empty for Draft/Expired, shown as "Not stated").
Errors show under each field, update live after the first submit, and focus moves to the first invalid field.

**Persistence:** changes are saved to the browser's `localStorage`, so a refresh keeps them.
"Reset sample data" restores the original nine records.

## Run locally

Requires Node.js 20.19+ or 22.12+ (check with `node -v`).

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serves the build at http://localhost:4173
```

## Deploy (free)

- **Vercel / Netlify:** import the Git repo — framework "Vite", build command `npm run build`, output folder `dist`.
- **Netlify Drop:** run `npm run build` and drag the `dist` folder onto https://app.netlify.com/drop.

## Project structure

```
src/
├── App.jsx                    # State: records, filters, view, theme, modals. Derived lists via useMemo.
├── constants.js               # States, statuses, class options, storage keys
├── utils.js                   # Date formatting, days-left, status counts, form validation
├── styles.css                 # Design tokens (light + dark), layout, components, responsive rules
├── data/scholarships.json     # The 9 sample records
└── components/
    ├── Sidebar.jsx            # Navigation + theme toggle (bottom tab bar on mobile)
    ├── Topbar.jsx             # Page title, date, Add button
    ├── SummaryCards.jsx       # 4 KPI cards (clickable)
    ├── StateOverview.jsx      # "Status by state" stacked bars (clickable)
    ├── UpcomingDeadlines.jsx  # Next open published deadlines
    ├── Filters.jsx            # State tabs, status select, search
    ├── ScholarshipTable.jsx   # Table / mobile cards
    ├── StatusSelect.jsx       # Coloured inline status dropdown
    ├── ScholarshipForm.jsx    # Add + Edit form with validation
    ├── StudentCard.jsx        # Public scholarship card (shared)
    ├── StudentView.jsx        # Published-only student listing
    ├── PreviewModal.jsx       # Student preview of one record
    ├── Modal.jsx              # Reusable dialog (Esc / backdrop to close)
    └── Toast.jsx              # Save confirmation
```

## How the key parts work

- **State filter:** `App` holds `stateFilter`. `inSelectedState` = records matching it; the summary counts are computed
  from this list, so cards always match the chosen state. Status filter and search are applied on top to get `visible`.
- **Status change:** `StatusSelect` calls `handleStatusChange(id, status)`, which maps over the array and replaces only the
  matching record (immutable update). Counts and filters re-compute automatically because they're derived from state.
- **Form:** `ScholarshipForm` keeps its own `values` and `errors`. On submit it runs `validateScholarship()`; if clean it trims
  values and calls `onSave`. `App` either replaces the record (edit, has `id`) or adds it with a new id (add).
- **Preview:** `PreviewModal` wraps the shared `StudentCard` component, which renders one record as a student would see it and computes days left from the deadline. `StudentView` reuses the same card for every Published record.

## Notes

- Tech: React 18 + Vite, plain CSS (custom design tokens, no CSS framework), lucide-react for icons. No backend, no login — as per the brief.
- The nine records (state, name, class, deadline, status) come from the assessment document. Provider, eligibility,
  benefit and link fields were filled with representative placeholder text for the demo and should be verified
  before real use. Statuses are test values only.

import { useCallback, useEffect, useMemo, useState } from 'react';
import seedData from './data/scholarships.json';
import { STORAGE_KEY, THEME_KEY } from './constants';
import { countByStatus } from './utils';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SummaryCards from './components/SummaryCards';
import StateOverview from './components/StateOverview';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import Filters from './components/Filters';
import ScholarshipTable from './components/ScholarshipTable';
import StudentView from './components/StudentView';
import ScholarshipForm from './components/ScholarshipForm';
import PreviewModal from './components/PreviewModal';
import Toast from './components/Toast';

// Small helpers so a blocked localStorage (private mode etc.) never breaks the app.
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
};

function loadInitialData() {
  const saved = storage.get(STORAGE_KEY);
  if (saved) {
    try { return JSON.parse(saved); } catch { /* fall through */ }
  }
  return seedData;
}

export default function App() {
  // ---- Data + UI state ----
  const [scholarships, setScholarships] = useState(loadInitialData);
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'student'
  const [theme, setTheme] = useState(() => storage.get(THEME_KEY) || 'light');
  const [stateFilter, setStateFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(null); // null = closed, {} = add, record = edit
  const [previewing, setPreviewing] = useState(null);
  const [toast, setToastState] = useState(null); // { message, key }

  const setToast = (message) => setToastState({ message, key: Date.now() });
  const clearToast = useCallback(() => setToastState(null), []);

  // Persist records and theme so a refresh keeps the demo state.
  useEffect(() => storage.set(STORAGE_KEY, JSON.stringify(scholarships)), [scholarships]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    storage.set(THEME_KEY, theme);
  }, [theme]);

  // ---- Derived data (recomputed only when inputs change) ----
  // 1. State filter scopes everything, including the summary cards.
  const inSelectedState = useMemo(
    () => scholarships.filter((s) => stateFilter === 'All' || s.state === stateFilter),
    [scholarships, stateFilter]
  );

  // 2. Status filter + search narrow the visible table rows.
  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return inSelectedState.filter(
      (s) =>
        (statusFilter === 'All' || s.status === statusFilter) &&
        (!q || s.name.toLowerCase().includes(q) || s.provider.toLowerCase().includes(q))
    );
  }, [inSelectedState, statusFilter, search]);

  const counts = useMemo(() => countByStatus(inSelectedState), [inSelectedState]);

  // ---- Actions ----
  function handleStatusChange(id, status) {
    setScholarships((list) => list.map((s) => (s.id === id ? { ...s, status } : s)));
    const item = scholarships.find((s) => s.id === id);
    setToast(`${item.name} (${item.state}) is now ${status}`);
  }

  function handleSave(values) {
    if (values.id) {
      setScholarships((list) => list.map((s) => (s.id === values.id ? values : s)));
      setToast('Scholarship updated');
    } else {
      const id = Math.max(0, ...scholarships.map((s) => s.id)) + 1;
      setScholarships((list) => [{ ...values, id }, ...list]);
      setToast('Scholarship added');
    }
    setEditing(null);
  }

  function handleReset() {
    setScholarships(seedData);
    setStateFilter('All');
    setStatusFilter('All');
    setSearch('');
    setToast('Sample data restored');
  }

  return (
    <div className="shell">
      <Sidebar
        view={view}
        onViewChange={setView}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        publishedCount={scholarships.filter((s) => s.status === 'Published').length}
      />

      <div className="main">
        <Topbar
          view={view}
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
          onAdd={() => setEditing({})}
        />

        {view === 'dashboard' ? (
          <main className="content">
            <SummaryCards counts={counts} activeStatus={statusFilter} onSelect={setStatusFilter} />

            <div className="panels">
              <StateOverview
                scholarships={scholarships}
                activeState={stateFilter}
                onSelect={setStateFilter}
              />
              <UpcomingDeadlines scholarships={scholarships} onPreview={setPreviewing} />
            </div>

            <section className="card table-card">
              <div className="card-head">
                <div>
                  <h2>Scholarships</h2>
                  <p className="card-sub">
                    Showing <strong>{visible.length}</strong> of {scholarships.length}
                    {stateFilter !== 'All' && <> in <strong>{stateFilter}</strong></>}
                  </p>
                </div>
                <button className="link-btn" onClick={handleReset}>Reset sample data</button>
              </div>

              <Filters
                scholarships={scholarships}
                stateFilter={stateFilter}
                onStateChange={setStateFilter}
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
                search={search}
                onSearchChange={setSearch}
              />

              <ScholarshipTable
                items={visible}
                onStatusChange={handleStatusChange}
                onEdit={setEditing}
                onPreview={setPreviewing}
              />
            </section>
          </main>
        ) : (
          <StudentView
            scholarships={scholarships}
            stateFilter={stateFilter}
            onStateChange={setStateFilter}
          />
        )}
      </div>

      {editing && (
        <ScholarshipForm initial={editing} onCancel={() => setEditing(null)} onSave={handleSave} />
      )}
      {previewing && <PreviewModal item={previewing} onClose={() => setPreviewing(null)} />}
      <Toast toast={toast} onDone={clearToast} />
    </div>
  );
}

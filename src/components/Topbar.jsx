import { Plus, Moon, Sun } from 'lucide-react';

const TITLES = {
  dashboard: { title: 'Scholarship Dashboard', sub: 'Manage, publish and preview scholarships across states' },
  student: { title: 'Student View', sub: 'Published scholarships exactly as students will see them' },
};

export default function Topbar({ view, theme, onToggleTheme, onAdd }) {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
  const { title, sub } = TITLES[view];

  return (
    <header className="topbar">
      <div className="tb-text">
        <span className="tb-date">{today}</span>
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="tb-actions">
        <button className="icon-btn tb-theme" onClick={onToggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="btn btn-primary" onClick={onAdd}>
          <Plus size={18} strokeWidth={2.5} /> Add Scholarship
        </button>
      </div>
    </header>
  );
}

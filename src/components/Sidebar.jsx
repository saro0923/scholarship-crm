import { LayoutDashboard, GraduationCap, Moon, Sun } from 'lucide-react';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'student', label: 'Student View', icon: GraduationCap },
];

/**
 * Left navigation on desktop. On mobile the same component becomes a
 * fixed bottom tab bar (see .sidebar styles in styles.css).
 */
export default function Sidebar({ view, onViewChange, theme, onToggleTheme, publishedCount }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <span className="logo" aria-hidden="true">K12</span>
        <div>
          <strong>K12 Hunar</strong>
          <span>Scholarship CRM</span>
        </div>
      </div>

      <nav className="sb-nav" aria-label="Main">
        <span className="sb-label">Menu</span>
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`sb-link ${view === id ? 'is-active' : ''}`}
            onClick={() => onViewChange(id)}
            aria-current={view === id ? 'page' : undefined}
          >
            <Icon size={18} strokeWidth={2} />
            <span>{label}</span>
            {id === 'student' && <span className="sb-badge">{publishedCount}</span>}
          </button>
        ))}
      </nav>

      <div className="sb-foot">
        <button className="sb-theme" onClick={onToggleTheme}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
        <div className="sb-user">
          <span className="avatar" aria-hidden="true">EM</span>
          <div>
            <strong>Employee</strong>
            <span>Scholarship team</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

import { TriangleAlert } from 'lucide-react';
import Modal from './Modal';
import StudentCard from './StudentCard';

/** Shows one scholarship exactly as a student would see it. */
export default function PreviewModal({ item, onClose }) {
  return (
    <Modal title="Student preview" subtitle="How this scholarship appears on the website" onClose={onClose}>
      {item.status !== 'Published' && (
        <p className={`notice notice-${item.status.toLowerCase()}`}>
          <TriangleAlert size={16} />
          <span>
            This scholarship is <strong>{item.status}</strong>
            {item.status === 'Draft'
              ? ' — students will not see it until it is published.'
              : ' — it is hidden from students.'}
          </span>
        </p>
      )}
      <StudentCard item={item} />
    </Modal>
  );
}

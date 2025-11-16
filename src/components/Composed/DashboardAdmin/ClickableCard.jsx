import { Users, Users2, Edit, Trash2, Shield, Eye, SquareKanban, Building2, FileText, Calendar, CheckCircle, TrendingUp, ClipboardList, PieChart, Activity, Database, BarChart3, Download, Upload, Inbox, BookOpen, Mail, Phone, MapPin, ToggleLeft, Archive, Lock, Zap, AlertCircle, Settings, MessageSquare } from 'lucide-react';

const iconMap = {
  Users, Users2, Edit, Trash2, Shield, Eye, SquareKanban, Building2, FileText, Calendar, CheckCircle, TrendingUp, ClipboardList, PieChart, Activity, Database, BarChart3, Download, Upload, Inbox, BookOpen, Mail, Phone, MapPin, ToggleLeft, Archive, Lock, Zap, AlertCircle, Settings, MessageSquare
};

export default function ClickableCard({ iconName, title, description, ...attrs }) {
  const Icon = iconMap[iconName];

  const handleClick = () => {
    const modalType = attrs['data-modal-type'];
    const modalAction = attrs['data-modal-action'];

    if (modalType && modalAction) {
      window.dispatchEvent(new CustomEvent('openModal', {
        detail: { type: modalType, action: modalAction }
      }));
    }
  };

  return (
    <article
      onClick={handleClick}
      style={{
        textAlign: 'center',
        padding: 'var(--spacing-md)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: 'var(--spacing-sm)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--primary-color)',
          transition: `color var(--transition-normal)`
        }}
      >
        {Icon && <Icon size={40} strokeWidth={1.5} />}
      </div>
      <h3
        style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-xs)'
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
          lineHeight: '1.6'
        }}
      >
        {description}
      </p>
    </article>
  );
}

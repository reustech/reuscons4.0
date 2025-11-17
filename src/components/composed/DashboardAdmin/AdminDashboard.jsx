import { useState } from 'react';
import { Users, Users2, Edit, Trash2, Building2, SquareKanban, FileText, Upload, Download, BarChart3, Database, Activity } from 'lucide-react';

// Importar modales
import { CreateUserModal, EditUserModal, DeleteUserModal } from '../../modals/users';
import { CreateProjectModal, EditProjectModal, DeleteProjectModal, ListProjectModal } from '../../modals/projects';
import { CreateKanbanModal, EditKanbanModal, ListKanbanModal } from '../../modals/kanbans';
import { EditFileModal, DeleteFileModal, ListFileModal, UploadFileModal, DownloadFileModal } from '../../modals/files';

// Configuración de secciones y tarjetas
const DASHBOARD_CONFIG = [
  {
    section: 'users',
    title: 'Gestión de Usuarios',
    icon: Users,
    cards: [
      { id: 'users-create', iconName: 'Users2', title: 'Crear Usuario', description: 'Agregar nuevos usuarios al sistema. Asignar roles y permisos iniciales.', modalType: 'user', action: 'create' },
      { id: 'users-list', iconName: 'Users', title: 'Ver Usuarios', description: 'Listar todos los usuarios del sistema. Ver detalles, roles y estados.', modalType: 'user', action: 'list' },
      { id: 'users-edit', iconName: 'Edit', title: 'Editar Usuarios', description: 'Modificar datos de usuarios. Cambiar roles y asignaciones de equipo.', modalType: 'user', action: 'edit' },
      { id: 'users-delete', iconName: 'Trash2', title: 'Eliminar Usuarios', description: 'Remover usuarios del sistema. Gestionar el acceso y datos históricos.', modalType: 'user', action: 'delete' },
    ]
  },
  {
    section: 'projects',
    title: 'Gestión de Proyectos y Obras',
    icon: Building2,
    cards: [
      { id: 'proj-create', iconName: 'Building2', title: 'Crear Proyecto', description: 'Crear nuevo proyecto. Asignar equipos y presupuestos iniciales.', modalType: 'project', action: 'create' },
      { id: 'proj-list', iconName: 'Building2', title: 'Ver Proyectos', description: 'Listar todos los proyectos activos. Ver estados y progreso general.', modalType: 'project', action: 'list' },
      { id: 'proj-edit', iconName: 'Edit', title: 'Editar Proyectos', description: 'Modificar información de proyectos. Actualizar plazos y objetivos.', modalType: 'project', action: 'edit' },
      { id: 'proj-delete', iconName: 'Trash2', title: 'Eliminar Proyectos', description: 'Remover proyectos del sistema. Gestionar datos históricos.', modalType: 'project', action: 'delete' },
    ]
  },
  {
    section: 'kanbans',
    title: 'Gestión de Tareas y Kanban',
    icon: SquareKanban,
    cards: [
      { id: 'kanban-create', iconName: 'SquareKanban', title: 'Crear Tablero', description: 'Crear nuevo tablero Kanban personalizado. Definir columnas y flujos de trabajo.', modalType: 'kanban', action: 'create' },
      { id: 'kanban-list', iconName: 'SquareKanban', title: 'Ver Tableros', description: 'Listar todos los tableros Kanban disponibles. Ver estados y configuración.', modalType: 'kanban', action: 'list' },
      { id: 'kanban-edit', iconName: 'Edit', title: 'Editar Tablero', description: 'Modificar configuración de tableros. Renombrar y reordenar columnas.', modalType: 'kanban', action: 'edit' },
    ]
  },
  {
    section: 'files',
    title: 'Gestión de Archivos',
    icon: FileText,
    cards: [
      { id: 'file-upload', iconName: 'Upload', title: 'Subir Archivo', description: 'Agregar nuevos archivos al servidor. Control de versiones.', modalType: 'file', action: 'upload' },
      { id: 'file-list', iconName: 'FileText', title: 'Ver Archivos', description: 'Listar todos los archivos del sistema. Filtrar por tipo, fecha y usuario.', modalType: 'file', action: 'list' },
      { id: 'file-download', iconName: 'Download', title: 'Descargar Archivos', description: 'Descargar archivos del sistema. Gestionar descargas por usuario.', modalType: 'file', action: 'download' },
      { id: 'file-edit', iconName: 'Edit', title: 'Editar Metadatos', description: 'Modificar información de archivos. Renombrar y reclasificar.', modalType: 'file', action: 'edit' },
      { id: 'file-delete', iconName: 'Trash2', title: 'Eliminar Archivos', description: 'Remover archivos del sistema. Gestionar espacio de almacenamiento.', modalType: 'file', action: 'delete' },
    ]
  }
];

// Mapa de iconos
const iconMap = {
  Users, Users2, Edit, Trash2, Building2, SquareKanban, FileText, Upload, Download, BarChart3, Database, Activity
};

// Componente de tarjeta simplificado
function Card({ iconName, title, description, onClick }) {
  const Icon = iconMap[iconName];

  return (
    <article
      onClick={onClick}
      style={{
        textAlign: 'center',
        padding: 'var(--spacing-md)',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
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
        }}
      >
        {Icon && <Icon size={40} strokeWidth={1.5} />}
      </div>
      <h3
        style={{
          color: 'var(--text-primary)',
          marginBottom: 'var(--spacing-xs)',
          fontSize: '1.1rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
          lineHeight: '1.6',
        }}
      >
        {description}
      </p>
    </article>
  );
}

// Componente principal
export default function AdminDashboard() {
  const [modal, setModal] = useState({ type: null, action: null });

  const closeModal = () => {
    setModal({ type: null, action: null });
  };

  const openModal = (modalType, action) => {
    setModal({ type: modalType, action });
  };

  const renderModal = () => {
    const { type, action } = modal;

    // USER MODALS
    if (type === 'user') {
      switch (action) {
        case 'create':
          return <CreateUserModal onClose={closeModal} />;
        case 'edit':
          return <EditUserModal onClose={closeModal} />;
        case 'delete':
          return <DeleteUserModal onClose={closeModal} />;
        case 'list':
          return <CreateUserModal onClose={closeModal} />;
        default:
          return null;
      }
    }

    // PROJECT MODALS
    if (type === 'project') {
      switch (action) {
        case 'create':
          return <CreateProjectModal onClose={closeModal} onProjectCreated={closeModal} />;
        case 'edit':
          return <EditProjectModal onClose={closeModal} onProjectUpdated={closeModal} />;
        case 'delete':
          return <DeleteProjectModal onClose={closeModal} onProjectDeleted={closeModal} />;
        case 'list':
          return <ListProjectModal onClose={closeModal} />;
        default:
          return null;
      }
    }

    // KANBAN MODALS
    if (type === 'kanban') {
      switch (action) {
        case 'create':
          return <CreateKanbanModal onClose={closeModal} onKanbanCreated={closeModal} />;
        case 'edit':
          return <EditKanbanModal onClose={closeModal} onKanbanUpdated={closeModal} />;
        case 'list':
          return <ListKanbanModal onClose={closeModal} />;
        default:
          return null;
      }
    }

    // FILE MODALS
    if (type === 'file') {
      switch (action) {
        case 'upload':
          return <UploadFileModal onClose={closeModal} onFileUploaded={closeModal} />;
        case 'list':
          return <ListFileModal onClose={closeModal} />;
        case 'download':
          return <DownloadFileModal onClose={closeModal} />;
        case 'edit':
          return <EditFileModal onClose={closeModal} onFileUpdated={closeModal} />;
        case 'delete':
          return <DeleteFileModal onClose={closeModal} onFileDeleted={closeModal} />;
        default:
          return null;
      }
    }

    return null;
  };

  return (
    <>
      {renderModal()}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--spacing-lg)' }}>
        <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1>Panel Administrativo</h1>
        </section>

        {DASHBOARD_CONFIG.map((section) => {
          const SectionIcon = section.icon;
          return (
            <section key={section.section} style={{ marginBottom: '4rem' }}>
              <h2
                style={{
                  marginBottom: '1.5rem',
                  borderBottom: '2px solid var(--primary)',
                  paddingBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.8rem',
                }}
              >
                <SectionIcon size={48} /> {section.title}
              </h2>
              <section
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                }}
              >
                {section.cards.map((card) => (
                  <Card
                    key={card.id}
                    iconName={card.iconName}
                    title={card.title}
                    description={card.description}
                    onClick={() => openModal(card.modalType, card.action)}
                  />
                ))}
              </section>
            </section>
          );
        })}
      </main>
    </>
  );
}

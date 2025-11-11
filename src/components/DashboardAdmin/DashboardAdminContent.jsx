import React, { useState } from 'react';
import {
  CreateUserModal, EditUserModal, DeleteUserModal,
  CreateWorksiteModal, EditWorksiteModal, DeleteWorksiteModal,
  CreateKanbanModal, EditKanbanModal, DeleteKanbanModal,
  CreateColumnModal, EditColumnModal, DeleteColumnModal,
  CreateFileModal, EditFileModal, DeleteFileModal,
  CreateTaskModal, EditTaskModal, DeleteTaskModal
} from '../Modals';

export default function DashboardAdminContent() {
  const [modals, setModals] = useState({
    createUser: false,
    editUser: false,
    deleteUser: false,
    createWorksite: false,
    editWorksite: false,
    deleteWorksite: false,
    createKanban: false,
    editKanban: false,
    deleteKanban: false,
    createColumn: false,
    editColumn: false,
    deleteColumn: false,
    createFile: false,
    editFile: false,
    deleteFile: false,
    createTask: false,
    editTask: false,
    deleteTask: false
  });

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  // Handlers Usuario
  const handleCreateUserSubmit = (formData) => {
    console.log('Nuevo usuario:', formData);
    alert('Usuario creado: ' + formData.username);
    closeModal('createUser');
  };

  const handleEditUserSubmit = (formData) => {
    console.log('Usuario modificado:', formData);
    alert('Usuario modificado: ' + formData.username);
    closeModal('editUser');
  };

  const handleDeleteUserSubmit = (formData) => {
    console.log('Usuario eliminado:', formData);
    alert('Usuario eliminado: ' + formData.id);
    closeModal('deleteUser');
  };

  // Handlers Worksite
  const handleCreateWorksiteSubmit = (formData) => {
    console.log('Nueva obra:', formData);
    alert('Worksite creada: ' + formData.name);
    closeModal('createWorksite');
  };

  const handleEditWorksiteSubmit = (formData) => {
    console.log('Worksite modificada:', formData);
    alert('Worksite modificada: ' + formData.name);
    closeModal('editWorksite');
  };

  const handleDeleteWorksiteSubmit = (formData) => {
    console.log('Worksite eliminada:', formData);
    alert('Worksite eliminada: ' + formData.id);
    closeModal('deleteWorksite');
  };

  // Handlers Kanban
  const handleCreateKanbanSubmit = (formData) => {
    console.log('Nuevo kanban:', formData);
    alert('Kanban creado: ' + formData.name);
    closeModal('createKanban');
  };

  const handleEditKanbanSubmit = (formData) => {
    console.log('Kanban modificado:', formData);
    alert('Kanban modificado: ' + formData.name);
    closeModal('editKanban');
  };

  const handleDeleteKanbanSubmit = (formData) => {
    console.log('Kanban eliminado:', formData);
    alert('Kanban eliminado: ' + formData.id);
    closeModal('deleteKanban');
  };

  // Handlers Columna
  const handleCreateColumnSubmit = (formData) => {
    console.log('Nueva columna:', formData);
    alert('Columna creada: ' + formData.title);
    closeModal('createColumn');
  };

  const handleEditColumnSubmit = (formData) => {
    console.log('Columna modificada:', formData);
    alert('Columna modificada: ' + formData.title);
    closeModal('editColumn');
  };

  const handleDeleteColumnSubmit = (formData) => {
    console.log('Columna eliminada:', formData);
    alert('Columna eliminada: ' + formData.id);
    closeModal('deleteColumn');
  };

  // Handlers Archivo
  const handleCreateFileSubmit = (formData) => {
    console.log('Nuevo archivo:', formData);
    alert('Archivo subido: ' + formData.filename);
    closeModal('createFile');
  };

  const handleEditFileSubmit = (formData) => {
    console.log('Archivo modificado:', formData);
    alert('Archivo modificado: ' + formData.filename);
    closeModal('editFile');
  };

  const handleDeleteFileSubmit = (formData) => {
    console.log('Archivo eliminado:', formData);
    alert('Archivo eliminado: ' + formData.id);
    closeModal('deleteFile');
  };

  // Handlers Tarea
  const handleCreateTaskSubmit = (formData) => {
    console.log('Nueva tarea:', formData);
    alert('Tarea creada: ' + formData.title);
    closeModal('createTask');
  };

  const handleEditTaskSubmit = (formData) => {
    console.log('Tarea modificada:', formData);
    alert('Tarea modificada: ' + formData.title);
    closeModal('editTask');
  };

  const handleDeleteTaskSubmit = (formData) => {
    console.log('Tarea eliminada:', formData);
    alert('Tarea eliminada: ' + formData.id);
    closeModal('deleteTask');
  };

  const styles = `
    .admin-container {
      background: var(--gradient-primary);
      min-height: 100vh;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .admin-header {
      max-width: 1400px;
      margin: 0 auto;
      margin-bottom: 3rem;
    }

    .admin-header h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .admin-header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      margin: 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .action-card {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      cursor: pointer;
    }

    .action-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }

    .action-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .action-card h2 {
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .action-card p {
      color: #9ca3af;
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
      flex-grow: 1;
    }

    .button-group {
      display: flex;
      gap: 0.75rem;
      width: 100%;
      flex-wrap: wrap;
    }

    .action-button {
      flex: 1;
      min-width: 80px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }

    .action-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }

    .action-button:active {
      transform: translateY(0);
    }

    .action-button.secondary {
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }

    .action-button.danger {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
    }

    .action-button.danger:hover {
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
    }

    @media (max-width: 768px) {
      .admin-container {
        padding: 1.5rem;
      }

      .admin-header h1 {
        font-size: 1.75rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .action-card {
        padding: 1.5rem;
      }

      .button-group {
        gap: 0.5rem;
      }

      .action-button {
        font-size: 0.85rem;
        padding: 0.6rem 0.8rem;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="admin-container">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Gestiona usuarios, obras, kanbans, columnas, archivos y tareas</p>
        </div>

        <div className="actions-grid">
          {/* Usuario */}
          <div className="action-card">
            <div className="action-icon">👤</div>
            <h2>Usuario</h2>
            <p>Crea nuevas cuentas de usuario en el sistema</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createUser')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editUser')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteUser')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Worksite */}
          <div className="action-card">
            <div className="action-icon">🏗️</div>
            <h2>Worksite</h2>
            <p>Registra nuevos proyectos de construcción</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createWorksite')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editWorksite')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteWorksite')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Kanban */}
          <div className="action-card">
            <div className="action-icon">📋</div>
            <h2>Kanban</h2>
            <p>Crea nuevos tableros kanban para organizar tareas</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createKanban')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editKanban')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteKanban')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Columna */}
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h2>Columna</h2>
            <p>Crea columnas personalizadas para tus kanbans</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createColumn')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editColumn')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteColumn')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Archivo */}
          <div className="action-card">
            <div className="action-icon">📁</div>
            <h2>Archivo</h2>
            <p>Sube y gestiona archivos del sistema</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createFile')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editFile')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteFile')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Tarea */}
          <div className="action-card">
            <div className="action-icon">✓</div>
            <h2>Tarea</h2>
            <p>Crea y gestiona tareas en tus kanbans</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('createTask')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('editTask')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('deleteTask')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Kanban Board Access */}
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h2>Tablero Kanban</h2>
            <p>Accede al tablero kanban para gestionar todas tus tareas</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => window.location.href = '/Kanban'}
                style={{ flex: 1 }}
              >
                Ir al Kanban
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modales Usuario */}
      <CreateUserModal
        isOpen={modals.createUser}
        onClose={() => closeModal('createUser')}
        onSubmit={handleCreateUserSubmit}
      />

      <EditUserModal
        isOpen={modals.editUser}
        onClose={() => closeModal('editUser')}
        onSubmit={handleEditUserSubmit}
      />

      <DeleteUserModal
        isOpen={modals.deleteUser}
        onClose={() => closeModal('deleteUser')}
        onSubmit={handleDeleteUserSubmit}
      />

      {/* Modales Worksite */}
      <CreateWorksiteModal
        isOpen={modals.createWorksite}
        onClose={() => closeModal('createWorksite')}
        onSubmit={handleCreateWorksiteSubmit}
      />

      <EditWorksiteModal
        isOpen={modals.editWorksite}
        onClose={() => closeModal('editWorksite')}
        onSubmit={handleEditWorksiteSubmit}
      />

      <DeleteWorksiteModal
        isOpen={modals.deleteWorksite}
        onClose={() => closeModal('deleteWorksite')}
        onSubmit={handleDeleteWorksiteSubmit}
      />

      {/* Modales Kanban */}
      <CreateKanbanModal
        isOpen={modals.createKanban}
        onClose={() => closeModal('createKanban')}
        onSubmit={handleCreateKanbanSubmit}
      />

      <EditKanbanModal
        isOpen={modals.editKanban}
        onClose={() => closeModal('editKanban')}
        onSubmit={handleEditKanbanSubmit}
      />

      <DeleteKanbanModal
        isOpen={modals.deleteKanban}
        onClose={() => closeModal('deleteKanban')}
        onSubmit={handleDeleteKanbanSubmit}
      />

      {/* Modales Columna */}
      <CreateColumnModal
        isOpen={modals.createColumn}
        onClose={() => closeModal('createColumn')}
        onSubmit={handleCreateColumnSubmit}
      />

      <EditColumnModal
        isOpen={modals.editColumn}
        onClose={() => closeModal('editColumn')}
        onSubmit={handleEditColumnSubmit}
      />

      <DeleteColumnModal
        isOpen={modals.deleteColumn}
        onClose={() => closeModal('deleteColumn')}
        onSubmit={handleDeleteColumnSubmit}
      />

      {/* Modales Archivo */}
      <CreateFileModal
        isOpen={modals.createFile}
        onClose={() => closeModal('createFile')}
        onSubmit={handleCreateFileSubmit}
      />

      <EditFileModal
        isOpen={modals.editFile}
        onClose={() => closeModal('editFile')}
        onSubmit={handleEditFileSubmit}
      />

      <DeleteFileModal
        isOpen={modals.deleteFile}
        onClose={() => closeModal('deleteFile')}
        onSubmit={handleDeleteFileSubmit}
      />

      {/* Modales Tarea */}
      <CreateTaskModal
        isOpen={modals.createTask}
        onClose={() => closeModal('createTask')}
        onSubmit={handleCreateTaskSubmit}
      />

      <EditTaskModal
        isOpen={modals.editTask}
        onClose={() => closeModal('editTask')}
        onSubmit={handleEditTaskSubmit}
      />

      <DeleteTaskModal
        isOpen={modals.deleteTask}
        onClose={() => closeModal('deleteTask')}
        onSubmit={handleDeleteTaskSubmit}
      />
    </>
  );
}

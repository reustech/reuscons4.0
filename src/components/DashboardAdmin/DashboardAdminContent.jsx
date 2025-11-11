import React, { useState } from 'react';
import {
  CrearUsuarioModal, ModificarUsuarioModal, BorrarUsuarioModal,
  CrearObraModal, ModificarObraModal, BorrarObraModal,
  CrearKanbanModal, ModificarKanbanModal, BorrarKanbanModal,
  CrearColumnaModal, ModificarColumnaModal, BorrarColumnaModal,
  CrearArchivoModal, ModificarArchivoModal, BorrarArchivoModal,
  CrearTareaModal, ModificarTareaModal, BorrarTareaModal
} from '../Modals';

export default function DashboardAdminContent() {
  const [modals, setModals] = useState({
    crearUsuario: false,
    modificarUsuario: false,
    borrarUsuario: false,
    crearObra: false,
    modificarObra: false,
    borrarObra: false,
    crearKanban: false,
    modificarKanban: false,
    borrarKanban: false,
    crearColumna: false,
    modificarColumna: false,
    borrarColumna: false,
    crearArchivo: false,
    modificarArchivo: false,
    borrarArchivo: false,
    crearTarea: false,
    modificarTarea: false,
    borrarTarea: false
  });

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  // Handlers Usuario
  const handleCrearUsuarioSubmit = (formData) => {
    console.log('Nuevo usuario:', formData);
    alert('Usuario creado: ' + formData.username);
    closeModal('crearUsuario');
  };

  const handleModificarUsuarioSubmit = (formData) => {
    console.log('Usuario modificado:', formData);
    alert('Usuario modificado: ' + formData.username);
    closeModal('modificarUsuario');
  };

  const handleBorrarUsuarioSubmit = (formData) => {
    console.log('Usuario eliminado:', formData);
    alert('Usuario eliminado: ' + formData.id);
    closeModal('borrarUsuario');
  };

  // Handlers Obra
  const handleCrearObraSubmit = (formData) => {
    console.log('Nueva obra:', formData);
    alert('Obra creada: ' + formData.name);
    closeModal('crearObra');
  };

  const handleModificarObraSubmit = (formData) => {
    console.log('Obra modificada:', formData);
    alert('Obra modificada: ' + formData.name);
    closeModal('modificarObra');
  };

  const handleBorrarObraSubmit = (formData) => {
    console.log('Obra eliminada:', formData);
    alert('Obra eliminada: ' + formData.id);
    closeModal('borrarObra');
  };

  // Handlers Kanban
  const handleCrearKanbanSubmit = (formData) => {
    console.log('Nuevo kanban:', formData);
    alert('Kanban creado: ' + formData.name);
    closeModal('crearKanban');
  };

  const handleModificarKanbanSubmit = (formData) => {
    console.log('Kanban modificado:', formData);
    alert('Kanban modificado: ' + formData.name);
    closeModal('modificarKanban');
  };

  const handleBorrarKanbanSubmit = (formData) => {
    console.log('Kanban eliminado:', formData);
    alert('Kanban eliminado: ' + formData.id);
    closeModal('borrarKanban');
  };

  // Handlers Columna
  const handleCrearColumnaSubmit = (formData) => {
    console.log('Nueva columna:', formData);
    alert('Columna creada: ' + formData.title);
    closeModal('crearColumna');
  };

  const handleModificarColumnaSubmit = (formData) => {
    console.log('Columna modificada:', formData);
    alert('Columna modificada: ' + formData.title);
    closeModal('modificarColumna');
  };

  const handleBorrarColumnaSubmit = (formData) => {
    console.log('Columna eliminada:', formData);
    alert('Columna eliminada: ' + formData.id);
    closeModal('borrarColumna');
  };

  // Handlers Archivo
  const handleCrearArchivoSubmit = (formData) => {
    console.log('Nuevo archivo:', formData);
    alert('Archivo subido: ' + formData.filename);
    closeModal('crearArchivo');
  };

  const handleModificarArchivoSubmit = (formData) => {
    console.log('Archivo modificado:', formData);
    alert('Archivo modificado: ' + formData.filename);
    closeModal('modificarArchivo');
  };

  const handleBorrarArchivoSubmit = (formData) => {
    console.log('Archivo eliminado:', formData);
    alert('Archivo eliminado: ' + formData.id);
    closeModal('borrarArchivo');
  };

  // Handlers Tarea
  const handleCrearTareaSubmit = (formData) => {
    console.log('Nueva tarea:', formData);
    alert('Tarea creada: ' + formData.title);
    closeModal('crearTarea');
  };

  const handleModificarTareaSubmit = (formData) => {
    console.log('Tarea modificada:', formData);
    alert('Tarea modificada: ' + formData.title);
    closeModal('modificarTarea');
  };

  const handleBorrarTareaSubmit = (formData) => {
    console.log('Tarea eliminada:', formData);
    alert('Tarea eliminada: ' + formData.id);
    closeModal('borrarTarea');
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
                onClick={() => openModal('crearUsuario')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarUsuario')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarUsuario')}
              >
                Borrar
              </button>
            </div>
          </div>

          {/* Obra */}
          <div className="action-card">
            <div className="action-icon">🏗️</div>
            <h2>Obra</h2>
            <p>Registra nuevos proyectos de construcción</p>
            <div className="button-group">
              <button
                className="action-button"
                onClick={() => openModal('crearObra')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarObra')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarObra')}
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
                onClick={() => openModal('crearKanban')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarKanban')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarKanban')}
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
                onClick={() => openModal('crearColumna')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarColumna')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarColumna')}
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
                onClick={() => openModal('crearArchivo')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarArchivo')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarArchivo')}
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
                onClick={() => openModal('crearTarea')}
              >
                Crear
              </button>
              <button
                className="action-button secondary"
                onClick={() => openModal('modificarTarea')}
              >
                Modificar
              </button>
              <button
                className="action-button danger"
                onClick={() => openModal('borrarTarea')}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modales Usuario */}
      <CrearUsuarioModal
        isOpen={modals.crearUsuario}
        onClose={() => closeModal('crearUsuario')}
        onSubmit={handleCrearUsuarioSubmit}
      />

      <ModificarUsuarioModal
        isOpen={modals.modificarUsuario}
        onClose={() => closeModal('modificarUsuario')}
        onSubmit={handleModificarUsuarioSubmit}
      />

      <BorrarUsuarioModal
        isOpen={modals.borrarUsuario}
        onClose={() => closeModal('borrarUsuario')}
        onSubmit={handleBorrarUsuarioSubmit}
      />

      {/* Modales Obra */}
      <CrearObraModal
        isOpen={modals.crearObra}
        onClose={() => closeModal('crearObra')}
        onSubmit={handleCrearObraSubmit}
      />

      <ModificarObraModal
        isOpen={modals.modificarObra}
        onClose={() => closeModal('modificarObra')}
        onSubmit={handleModificarObraSubmit}
      />

      <BorrarObraModal
        isOpen={modals.borrarObra}
        onClose={() => closeModal('borrarObra')}
        onSubmit={handleBorrarObraSubmit}
      />

      {/* Modales Kanban */}
      <CrearKanbanModal
        isOpen={modals.crearKanban}
        onClose={() => closeModal('crearKanban')}
        onSubmit={handleCrearKanbanSubmit}
      />

      <ModificarKanbanModal
        isOpen={modals.modificarKanban}
        onClose={() => closeModal('modificarKanban')}
        onSubmit={handleModificarKanbanSubmit}
      />

      <BorrarKanbanModal
        isOpen={modals.borrarKanban}
        onClose={() => closeModal('borrarKanban')}
        onSubmit={handleBorrarKanbanSubmit}
      />

      {/* Modales Columna */}
      <CrearColumnaModal
        isOpen={modals.crearColumna}
        onClose={() => closeModal('crearColumna')}
        onSubmit={handleCrearColumnaSubmit}
      />

      <ModificarColumnaModal
        isOpen={modals.modificarColumna}
        onClose={() => closeModal('modificarColumna')}
        onSubmit={handleModificarColumnaSubmit}
      />

      <BorrarColumnaModal
        isOpen={modals.borrarColumna}
        onClose={() => closeModal('borrarColumna')}
        onSubmit={handleBorrarColumnaSubmit}
      />

      {/* Modales Archivo */}
      <CrearArchivoModal
        isOpen={modals.crearArchivo}
        onClose={() => closeModal('crearArchivo')}
        onSubmit={handleCrearArchivoSubmit}
      />

      <ModificarArchivoModal
        isOpen={modals.modificarArchivo}
        onClose={() => closeModal('modificarArchivo')}
        onSubmit={handleModificarArchivoSubmit}
      />

      <BorrarArchivoModal
        isOpen={modals.borrarArchivo}
        onClose={() => closeModal('borrarArchivo')}
        onSubmit={handleBorrarArchivoSubmit}
      />

      {/* Modales Tarea */}
      <CrearTareaModal
        isOpen={modals.crearTarea}
        onClose={() => closeModal('crearTarea')}
        onSubmit={handleCrearTareaSubmit}
      />

      <ModificarTareaModal
        isOpen={modals.modificarTarea}
        onClose={() => closeModal('modificarTarea')}
        onSubmit={handleModificarTareaSubmit}
      />

      <BorrarTareaModal
        isOpen={modals.borrarTarea}
        onClose={() => closeModal('borrarTarea')}
        onSubmit={handleBorrarTareaSubmit}
      />
    </>
  );
}

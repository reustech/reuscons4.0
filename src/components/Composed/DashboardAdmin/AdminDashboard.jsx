import { useState, useEffect } from 'react';
import { CreateUserModal, EditUserModal, DeleteUserModal } from '../../modals/users';
import { CreateProjectModal, EditProjectModal, DeleteProjectModal, ListProjectModal } from '../../modals/projects';
import { CreateKanbanModal, EditKanbanModal, ListKanbanModal } from '../../modals/kanbans';
import { EditFileModal, DeleteFileModal, ListFileModal, UploadFileModal, DownloadFileModal } from '../../modals/files';

export default function AdminDashboard() {
  const [modalState, setModalState] = useState({ type: null, action: null });

  // Escuchar eventos de abrir modal genéricos
  useEffect(() => {
    const handleOpenModal = (event) => {
      const { type, action } = event.detail;
      setModalState({ type, action });
    };

    // Escuchar ambos eventos para compatibilidad
    window.addEventListener('openModal', handleOpenModal);
    window.addEventListener('openUserModal', (event) => {
      const { type } = event.detail;
      setModalState({ type: 'user', action: type });
    });

    return () => {
      window.removeEventListener('openModal', handleOpenModal);
      window.removeEventListener('openUserModal', handleOpenModal);
    };
  }, []);

  const closeModal = () => {
    setModalState({ type: null, action: null });
  };

  const handleSuccess = () => {
    closeModal();
  };

  return (
    <>
      {/* USER MODALS */}
      {modalState.type === 'user' && modalState.action === 'create' && (
        <CreateUserModal onClose={closeModal} />
      )}
      {modalState.type === 'user' && modalState.action === 'edit' && (
        <EditUserModal onClose={closeModal} />
      )}
      {modalState.type === 'user' && modalState.action === 'delete' && (
        <DeleteUserModal onClose={closeModal} />
      )}
      {modalState.type === 'user' && modalState.action === 'list' && (
        <CreateUserModal onClose={closeModal} />
      )}

      {/* PROJECT MODALS */}
      {modalState.type === 'project' && modalState.action === 'list' && (
        <ListProjectModal onClose={closeModal} />
      )}
      {modalState.type === 'project' && modalState.action === 'create' && (
        <CreateProjectModal onClose={closeModal} onProjectCreated={handleSuccess} />
      )}
      {modalState.type === 'project' && modalState.action === 'edit' && (
        <EditProjectModal onClose={closeModal} onProjectUpdated={handleSuccess} />
      )}
      {modalState.type === 'project' && modalState.action === 'delete' && (
        <DeleteProjectModal onClose={closeModal} onProjectDeleted={handleSuccess} />
      )}

      {/* KANBAN MODALS */}
      {modalState.type === 'kanban' && modalState.action === 'list' && (
        <ListKanbanModal onClose={closeModal} />
      )}
      {modalState.type === 'kanban' && modalState.action === 'create' && (
        <CreateKanbanModal onClose={closeModal} onKanbanCreated={handleSuccess} />
      )}
      {modalState.type === 'kanban' && modalState.action === 'edit' && (
        <EditKanbanModal onClose={closeModal} onKanbanUpdated={handleSuccess} />
      )}

      {/* FILE MODALS */}
      {modalState.type === 'file' && modalState.action === 'list' && (
        <ListFileModal onClose={closeModal} />
      )}
      {modalState.type === 'file' && modalState.action === 'upload' && (
        <UploadFileModal onClose={closeModal} onFileUploaded={handleSuccess} />
      )}
      {modalState.type === 'file' && modalState.action === 'download' && (
        <DownloadFileModal onClose={closeModal} />
      )}
      {modalState.type === 'file' && modalState.action === 'edit' && (
        <EditFileModal onClose={closeModal} onFileUpdated={handleSuccess} />
      )}
      {modalState.type === 'file' && modalState.action === 'delete' && (
        <DeleteFileModal onClose={closeModal} onFileDeleted={handleSuccess} />
      )}
    </>
  );
}

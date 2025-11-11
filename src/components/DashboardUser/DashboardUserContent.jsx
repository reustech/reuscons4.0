import React from 'react';

export default function DashboardUserContent() {
  const styles = `
    .dashboard-container {
      background: var(--gradient-primary);
      min-height: 100vh;
      padding: 2rem;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .dashboard-header {
      max-width: 1400px;
      margin: 0 auto;
      margin-bottom: 3rem;
    }

    .dashboard-header h1 {
      color: white;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }

    .dashboard-header p {
      color: rgba(255, 255, 255, 0.9);
      font-size: 1rem;
      margin: 0;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .action-card h2 {
      color: #1f2937;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .action-card p {
      color: #9ca3af;
      font-size: 1rem;
      margin-bottom: 1.5rem;
      flex-grow: 1;
      line-height: 1.6;
    }

    .action-button {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-size: 1rem;
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

    .stats-section {
      max-width: 1400px;
      margin: 3rem auto 0;
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    .stats-section h3 {
      color: #1f2937;
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    }

    .stat-item {
      text-align: center;
      padding: 1.5rem;
      background: var(--gradient-light);
      border-radius: 12px;
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: var(--color-primary-light);
      margin-bottom: 0.5rem;
    }

    .stat-label {
      color: #6b7280;
      font-size: 0.95rem;
      font-weight: 500;
    }

    @media (max-width: 768px) {
      .dashboard-container {
        padding: 1.5rem;
      }

      .dashboard-header h1 {
        font-size: 1.75rem;
      }

      .actions-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .action-card {
        padding: 1.5rem;
      }

      .action-icon {
        font-size: 3rem;
      }

      .stats-section {
        margin-top: 2rem;
        padding: 1.5rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Mi Dashboard</h1>
          <p>Acceso rápido a tus herramientas de trabajo</p>
        </div>

        <div className="actions-grid">
          {/* Kanban Board */}
          <div className="action-card">
            <div className="action-icon">📊</div>
            <h2>Tablero Kanban</h2>
            <p>Visualiza y gestiona todas tus tareas en un tablero interactivo</p>
            <button
              className="action-button"
              onClick={() => window.location.href = '/Kanban'}
            >
              Abrir Kanban
            </button>
          </div>

          {/* Archivos */}
          <div className="action-card">
            <div className="action-icon">📁</div>
            <h2>Gestor de Archivos</h2>
            <p>Sube, descarga y gestiona todos tus archivos</p>
            <button
              className="action-button"
              onClick={() => window.location.href = '/Archivos'}
            >
              Ir a Archivos
            </button>
          </div>

          {/* Tareas Pendientes */}
          <div className="action-card">
            <div className="action-icon">✓</div>
            <h2>Mis Tareas</h2>
            <p>Visualiza todas las tareas asignadas a ti</p>
            <button
              className="action-button"
              onClick={() => window.location.href = '/Kanban'}
            >
              Ver Tareas
            </button>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="stats-section">
          <h3>📈 Resumen de Actividad</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Tareas Pendientes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Tareas en Progreso</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">Tareas Completadas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24</div>
              <div className="stat-label">Archivos Subidos</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

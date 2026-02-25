import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, ClipboardList } from 'lucide-react';
import './VolunteerDashboard.css';
import springconfig from '../api/api';

const statusLabel = {
  OPEN: { text: 'Open', cls: 'status-pending' },
  ACCEPTED: { text: 'Accepted', cls: 'status-pending' },
  IN_PROGRESS: { text: 'In Progress', cls: 'status-inprogress' },
  CLOSED: { text: 'Closed', cls: 'status-completed' },
};

const VolunteerDashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await springconfig.get('/volunteer/tasks');
      console.log("Volunteer tasks response:", response.data);
      if (response.data) {
        setCurrentTasks(response.data.current || []);
        setCompletedTasks(response.data.completed || []);
        if (response.data.active !== undefined) {
          setIsActive(response.data.active);
        }
      }
    } catch (error) {
      console.error("Error fetching volunteer tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial tasks
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleToggleActive = async () => {
    const newStatus = !isActive;
    setIsActive(newStatus); // Optimistic UI update
    try {
      await springconfig.put('/volunteer/active', { active: newStatus });
      await fetchDashboardData(); // Refresh tasks
    } catch (error) {
      console.error("Failed to update active status:", error);
      alert("Failed to update status: " + (error.response?.data?.message || error.message));
      setIsActive(!newStatus); // Revert on failure
    }
  };

  const handleAcceptTask = async (taskId) => {
    try {
      await springconfig.post(`/volunteer/tasks/${taskId}/accept`);
      alert("Task accepted successfully!");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to accept task:", error);
      alert("Error accepting task.");
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      await springconfig.post(`/volunteer/tasks/${taskId}/complete`);
      alert("Task marked as completed!");
      fetchDashboardData();
    } catch (error) {
      console.error("Failed to complete task:", error);
      alert("Error completing task.");
    }
  };

  return (
    <div className="vol-dash-container">
      {/* ── Header ── */}
      <div className="vol-dash-header">
        <div>
          <h1>Volunteer Dashboard</h1>
          <p>Manage your availability and track your responsibilities</p>
        </div>

        {/* Active / Inactive toggle button */}
        <button
          id="volunteer-status-toggle"
          className={`vol-status-btn ${isActive ? 'active' : 'inactive'}`}
          onClick={handleToggleActive}
        >
          <span className="vol-status-dot" />
          {isActive ? 'Active' : 'Inactive'}
        </button>
      </div>

      {loading ? (
        <div className="vol-empty">Loading dashboard...</div>
      ) : (
        <>
          {/* ── Current Responsibilities ── */}
          <div className="vol-section">
            <div className="vol-section-title">
              <ClipboardList size={20} />
              <h2>Current Responsibilities</h2>
            </div>

            {currentTasks.length === 0 ? (
              <div className="vol-empty">No current responsibilities assigned.</div>
            ) : (
              <div className="vol-task-list">
                {currentTasks.map(task => (
                  <div key={task.id} className="vol-task-card">
                    <div className="vol-task-main">
                      <h3>{task.title || `Responsibility #${task.id}`}</h3>
                      <p className="vol-task-location">📍 {task.location || 'Location not specified'}</p>
                    </div>
                    <div className="vol-task-meta">
                      {task.deadline && (
                        <div className="vol-meta-item">
                          <Clock size={14} />
                          <span>Deadline: {new Date(task.deadline).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="vol-task-actions">
                        <span className={`vol-status-badge ${statusLabel[task.status]?.cls || 'status-pending'}`}>
                          {statusLabel[task.status]?.text || task.status}
                        </span>
                        {task.status === 'OPEN' && (
                          <button
                            className="vol-action-btn accept"
                            onClick={() => handleAcceptTask(task.id)}
                          >
                            Accept Task
                          </button>
                        )}
                        {(task.status === 'ACCEPTED' || task.status === 'IN_PROGRESS') && (
                          <button
                            className="vol-action-btn complete"
                            onClick={() => handleCompleteTask(task.id)}
                          >
                            Mark Completed
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Completed Responsibilities ── */}
          <div className="vol-section">
            <div className="vol-section-title">
              <CheckCircle size={20} />
              <h2>Completed Responsibilities</h2>
            </div>

            {completedTasks.length === 0 ? (
              <div className="vol-empty">No completed responsibilities yet.</div>
            ) : (
              <div className="vol-task-list">
                {completedTasks.map(task => (
                  <div key={task.id} className="vol-task-card completed">
                    <div className="vol-task-main">
                      <h3>{task.title || `Responsibility #${task.id}`}</h3>
                      <p className="vol-task-location">📍 {task.location || 'Location not specified'}</p>
                    </div>
                    <div className="vol-task-meta">
                      <div className="vol-meta-item">
                        <CheckCircle size={14} />
                        <span>Completed: {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'N/A'}</span>
                      </div>
                      <span className="vol-status-badge status-completed">Done</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default VolunteerDashboard;
import React from 'react'
import { DollarSign, Calendar, TrendingUp } from 'lucide-react'
import './Salespage.css'

const Salespage = () => {
  // Mock data for the chart
  const weeklyData = [
    { day: 'Mon', value: 420 },
    { day: 'Tue', value: 580 },
    { day: 'Wed', value: 490 },
    { day: 'Thu', value: 650 },
    { day: 'Fri', value: 720 },
    { day: 'Sat', value: 560 },
  ];

  const maxVal = Math.max(...weeklyData.map(d => d.value));

  return (
    <div className="sales-container">
      <div className="sales-header">
        <h1>Sales Analytics</h1>
        <p>Track your revenue and sales performance</p>
      </div>

      <div className="stats-grid">
        {/* Weekly Revenue */}
        <div className="stat-card">
          <div className="stat-icon-wrapper green">
            <DollarSign size={20} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Weekly Revenue</p>
            <h2 className="stat-value">$3420</h2>
            <p className="stat-trend positive">
              <TrendingUp size={14} />
              +12% from last week
            </p>
          </div>
        </div>

        {/* Monthly Revenue */}
        <div className="stat-card">
          <div className="stat-icon-wrapper blue">
            <Calendar size={20} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Monthly Revenue</p>
            <h2 className="stat-value">$14680</h2>
            <p className="stat-trend positive">
              <TrendingUp size={14} />
              +8% from last month
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="stat-card">
          <div className="stat-icon-wrapper yellow">
            <TrendingUp size={20} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <h2 className="stat-value">$3420</h2>
            <p className="stat-trend neutral">
              Last 6 days
            </p>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Daily Revenue Breakdown</h3>

        <div className="chart-container">
          {/* Y-axis grid lines (simplified visual representation) */}
          <div className="chart-grid-lines">
            <span>800</span>
            <span>600</span>
            <span>400</span>
            <span>200</span>
            <span>0</span>
          </div>

          <div className="bars-container">
            {weeklyData.map((data, index) => (
              <div key={index} className="bar-wrapper">
                <div
                  className="bar"
                  style={{ height: `${(data.value / 800) * 100}%` }}
                  title={`$${data.value}`}
                ></div>
                <span className="bar-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Salespage
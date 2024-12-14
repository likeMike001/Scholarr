import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./card.component.css";

const Card = ({ author }) => {
  const topPublications = author.publications
    .sort((a, b) => b.citations - a.citations)
    .slice(0, 10)
    .map((pub) => ({
      title: pub.title.length > 25 ? `${pub.title.slice(0, 22)}...` : pub.title,
      fullTitle: pub.title,
      citations: pub.citations,
    }));

  const renderCustomTooltip = (data) => {
    if (data.active && data.payload && data.payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{data.payload[0].payload.fullTitle}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="scholar-card">
      {/* Header Section */}
      <div className="card-header">
        <h3 className="author-name">{author.name}</h3>
        <p className="author-affiliation">{author.affiliation}</p>
      </div>

      {/* Statistics Section */}
      <div className="card-statistics">
        <div className="stat-item">
          <span className="stat-label">Citations</span>
          <span className="stat-value">{author.citations}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Interests</span>
          <ul className="interests-list">
            {author.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="chart-container">
        <h4>Top 10 Publications by Citations</h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={topPublications}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 150, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              type="category"
              dataKey="title"
              width={150}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={renderCustomTooltip} />
            <Bar
              dataKey="citations"
              fill="url(#colorUv)"
              radius={[5, 5, 0, 0]}
              animationDuration={800}
            >
              {topPublications.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgba(0, 123, 255, ${1 - index * 0.08})`}
                />
              ))}
            </Bar>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#007bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#007bff" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Card;

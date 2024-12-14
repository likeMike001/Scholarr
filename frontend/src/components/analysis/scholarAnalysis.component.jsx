import React, { useState } from "react";
import "./scholarAnalysis.component.css";

const ScholarAnalysis = ({ analysis }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const paragraphs = analysis.split("\n").filter((para) => para.trim() !== "");

  return (
    <div className="analysis-card">
      <h3>Analysis</h3>
      <div className={`analysis-text ${expanded ? "expanded" : "collapsed"}`}>
        {paragraphs.map((para, index) => (
          <p key={index} className="analysis-paragraph">
            {para}
          </p>
        ))}
      </div>
      <button className="expand-button" onClick={toggleExpand}>
        {expanded ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ScholarAnalysis;


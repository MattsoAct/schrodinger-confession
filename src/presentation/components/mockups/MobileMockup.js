import React from 'react';
import './MobileMockup.css';

const MobileMockup = ({ children, title = "SchRo" }) => {
  return (
    <div className="mobile-mockup">
      <div className="mobile-mockup-frame">
        {/* Status Bar */}
        <div className="mobile-status-bar">
          <div className="status-left">
            <span className="carrier">SKT</span>
            <span className="time">1:58</span>
          </div>
          <div className="status-right">
            <div className="signal-bars">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <span className="battery">54</span>
          </div>
        </div>
        
        {/* Screen Content */}
        <div className="mobile-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileMockup;
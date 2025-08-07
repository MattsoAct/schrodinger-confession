import React from 'react';
import './ContentOnlyMockup.css';

const ContentOnlyMockup = ({ children, title = "SchRo" }) => {
  return (
    <div className="content-only-mockup">
      <div className="content-only-frame">
        {children}
      </div>
    </div>
  );
};

export default ContentOnlyMockup;
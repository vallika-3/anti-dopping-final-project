import React from 'react';
import MedicalTestReports from './MedicalTestReports';
import BiologicalPassportRecords from './BiologicalPassportRecords';
import Performance from './Performance'; // Import the Performance component
import WhistleBlowerReports from '../analystdashboard/WhistleBlowerReports';


const RightPanel = ({ selectedSection, athleteId }) => {
  const sectionContent = {
    "Medical Test Reports": <MedicalTestReports athleteId={athleteId} />,
    "Biological Passport Records": <BiologicalPassportRecords athleteId={athleteId} />,
    "Performance": <Performance athleteId={athleteId} />,
    "Whistle Blower Reports": <WhistleBlowerReports athleteId={athleteId}/>,
     // Add Performance section
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', borderRadius: '10px' }}>
      <div style={tabContentStyle}>
        {sectionContent[selectedSection] || <p>Please select a section from the menu.</p>}
      </div>
    </div>
  );
};

const tabContentStyle = {
  marginTop: '20px',
};

export default RightPanel;
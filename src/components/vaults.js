import React from 'react';

export default ({ vaults }) => {
  return (
    <div id="vaults">
      {!vaults.length ? (
        <div className="empty-state">
          <h3>Click to add Vaults ☝</h3>
        </div>
      ) : (
        <div>VAULTS!!!</div>
      )}
    </div>
  );
};

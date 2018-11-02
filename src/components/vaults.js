import React from 'react';
import { List, SimpleListItem } from '@rmwc/list';

import '@material/list/dist/mdc.list.css';

export default ({ vaults, onVaultSelected }) => {
  return (
    <div id="vaults">
      {!vaults.length ? (
        <div className="empty-state">
          <h3>Click to add Vaults ☝</h3>
        </div>
      ) : (
        <List>
          {vaults.map(vault => (
            <VaultListItem key={vault.__id} vault={vault} onClick={onVaultSelected} />
          ))}
        </List>
      )}
    </div>
  );
};

function VaultListItem({ vault, onClick }) {
  return (
    <SimpleListItem
      graphic="security"
      text={vault.name || vault.__id}
      onClick={() => onClick(vault.__id)}
    />
  );
}

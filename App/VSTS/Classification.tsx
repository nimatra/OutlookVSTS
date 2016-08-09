import * as React from 'react';
import { Provider } from 'react-redux';
import { AccountDropdown } from './SettingsComponents/AccountDropdown';
import { AreaDropdown } from './SettingsComponents/AreaDropdown';
import { ProjectDropdown } from './SettingsComponents/ProjectDropdown';

/**
 * Renders the Acccount, Project, and Area components
 * @class {Classification}
 */
export class Classification extends React.Component<{}, {}> {
  /**
   * Renders the Account, Project, and Area components
   */
  public render(): React.ReactElement<Provider> {
    return (
      <div>
        <div className='ms-font-1x ms-fontWeight-semibold ms-fontColor-black'> CLASSIFICATION
          <div>
            Account: <AccountDropdown />
            Project: <ProjectDropdown />
            Area: <AreaDropdown />
          </div>
        </div>
    </div>
    );
  }
}


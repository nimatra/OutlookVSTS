import * as React from 'react';
import { Provider} from 'react-redux';
import { SignInButton } from './SignInButton';
import { AddInDescription } from './AddInDescription';

/**
 * Dumb component
 * Renders the add-in description and sign in button
 * @class {LogInPage} 
 */
export class LogInPage extends React.Component<{}, {}> {

  /**
   * Renders the add-in description and sign in button
   */
  public render(): React.ReactElement<Provider> {
    let style_image: any = {
      height: '150px',
      width: '320px',
    };

    return(<div>
            <image style = {style_image} src = '../../../public/Images/VSTSLogo_Long.png'/>
            <AddInDescription />
            <SignInButton />
            </div>);
  }
}

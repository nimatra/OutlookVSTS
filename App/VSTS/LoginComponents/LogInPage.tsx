import * as React from 'react';
import { Provider} from 'react-redux';
import { SignInButton } from './SignInButton';
import { AddInDescription } from './AddInDescription';

export class LogInPage extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    console.log('loginpage');
    return(<div>
            <AddInDescription />
            <SignInButton />
            </div>);
  }

 }


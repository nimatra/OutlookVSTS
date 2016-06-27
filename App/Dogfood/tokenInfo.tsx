import * as React from 'react';
import { Provider } from 'react-redux';

export class TokenInfo extends React.Component<{ token: string; }, {}> {

    public render(): React.ReactElement<Provider> {
    const token: string = this.props.token;
    if(token === "") {
        return (<div />);
    }
    else{
        return (<h3>Your token is: {token}</h3>);
    }
  }
}
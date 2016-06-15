import * as React from 'react';
import { Provider } from 'react-redux';

export class Dogfood extends React.Component<{}, {}> {

  public state: any;

  public constructor() {
    super();
    this.state = {
      authToken : 'unauthorized',
    };
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  public handleAuthClick(): void {
    this.setState({authToken : 'authorized'});
  }

  public componentDidMount(): void {
    console.log('Hello from Node');
  }

  public render(): React.ReactElement<Provider> {
    const text: string = this.state.authToken;
    return (<div>
              <h1>Dogfood</h1>
              <h2>Auth State: {text}</h2>
              <div onClick={this.handleAuthClick}>Click Here to Authenticate</div>
            </div>);
  }
 }

/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';
import { CreateWorkItem } from './CreateWorkItem';

enum Users { None, EmilyT, EmilyZ, Miranda}

export class VSTS extends React.Component<{}, {user: Users}> {

  public constructor() {
    super();
    this.state = {user: Users.None};
    this.setEmilyT = this.setEmilyT.bind(this);
    this.setEmilyZ = this.setEmilyZ.bind(this);
    this.setMiranda = this.setMiranda.bind(this);
  }

  public setEmilyT(): void { this.setState({user: Users.EmilyT}); }
  public setEmilyZ(): void { this.setState({user: Users.EmilyZ}); }
  public setMiranda(): void { this.setState({user: Users.Miranda}); }

  public render(): React.ReactElement<Provider> {

    console.log('got to vsts');
    const user: Users = this.state.user;

    switch (user) {
      case Users.EmilyT:
        return(<CreateWorkItem />);
      case Users.EmilyZ:
        return(<div>Emily Z's addIn</div>);
      case Users.Miranda:
        return(<div>Miranda's addIn</div>);
      default:
        return(<div><button onClick={this.setEmilyT}>EmilyT</button>
               <button onClick={this.setEmilyZ}>EmilyZ</button>
               <button onClick={this.setMiranda}>Miranda</button>
               </div>);
    }
  }
}

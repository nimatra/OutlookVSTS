import * as React from 'react';
import { Provider } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem'


export class Save extends React.Component<{}, {value:any}> {

   public constructor(){
    super();
    this.state = {value: 'Save'};

  }

  public handleClick (): void {
    this.setState({value: 'Saved'});
  }


  public render(): React.ReactElement<Provider> {

var save = {
      background: '#4da6ff',
      width:'250px',
      height:'35px',
      align: 'center'
};

    return ( <div>
<br/>
<input type="button" style= {save} value={this.state.value} onClick={this.handleClick} />

    </div>);

  }
 }
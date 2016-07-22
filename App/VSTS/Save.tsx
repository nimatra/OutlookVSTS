import * as React from 'react';
import { Provider } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem'


export class Save extends React.Component<{}, {isSaved:boolean}> {

   public constructor(){
    super();
    this.state = {isSaved: false};
    this.handleClick = this.handleClick.bind(this)
  }


  public handleClick(): void {
    this.setState({isSaved: !this.state.isSaved});
  }

  public render(): React.ReactElement<Provider> {

var save = {
      background: '#4da6ff',
      width:'250px',
      height:'35px',
      align: 'center'
};
var text = this.state.isSaved ? 'Creating':'Creating Work Item';
    return ( <div>
<br/>
  <button style= {save} onClick = {this.handleClick}> {text} </button>

    </div>);

  }
 }
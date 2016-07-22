import * as React from 'react';
import { Provider } from 'react-redux';
//import { CreateWorkItem } from './CreateWorkItem'


export class Checkbox extends React.Component<{}, {isSaved:boolean}> {

   public constructor(){
    super();
    this.state = {isSaved: false};
    this.handleClick = this.handleClick.bind(this)
  }


  public handleClick(): void {
    this.setState({isSaved: !this.state.isSaved});
  }

  public render(): React.ReactElement<Provider> {


var text = this.state.isSaved ? 'Saved':'Save';
    return ( <div>
    <label><input type="checkbox" id="cbox" onClick = {this.handleClick} value="addasattachment" /> Add Email as Attachment </label> <br/>
    </div>);

  }
 }
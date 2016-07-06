import * as React from 'react';
import { Provider } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem'


export class Title extends React.Component<{}, {value:any}> {

  isReady : boolean; // set to false

  private Initialize():void{
    this.isReady = true;
    this.forceUpdate(); //re-renders page
  }

  public constructor() {
    super(); //required first line
    this.isReady = false; //should be false, but doesnt reload
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
    this.state = {value: 'Initial'};
  }

  public handleChange (event): void {
    this.setState({value: event.target.value.substr(0, 250)});
  }

  public render(): React.ReactElement<Provider> {

  var normalizedSubject = Office.context.mailbox.item.normalizedSubject;

  var title = {
  width: '250px',
  height: '18px',
  align: 'left',
  resize: 'none',
  font: '14px times new roman, serif'
  }

    return ( <div>
    TITLE <br/>
    <input type="text" style={title} value={normalizedSubject} onChange={this.handleChange} />
    <br/>
    </div>);

  }
 }

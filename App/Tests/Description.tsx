import * as React from 'react';
import { Provider } from 'react-redux';
//import { CreateWorkItem } from './CreateWorkItem'


export class Description extends React.Component<{}, {value:any}> {

   public constructor(){
    super();
    this.state = {value: 'For more details, please refer to the attached email thread.'};

  }

  public handleChange (event): void {
    this.setState({value: event.target.value});
  }


  public render(): React.ReactElement<Provider> {
  //var checked = document.getElementById("cbox").checked; 
 
  var scroll = {
    width: '250px',
    height: '150px',
    overflow: 'auto',
    align: 'left',
    font: '14px times new roman, serif',
    resize: 'none'
  };

    return ( <div>
    <br/>
    DESCRIPTION <br/>
    <label> <input type="checkbox" id="cbox" value="addAsAttachment" /> Add Email as Attachment </label> <br/>
  
   <textarea style={scroll} value={this.state.value} onChange={this.handleChange}> </textarea>
    <br/>
    <br/>

    </div>);

  }
 }
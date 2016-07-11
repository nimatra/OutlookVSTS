import * as React from 'react';
import { Provider } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem'


export class Dropdown extends React.Component<{}, {isSaved:boolean}> {

   public constructor(){
    super();
    this.state = {isSaved: false};
    this.handleClick = this.handleClick.bind(this)
  }


  public handleClick(): void {
    this.setState({isSaved: !this.state.isSaved});
  }

  public render(): React.ReactElement<Provider> {

var gear = {
  align: 'right'
}

var drop = {
    width: '250px',
    align: 'left'
}

    return ( <div>
<div>Create Work Item
<img  style= {gear} src="http://www.clker.com/cliparts/T/Y/8/C/N/L/gear-icon-md.png"  height="15" width="15" />

<br/> <br/>

<select style={drop}>
   <option value="bug">Bug</option>
   <option value="task">Task</option>
   <option value="userstory">User Story</option>
</select>

</div>


    </div>);

  }
 }
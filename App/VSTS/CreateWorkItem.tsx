/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Description } from './Description'
import { Title } from './Title'
import { Save } from './Save'

export class CreateWorkItem extends React.Component<{}, {}> {

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
  }

public render(): React.ReactElement<Provider> {

if (this.isReady == false)
  return (<div>loading</div>);


var save = {
      background: '#4da6ff',
      width:'250px',
      height:'35px',
      align: 'center'
};

var drop = {
    width: '187.5px',
    align: 'left'
}

var gear = {
  align: 'right'
}

  return (<div>
<div>
<select style={drop}>
   <option value="bug">Bug</option>
   <option value="task">Task</option>
   <option value="userstory">User Story</option>
</select>

 <img  style= {gear} src="http://www.clker.com/cliparts/T/Y/8/C/N/L/gear-icon-md.png"  height="15" width="15" />
</div>

<br/>


<Title />

<Description />

<div>
CLASSIFICATION <br/>
</div>

<Save/>

</div>);
  }
 }

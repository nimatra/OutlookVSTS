/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Description } from './Description';
import { Title } from './Title';
import { Save } from './Save';
import { Dropdown } from './Dropdown';
import { TestTitle } from './TestTitle';

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
console.log('got to create pg');
if (this.isReady == false)
  return (<div>loading</div>);


var save = {
      background: '#4da6ff',
      width:'250px',
      height:'35px',
      align: 'center'
};

  return (<div>

<TestTitle />

<Dropdown/>

<Title />

<Description />

CLASSIFICATION <br/>

<Save/>

</div>);
  }
 }

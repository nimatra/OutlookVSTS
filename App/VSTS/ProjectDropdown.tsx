/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import {LogInPage } from './LogInPage';

export class ProjectDropdown extends React.Component<{}, {saved:boolean}> {

  public constructor() {
    super();
    console.log(this.state);
  }

  render(){
    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };
    console.log('got to settings');
    if(this.state.saved == false){
      return (
      <div>
            <h3 style= {style_section} size = '6'>Project</h3>
            <select name ="project">
              <option value="outlook">Outlook Services</option>
            </select>
      </div>
      );}
     else
     {
       return (<div>Create Item </div>);
     }
  }
 }
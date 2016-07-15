/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class AreaDropdown extends React.Component<{}, {}> {

  public constructor() {
    super();
  }

  render(){
    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };
    console.log('got to area');
    return (
    <div>
        <h3 style= {style_section} size = '6'>Area</h3>
        <select name ="area">
            <option value="vsts">VSTS</option>
        </select>
    </div>
      );
    }
  }
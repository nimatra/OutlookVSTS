/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class AccountDropdown extends React.Component<{}, {}> {

  render(){
    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };
    console.log('got to account');

  return (
      <div>
            <h3 style= {style_section} size = '6'>Account</h3>
            <select name ="account">
              <option value="o365">o365exchange.visualstudio.com</option>
            </select>
      </div>
      );
    }
  }
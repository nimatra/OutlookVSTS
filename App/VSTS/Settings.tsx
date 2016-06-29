/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';

export class Settings extends React.Component<{}, {}> {


  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center'
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",

    };

    var style_text = {
       color: "rgb(30,30,30)", // TODO - change to dark gray
       font: "15px arial, sans-serif",
    };

    var style_button = {
      backgroundcolor: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "20px arial, sans-serif",
      align: 'center'
    };

    console.log('got to settings');
    return (
      <div>
          <div> logo</div>
          <div>
            <h1> Default Settings </h1>
            <p style = {style_text}> Assign default values for work item creation</p>
            line separator
          </div>
          <div>
            <button style={style_button}> Save </button>
          </div>
          <div>
            <h3 style= {style_section} size = '6'>Account</h3>
            <select name ="account">
            </select>
            <h3 style= {style_section} size = '6'>Project</h3>
            <select name ="project">
            </select>
            <h3 style= {style_section} size = '6'>Area</h3>
            <select name ="area">
            </select>
          </div>
      </div>
      );
  }
 }
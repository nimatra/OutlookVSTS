/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
import {LogInPage } from './LogInPage';

export class Settings extends React.Component<{}, {saved:boolean}> {

  public constructor() {
    super();
    this.state = {saved:false};
    console.log(this.state);
  }

  private save(): void{
    console.log('saving');
    this.setState({saved:true});
    this.forceUpdate();
    //TODO - save defaults to roaming settings
  }

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center',
    };

    var style_section = {
      color: 'rgb(104,33,122)', // the VS purple
      font: "20px arial, sans-serif",
    };

    var style_text = {
       color: "rgb(118,118,118)", // dark gray
       font: "15px arial, sans-serif",
    };

    var style_button = {
      background: 'rgb(0,122,204)', // save button blue
      textalign: 'center',
      color: 'rgb(255,255,255)',
      font: "20px arial, sans-serif",
      align: 'center',
    };

    console.log('got to settings');
    console.log(this.state);
    if(this.state.saved == false){
      return (
      <div>
          <div> <image src = './images/logo.png' style = {style_img}/></div>
          <div>
            <h1> Default Settings </h1>
            <p style = {style_text}> Assign default values for work item creation</p>
          </div>
          <div>
            <button style={style_button} onclick = {window.close}> Save </button>
          </div>
          <hr/>
          <div>
            <h3 style= {style_section} size = '6'>Account</h3>
            <select name ="account">
              <option value="o365">o365exchange.visualstudio.com</option>
            </select>
            <h3 style= {style_section} size = '6'>Project</h3>
            <select name ="project">
              <option value="outlook">Outlook Services</option>
            </select>
            <h3 style= {style_section} size = '6'>Area</h3>
            <select name ="area">
              <option value="vsts">VSTS</option>
            </select>
          </div>
      </div>
      );}
     else
     {
       return (<div>Create Item </div>);
     }
  }
 }
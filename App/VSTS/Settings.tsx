/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
//setting page
export class Settings extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    var style_img = {
      align: 'center'
    };

    console.log('got to settings');
    return (
      <div>
          <div> logo</div>
          <div>
            <h1> Default Settings </h1>
            <p> Assign default values for work item creation</p>
            line separator
          </div>
          <div>
            <button> Save </button>
          </div>
          <div>
            <h3 style= {style_h3}>Account</h3>
            <select name ="">
            </select>
            <h3 style= {style_h3}>Project</h3>
            <select name ="">
            </select>
            <h3 style= {style_h3}>Area</h3>
            <select name ="">
            </select>
          </div>
      </div>
      );
  }
 }
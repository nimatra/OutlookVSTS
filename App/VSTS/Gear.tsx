import * as React from 'react';
import { Provider } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem';


export class Gear extends React.Component<{}, {}> {

public handlegearClick(): void {
    console.log('gear click works');
  }

  public render(): React.ReactElement<Provider> {

var gear = {
  align: 'right'
}

var addasattachment = {
    font: '14px arial, ms-segoe-ui'
  }

    return ( <div>
<div style = {addasattachment}> Create Work Item

<button className="ms-Button" style = {gear} id="gear" onClick = {this.handlegearClick}>
<span className="ms-Icon ms-Icon--gear"> </span>
</button>

</div>

    </div>);

  }
}
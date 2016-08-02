/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Description } from './Description';
import { Title } from './Title';
import { Save } from './Save';
import { WorkItemDropdown } from './WorkItemDropdown';
import { Classification } from './Classification';
import { Gear } from './Gear';


export class CreateWorkItem extends React.Component<{}, {}> {

  public isReady: boolean; // set to false

  private Initialize(): void {
    this.isReady = true;
    this.forceUpdate(); // re-renders page
  }

  public constructor() { // will be removed after merge since office is initialized before this page is reached
    super();
    this.isReady = false;
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
  }


public render(): React.ReactElement<{}> {

  console.log('got to create pg');
  if (this.isReady === false) {
    return (<div>loading!!</div>);
  }

  return (<div>
  <Gear />
  <WorkItemDropdown/>
  <Title/>
  <Description/>
  <Classification/>
  <Save/>
  </div>);
  }
}

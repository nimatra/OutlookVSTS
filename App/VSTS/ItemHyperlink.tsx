/// <reference path="../../office.d.ts" />
import * as React from 'react';

export class ItemHyperlink extends React.Component<{workItemHyperlink: any}, {}> {

  public render(): React.ReactElement<any> {
    console.log('got to itemhyperlink');

    return(
      <div>
      <td dangerouslySetInnerHTML={{__html: this.props.workItemHyperlink}} />
      </div>
    );
  }
 }

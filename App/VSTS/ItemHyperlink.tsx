/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider } from 'react-redux';
// import { Office } from 'Office';

export class ItemHyperlink extends React.Component<{}, {}> {

  public render(): React.ReactElement<Provider> {
    console.log('got to hyperlink');
    return(
      <a target='_blank' href='https://www.visualstudio.com/products/what-is-visual-studio-online-vs?WT.srch=1&WT.mc_ID=SEM_xXsQTNj1' className='ms-font-1x ms-fontWeight-light ms-fontColor-black'>Go To VSTS</a>
    );
  }
 }

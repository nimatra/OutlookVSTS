import * as React from 'react';
import { Provider, connect } from 'react-redux';
// import { changeGearVisiblility, PageVisibilityEnum } from '../Reducers/ActionsET';

export interface IGearProp {
    dispatch?: any;
}

@connect ()

export class Gear extends React.Component<IGearProp, {}> {

public handlegearClick(): void {
  //  this.props.dispatch(changeGearVisiblility(PageVisibilityEnum.Settings)); DUMB
    console.log('dispatch action here to change visibility enum');
  }

public render(): React.ReactElement<Provider> {

let gear: any = {
  align: 'right',
};


return ( <div>
    <div className='ms-font-1x ms-fontWeight-light ms-fontColor-black'> Create Work Item
    <button className='ms-Button' style = {gear} id='gear' onClick = {this.handlegearClick}>
    <span className='ms-Icon ms-Icon--gear'> </span>
    </button>
    </div> </div>);
  }
}

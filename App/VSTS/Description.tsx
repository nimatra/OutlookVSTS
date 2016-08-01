import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { changeAddAsAttachment, changeDescription } from '../Reducers/ActionsET';

export interface IDescriptionProp {
    dispatch?: any;
    description?: string;
    addAsAttachment?: boolean;
}

function mapStateToProps (state: any): IDescriptionProp  {
  return {addAsAttachment: state.createWorkItemState.addAsAttachment, description: state.createWorkItemState.description} ;
   }

@connect (mapStateToProps)

export class Description extends React.Component<IDescriptionProp, {}> {

public handlechangeDescription (event: any): void {
  this.props.dispatch(changeDescription (event.target.value));
}

public handlechangeAddAsAttachment (): void {
  this.props.dispatch(changeAddAsAttachment(this.props.addAsAttachment));
}

public render(): React.ReactElement<Provider> {

  let scroll: any = {
    align: 'left',
    height: '150px',
    overflow: 'auto',
    resize: 'none',
    width: '250px',
  };

  return ( <div>
   <div className='ms-font-1x ms-fontWeight-semibold ms-fontColor-black'> DESCRIPTION </div>
   <label className='ms-font-1x ms-fontWeight-light ms-fontColor-black' ><input type='checkbox' id='cbox'
      onClick = {this.handlechangeAddAsAttachment.bind(this)} defaultChecked/> Add Email as Attachment </label> <br/>
   <textarea className='ms-font-1x ms-fontWeight-light ms-fontColor-black' style={scroll} id = 'description'
      value={this.props.description} onChange={this.handlechangeDescription.bind(this)}> </textarea>
   <br/> <br/>
   </div>);

  }
}


import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { changeAddAsAttachment, changeDescription } from '../Reducers/ActionsET';

 /**
  * Represents the Description Properties
  * @interface IDescriptionProp
  */
export interface IDescriptionProp {
    /**
     * dispatch to map dispatch to props
     * @type {any}
     */
    dispatch?: any;
    /**
     * the text in the description
     * @type {string}
     */
    description?: string;
    /**
     * whether to attach the email on the work item
     * @type {boolean}
     */
    addAsAttachment?: boolean;
}

/**
 * Maps elements of the state to properties
 * @returns {IDescriptionProp}
 * @param {any} state
 */
function mapStateToProps (state: any): IDescriptionProp  {
  return {addAsAttachment: state.workItem.addAsAttachment, description: state.workItem.description} ;
   }

@connect (mapStateToProps)

/**
 * Renders the Description heading, Add Email as Attachment checkbox, and description textbox
 * @class { Description }
 */
export class Description extends React.Component<IDescriptionProp, {}> {

/**
 * Dispatches the action to change the description value in the store
 * @ returns {void}
 * @param {any} event
 */
public handlechangeDescription (event: any): void {
  this.props.dispatch(changeDescription (event.target.value));
}

/**
 * Dispatches the action to update the addAsAttachment and description values in the store
 * @ returns {void}
 */
public handlechangeAddAsAttachment (): void {
  if (!this.props.addAsAttachment) {
      this.props.dispatch(changeDescription('For more details, please refer to the attached email thread. ' + this.props.description));
  }else {
      this.props.dispatch(changeDescription(
      this.props.description.replace('For more details, please refer to the attached email thread. ', '')));
  }
  this.props.dispatch(changeAddAsAttachment(this.props.addAsAttachment));
}
/**
 * Renders the Description heading, the Add Email as Attachment checkbox, and the Description textbox
 */
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
   <textarea className='ms-font-1x ms-fontWeight-light ms-fontColor-black ms-' style={scroll} id = 'description'
      value={this.props.description} onChange={this.handlechangeDescription.bind(this) }> </textarea>
   <br/> <br/>
   </div>);

  }
}


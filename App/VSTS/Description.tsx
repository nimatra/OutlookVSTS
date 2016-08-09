import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { updateAddAsAttachment, updateDescription, Stage } from '../Redux/WorkItemActions';

 /**
  * Represents the Description Properties
  * @interface IDescriptionProps
  */
export interface IDescriptionProps {
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
    stage?: Stage;
}


/**
 * Renders the Description heading, Add Email as Attachment checkbox, and description textbox
 * @class { Description }
 */
function mapStateToProps (state: any): IDescriptionProps  {
  return {addAsAttachment: state.workItem.addAsAttachment, description: state.workItem.description, stage: state.workItem.stage} ;
}

@connect (mapStateToProps)
export class Description extends React.Component<IDescriptionProps, {}> {

/**
 * Dispatches the action to change the description value in the store
 * @ returns {void}
 * @param {any} event
 */
public handlechangeDescription (event: any): void {
  this.props.dispatch(updateDescription (event.target.value));
}

/**
 * Dispatches the action to update the addAsAttachment and description values in the store
 * @ returns {void}
 */
public handlechangeAddAsAttachment (): void {
  this.props.dispatch(updateAddAsAttachment(this.props.addAsAttachment));
  if (this.props.addAsAttachment || this.props.stage !== Stage.New) {
    console.log(this.props.addAsAttachment);
    this.props.dispatch(updateDescription('For more details, please refer to the attached email thread. ' + this.props.description));
  }else {
    console.log('false');
    this.props.dispatch(updateDescription(
    this.props.description.replace('For more details, please refer to the attached email thread. ', '')));
  }
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


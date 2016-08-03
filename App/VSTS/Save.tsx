import * as React from 'react';
import { Provider, connect } from 'react-redux';
// import { changeSave, StageEnum } from '../Reducers/ActionsET';
import { Rest } from '../RestHelpers/rest';
import { changeStage, Stage } from '../Reducers/ActionsET';
import { IWorkItem } from '../Reducers/ReducersET';
 /**
  * Represents the Save Properties
  * @interface ISaveProp
  */
export interface ISaveProp {
    /**
     * dispatch to map dispatch to props
     * @type {any}
     */
    dispatch?: any;
    /**
     * the entire work item property
     * @type {IWorkItem}
     */
    workItem?: IWorkItem;
}
/**
 * Maps elements of the state to properties
 * @returns {ISaveProp}
 * @param {any} state
 */
function mapStateToProps (state: any): ISaveProp  {
      return { workItem: state.workItem };
}

@connect (mapStateToProps)
/**
 * Renders the Save button and makes REST api calls
 * @class { Save }
 */
export class Save extends React.Component<ISaveProp, {}> {
/**
 * States whether to disable the save button or not
 * @type {boolean}
 */
   public isDisabled: boolean = false;
/**
 * Dispatches the action to change the Stage and make the REST call to create the work item
 * @returns {void}
 */
   public handleSave(): void {
      this.props.dispatch(changeStage(Stage.Saved));
      Rest.createWorkItem ('t-emtenc@microsoft.com', 'o365exchange', 'Outlook Services/Ecosystem - Ext VSTS', 'Bug',
                           this.props.workItem.stage, this.props.workItem.title, this.props.workItem.description,
                           (output) => console.log(output));
  }

/**
 * Renders the Save button and disables it on click
 */
public render(): React.ReactElement<Provider> {

/**
 * Style for the live save button
 */
let save: any = {
      align: 'center',
      background: '#80ccff',
      height: '35px',
      width: '250px',
};

/**
 * Style for the disabled save button
 */
let disabled: any = {
      align: 'center',
      background: '#d9d9d9',
      height: '35px',
      width: '250px',
};
/**
 * Decides which style to use for the stage button based on the Stage
 */
let currentStyle: any = this.props.workItem.stage === Stage.Saved ? disabled : save;

return (<div>
    <br/>
    <button className = 'ms-Button' style= {currentStyle} disabled = {this.props.workItem.stage === Stage.Saved}
      onClick = {this.handleSave.bind(this)} > Create Work Item </button>
    </div>);
  }
 }

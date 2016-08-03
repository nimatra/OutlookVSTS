import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { changeWorkItemType } from '../Reducers/ActionsET';

require ('react-select/dist/react-select.css');
let Select: any = require('react-select');
 /**
  * Represents the WorkItemType Properties
  * @interface IWorkItemTypeDropdownProp
  */
export interface IWorkItemTypeDropdownProp {
    /**
     * dispatch to map dispatch to props
     * @type {any}
     */
    dispatch?: any;
    /**
     * represents the type of work item the user selects
     * @type {string}
     */
    workItemType?: string;
}
/**
 * Maps elements of the state to properties
 * @returns {IWorkItemTypeDropdownProp}
 * @param {any} state
 */
function mapStateToProps (state: any): IWorkItemTypeDropdownProp  {
    return {workItemType: state.workItem.workItemType} ;
   }

@connect (mapStateToProps)
/**
 * Renders the dropdown to select the workItemType using React-Select
 * @class { WorkItemDropdown }
 */
export class WorkItemDropdown extends React.Component<IWorkItemTypeDropdownProp, {}> {
/**
 * Dipatches an action to update the value of workItemType in the store to the selected value
 * @returns {void}
 * @param {any} option
 */
public handleTypeChange(option: any): void {
    let type: string = option.label;
    console.log('Selected: ' + type);
    this.props.dispatch(changeWorkItemType(type));
}
/**
 * Renders the workItemType Dropdown using React-Select
 */
public render(): React.ReactElement<Provider> {

    console.log('Selected: ' + this.props.workItemType);

    let drop: any = {
        align: 'left',
        width: '250px',
    };

    let types: any = [
        { label: 'Bug', value: 'Bug'},
        { label: 'Task', value: 'Task'},
        { label: 'User Story', value: 'User Story'},
    ];

    return ( <div>
    <br/>
    <Select style = {drop} className='ms-font-1x ms-fontWeight-light ms-fontColor-black'
    name='TypeDropdown' value= {this.props.workItemType} options={types} onChange={this.handleTypeChange.bind(this)} />
    </div>);
  }
}

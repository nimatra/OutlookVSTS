import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { updateWorkItemType } from '../Redux/WorkItemActions';

require ('react-select/dist/react-select.css');
let Select: any = require('react-select');
 /**
  * Represents the WorkItemType Properties
  * @interface IWorkItemTypeDropdownProps
  */
export interface IWorkItemTypeDropdownProps {
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
 * Renders the dropdown to select the workItemType using React-Select
 * @class { WorkItemDropdown }
 */
function mapStateToProps (state: any): IWorkItemTypeDropdownProps  {
    return {workItemType: state.workItem.workItemType} ;
   }

@connect (mapStateToProps)

export class WorkItemDropdown extends React.Component<IWorkItemTypeDropdownProps, {}> {
/**
 * Dipatches an action to update the value of workItemType in the store to the selected value
 * @returns {void}
 * @param {any} option
 */
public handleTypeChange(option: any): void {
    let type: string = option.label;
    console.log('Selected: ' + type);
    this.props.dispatch(updateWorkItemType(type));
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

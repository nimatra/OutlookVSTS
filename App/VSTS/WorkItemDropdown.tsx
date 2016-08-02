import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { changeWorkItemType } from '../Reducers/ActionsET';

require ('react-select/dist/react-select.css');
let Select: any = require('react-select');

export interface IWorkItemTypeDropdownProp {
    dispatch?: any;
    workItemType?: string;
}

function mapStateToProps (state: any): IWorkItemTypeDropdownProp  {
    return {workItemType: state.workItem.workItemType} ;
   }

@connect (mapStateToProps)

export class WorkItemDropdown extends React.Component<IWorkItemTypeDropdownProp, {}> {

public handleTypeChange(option: any): void {
    let type: string = option.label;
    console.log('Selected: ' + type);
    this.props.dispatch(changeWorkItemType(type));
}

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

import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { CreateWorkItem } from './CreateWorkItem';
import { changeWIType } from '../Reducers/ActionsET';
require ('react-select/dist/react-select.css');

let Select = require('react-select');

export class TypeDropdown extends React.Component<{}, {}> {


public render(): React.ReactElement<Provider> {


var drop = {
    width: '250px',
    align: 'left'
};

var selected : string = "bug";

var options = [
    { value: 'bug', label: 'Bug' },
    { value: 'task', label: 'Task' },
    { value: 'userstory', label: 'User Story'}
];

function logChange(val) {
    selected = val
    console.log("Selected: " + selected);
}

    return ( <div>
<br/> <br/>
<Select style = {drop}
    name="TypeDropdown" value= {selected} options={options} onChange={logChange} />
    </div>);

  }
}
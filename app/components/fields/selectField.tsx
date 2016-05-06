/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';

interface ISelectFieldState {
  value: string;
}

interface ISelectFieldProps {
  label: string;
  options: string[];
}

export class SelectField extends React.Component<ISelectFieldProps, ISelectFieldState> {
  public render(): React.ReactElement<{}> {
    let items: JSX.Element[] = [];

    let i = 0;
    this.props.options.forEach( element => {
        items.push(<option id={'option'+i} value={element}>{element}</option>);
        i+=1;
    });

    return (<div className="field-control">
                <div className="ms-Dropdown" tabIndex={0}>
                    <label className="ms-Label">{this.props.label}</label>
                    <i className="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>
                    <select className="ms-Dropdown-select">
                        {items}
                    </select>
                </div>
            </div>
    );
  }
}
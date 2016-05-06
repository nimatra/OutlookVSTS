/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';

//Hack: These fields are not always present?
interface ITitleBarState {
    title: string;
    status: string;
    assignee: string;
}

export class Titlebar extends React.Component<{}, ITitleBarState> {
  public constructor(props : {}, context) {
    super(props,context);
    this.state = { title: '', status: 'New', assignee: 'Jesse Freitas'};
  }

  public render(): React.ReactElement<{}> {

    return (<div className="titleBar">
                <div className="ms-TextField ms-TextField--underlined">
                    <label className="ms-Label">Title:</label>
                    <input className="ms-TextField-field" type="text" />
                </div>
                <div className="field-control" id="status">
                    <div className="ms-Dropdown" tabIndex={0}>
                        <label className="ms-Label">State:</label>
                        <i className="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>
                        <select className="ms-Dropdown-select"></select>
                    </div>
                </div>
                <div className="field-control" id="assignee">
                    <div className="ms-Dropdown" tabIndex={0}>
                        <label className="ms-Label">Assignee:</label>
                        <i className="ms-Dropdown-caretDown ms-Icon ms-Icon--caretDown"></i>
                        <select className="ms-Dropdown-select"></select>
                    </div>
                </div>
            </div>
    );
  }
}
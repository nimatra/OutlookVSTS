/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';

interface IStringFieldState {
  text: string;
}

interface IStringFieldProps {
  label: string;
}

export class StringField extends React.Component<IStringFieldProps, IStringFieldState> {
  public render(): React.ReactElement<{}> {

    return (<div className="field-control">
                <div className="ms-TextField">
                    <label className="ms-Label">{this.props.label}</label>
                    <input className="ms-TextField-field" type="text">{this.state.text}</input>
                </div>
            </div>
    );
  }
}
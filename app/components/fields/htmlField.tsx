/// <reference path="../../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';

interface IHtmlFieldState {
  text: string;
}

interface IHtmlFieldProps {
  label: string;
}

export class HtmlField extends React.Component<IHtmlFieldProps, IHtmlFieldState> {
  public render(): React.ReactElement<{}> {
    return (<div className="field-control">
                <div className="ms-TextField ms-TextField--multiline">
                    <label className="ms-Label">{this.props.label}</label>
                    <textarea className="ms-TextField-field">{this.state.text}</textarea>
                </div>
            </div>
    );
  }
}
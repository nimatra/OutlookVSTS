/// <reference path='../../../typings/tsd.d.ts' />

import * as React from 'react';

interface IHtmlFieldProps {
  label: string;
  text: string;
  onChange?: ICallback;
}

interface ICallback { (option: string): void; }

export class HtmlField extends React.Component<IHtmlFieldProps, {}> {

  public onChange(value: any): void {
    this.props.onChange(value);
  }

  public render(): React.ReactElement<{}> {
    return (
    <div className='form-group' style={{marginBottom:'0px'}}>
      <label for={this.props.label} className='ms-font-m'>{this.props.label}</label> <br />
      <textarea id={this.props.label} className='form-control'
        style={{ height: '150px' }} onChange={this.onChange.bind(this) } value={this.props.text} />
    </div>
    );
  }
}

/// <reference path='../../../typings/tsd.d.ts' />

import * as React from 'react';

interface ICheckboxFieldProps {
  label: string;
  onChange?: ICallback;
}

interface ICallback { (event: any): void; }

export class CheckboxField extends React.Component<ICheckboxFieldProps, {}> {

  public onChange(event: any): void {
    this.props.onChange(event);
  }

  public render(): React.ReactElement<{}> {
    return (
        <div>
            <label className='ms-font-m'><input type='checkbox' onChange={this.onChange.bind(this)} />{this.props.label} </label>
        </div>
    );
  }
}

/// <reference path='../../../typings/tsd.d.ts' />

import * as React from 'react';

interface IHtmlFieldProps {
  label: string;
  text: string;
  onChange?: ICallback;
}

interface ICallback { (option: string): void; }

export class HtmlField extends React.Component<IHtmlFieldProps, {} > {

  public onChange(value: any): void {
    this.props.onChange(value);
  }

  public render(): React.ReactElement<{}> {
    return (<div>
                <div>
                    <label>{this.props.label}</label>
                    <textarea onChange={this.onChange.bind(this) } value={this.props.text} />
                </div>
            </div>
    );
  }
}

/// <reference path='../../../typings/tsd.d.ts' />

import * as React from 'react';

interface IButtonFieldProps {
  label: string;
  primary: boolean;
  onClick?: ICallback;
}

interface ICallback { (): void; }

export class ButtonField extends React.Component<IButtonFieldProps, {}> {

  public onClick(event: any): void {
    this.props.onClick();
  }

  public render(): React.ReactElement<{}> {
    return (
        <button onClick={this.onClick.bind(this) }>
            <span >
                <i ></i>
            </span>
            <span>{this.props.label}</span>
            </button>
    );
  }
}

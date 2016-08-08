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
    let buttonClass: string = 'ms-Button';
    if (this.props.primary) {
      buttonClass += ' ms-Button--primary';
    }
    return (
        <button className={buttonClass} onClick={this.onClick.bind(this) }>
          <span className='ms-Button-icon'>
            <i className='ms-Icon ms-Icon--plus'></i>
          </span>
          <span className='ms-Button-label'>{this.props.label}</span>
        </button>
    );
  }
}

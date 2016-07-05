/// <reference path='../../../typings/tsd.d.ts' />

import * as React from 'react';

interface ISelectFieldState {
  value: string;
}

interface ISelectFieldProps {
  label: string;
  options: string[];
  onChange?: ICallback;
}

interface ICallback { (option: string): void; }

export class SelectField extends React.Component<ISelectFieldProps, ISelectFieldState> {

  constructor() {
    super();
    this.state = { value: '' };
  }

  public onSelect(event: any): void {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  public render(): React.ReactElement<{}> {
    let items: JSX.Element[] = [<option value=''></option>];

    let i: number = 0;
    this.props.options.forEach(element => {
      items.push(<option id={'option' + i} value={element}>{element}</option>);
      i += 1;
    });

    const selected: string = this.state.value;

    return (<div><div>
      <label>{this.props.label}</label>
      <i></i>
      <select onChange={this.onSelect.bind(this) } value={selected}>
          {items}
      </select>
      </div></div>
    );
  }
}

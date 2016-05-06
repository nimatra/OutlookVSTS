/// <reference path="../../typings/tsd.d.ts" />

import * as React from 'react';
import { connect } from 'react-redux';
import { Titlebar } from './titlebar';
import { SelectField } from './fields/selectField';
import { IField, IWorkItemState } from '../workItemModel';

interface IWorkItemProps {
    types: string[]; //all possible work item types
    allFields: IField[]; //all supported fields
}

export class WorkItem extends React.Component<IWorkItemProps, IWorkItemState> {

  public constructor(props : IWorkItemProps, context) {
    super(props,context);
    this.state = { type: 'Bug', fields: [{label: 'Story Points', value: '', type: 'integer'},
          {label: 'Priority', value: '', type: 'integer'},
          {label: 'Description', value: '', type: 'html'}]};
  }

  public getFieldDOM(element: IField){
      return <div></div>;
  }

  public render(): React.ReactElement<{}> {

    let items: JSX.Element[] = [];
    if(this.state.fields){
        this.state.fields.forEach( element => {
            items.push(this.getFieldDOM(element));
        });
    }

    return (<div className="base">
                <div className="header">
                    <SelectField label="Work Item Type" options={this.props.types} />
                    <Titlebar />
                </div>
                <div className="fields">
                    {items}
                </div>
            </div>
    );
  }
}
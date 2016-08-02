import * as React from 'react';
import { Provider, connect } from 'react-redux';
// import { changeSave, StageEnum } from '../Reducers/ActionsET';
import { Rest } from '../RestHelpers/rest';
import { changeStage, Stage } from '../Reducers/ActionsET';
import { IWorkItem } from '../Reducers/ReducersET';

export interface ISaveProp {
    dispatch?: any;
    workItem?: IWorkItem;
}

function mapStateToProps (state: any): ISaveProp  {
      return { workItem: state.workItem };
}

@connect (mapStateToProps)

export class Save extends React.Component<ISaveProp, {}> {

   public isDisabled: boolean = false;

   public handleSave(): void {
      this.props.dispatch(changeStage(Stage.Saved));
      Rest.createWorkItem ('t-emtenc@microsoft.com', 'o365exchange.visualstudio.com', 'Outlook Services', this.props.workItem.workItemType,
                           this.props.workItem.stage, this.props.workItem.title, this.props.workItem.description,
                           (output) => console.log('done'));
  }

public render(): React.ReactElement<Provider> {

let save: any = {
      align: 'center',
      background: '#80ccff',
      height: '35px',
      width: '250px',
};

let disabled: any = {
      align: 'center',
      background: '#d9d9d9',
      height: '35px',
      width: '250px',
};

let currentStyle: any = this.props.workItem.stage === Stage.Saved ? disabled : save;

return (<div>
    <br/>
    <button className = 'ms-Button' style= {currentStyle} disabled = {this.props.workItem.stage === Stage.Saved}
      onClick = {this.handleSave.bind(this)} > Create Work Item </button>
    </div>);
  }
 }

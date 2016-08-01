import * as React from 'react';
import { Provider, connect } from 'react-redux';
// import { changeSave, StageEnum } from '../Reducers/ActionsET';
import { Rest } from '../RestHelpers/rest';
import { changeStage, Stage } from '../Reducers/ActionsET';

export interface ISaveProp {
    dispatch?: any;
  // pageState?: StageEnum; //CHANGE THIS
  // comment VSTShtmlLink?: string;
    title?: string;
    description?: string;
    type?: string;
    account?: string;
    project?: string;
    stage?: Stage;
}

function mapStateToProps (state: any): ISaveProp  {
    return {account: 'o365exchange.visualstudio.com', description: state.createWorkItemState.description, project: 'Outlook Services',
            stage: state.createWorkItemState.stage, title: state.createWorkItemState.title, type: state.createWorkItemState.type} ;
}

@connect (mapStateToProps)

export class Save extends React.Component<ISaveProp, {}> {

   public isDisabled: boolean = false;

   public handleSave(): void {
      this.props.dispatch(changeStage(Stage.Saved));
      Rest.createWorkItem ('t-emtenc@microsoft.com', this.props.account, this.props.project,
                           this.props.type, this.props.title, this.props.description, (output) => console.log('done'));
  }

public render(): React.ReactElement<Provider> {
console.log(this.isDisabled);
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

let currentStyle: any = this.props.stage === Stage.Saved ? disabled : save;

return (<div>
    <br/>
    <button className = 'ms-Button' style= {currentStyle} disabled = {this.props.stage === Stage.Saved}
      onClick = {this.handleSave.bind(this)} > Create Work Item </button>
    </div>);
  }
 }

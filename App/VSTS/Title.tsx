import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { changeTitle, changeStage, Stage } from '../Reducers/ActionsET';


export interface ITitleProp {
    dispatch?: any;
    title?: string;
    stage?: Stage;
}

function mapStateToProps (state: any): ITitleProp  {
  console.log('mapStateToProps' + JSON.stringify(state));
  return {stage: state.workItem.stage, title: state.workItem.title} ;
   }

@connect (mapStateToProps)

export class Title extends React.Component<ITitleProp, {}> {

public handlechangeTitle(event: any): void {
  this.props.dispatch(changeTitle (event.target.value));
}

public render(): React.ReactElement<Provider> {


  let title: any = {
    align: 'left',
    height: '18px',
    resize: 'none',
    width: '250px',
  };

  let normalizedSubject: string = Office.context.mailbox.item.normalizedSubject;
  let currentTitle: string = this.props.title;
  if (currentTitle === '' && this.props.stage === Stage.New) {
      this.props.dispatch(changeTitle (normalizedSubject));
      this.props.dispatch(changeStage (Stage.Draft));
  }

  return (<div>
     <br/>
     <div className='ms-font-1x ms-fontWeight-semibold ms-fontColor-black'> TITLE </div>
     <input type='text' style={title} className='ms-font-1x ms-fontWeight-light ms-fontColor-black'
        id= 'titleval' value={this.props.title} onChange={this.handlechangeTitle.bind(this)}  />
     <br/> <br/>
     </div>);

  }
}


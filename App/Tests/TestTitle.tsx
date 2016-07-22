import * as React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { testState, initalState } from './Reducers/ReducersET';
import { changeTitle } from '../Reducers/ActionsET';

export interface ItestProp {
    dispatch?: any;
    title?: string;
}

function mapStateToProps (state: any): ItestProp  {
  console.log('mapStateToProps' +JSON.stringify(state));
  return { title: state.testState.temp} 
    //firstName: state.form.firstName ? state.form.firstName : "None"*/ };
  }

/*function mapDispatchToProps(dispatch) {
  console.log('mapDispatchToProps');
  return { actions: dispatch(changeTitle ("plz work")) };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(changeTitle ("plz work"))
  };
}*/

@connect (mapStateToProps)

export class TestTitle extends React.Component<ItestProp, {}> {

public change() : void{
  this.props.dispatch(changeTitle ('plz work', false))
}

public render(): React.ReactElement<{}> {
console.log('got to test pg');

    return ( <div>
     <button onClick = {this.change.bind(this)}> {this.props.title} </button>
    </div>);

  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(TestTitle);

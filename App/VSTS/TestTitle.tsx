import * as React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { testState, initalState } from './Reducers/ReducersET';
import { changeTitle } from '../Reducers/ActionsET';

export interface ItestProp {
    title?: string;
}

function mapStateToProps (state: any): ItestProp  {
  console.log('mapStateToProps' +JSON.stringify(state.testState));
  return { title: state.testState.temp };
  }

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps');
  return {
    onClick: () => {
      dispatch(changeTitle("it worked!!!"))
    }
  }
}

@connect (mapStateToProps, mapDispatchToProps)

export class TestTitle extends React.Component<ItestProp, {}> {

public render(): React.ReactElement<{}> {
console.log('got to test pg');

    return ( <div>
     <button> {this.props.title} </button>
    </div>);

  }
}
import * as React from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { testState } from './Reducers/ReducersET';

export interface ItestProp {
    value?: string;
}

function mapStateToProps (state: testState): ItestProp  {
  return { value: state.value };
  }

export class TestTitle extends React.Component<ItestProp, testState> {

public constructor() {
    super();
  }

public render(): React.ReactElement<Provider> {

    return ( <div>
    {}
    </div>);

  }
 }

 export default connect(mapStateToProps)(TestTitle);

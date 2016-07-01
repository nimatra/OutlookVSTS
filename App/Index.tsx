/// <reference path="../typings/tsd.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import { Store, createStore } from 'redux';
// import { vsoAddin } from './reducers';
import { Provider } from 'react-redux';
import { Dogfood } from './Dogfood/dogfood';
import { VSTS } from './VSTS/VSTS';
import { Done } from './Authenticate/done';


declare const require: (name: String) => any;

interface IHotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
};

declare const module: IHotModule;

/*
function configureStore(): Store {
  const store: Store = createStore(vsoAddin);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer: any = require('./reducers').vsoAddin;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

 const store: Store = configureStore();
 */

class Main extends React.Component<{}, {}> {

  public getRoute(): string {
    let url: string = document.URL;
    let strings: string[] = url.split('/');
    return strings[3].slice(0, strings[3].indexOf('?'));
  }

  public render(): React.ReactElement<Provider> {
    const route: string = this.getRoute();
    switch (route) {
      case 'dogfood':
        return(<Dogfood />);
      case 'vsts':
        return(<VSTS />);
      case 'done':
        return(<Done />);
      default:
        return(<div>Route: '{route}' is not a vaild route!</div>);
    }
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));

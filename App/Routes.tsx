/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Route, Router, Link, browserHistory} from 'react-router';
import { Dogfood } from './Dogfood/dogfood';
import { VSTS } from './VSTS/VSTS';




export default (
    <Route path='/'>
        <Route path='/VSTS' component={VSTS}/>
        <Route path='/Dogfood' component={Dogfood}/>
    </Route>);

/// <reference path="../../../office.d.ts" />
import * as React from 'react';
import { Provider, connect} from 'react-redux';
import {ITempState} from '../../Redux/TestReducer';
import { IBoolAction, reverse} from '../../Redux/TestActions';
import {Component} from 'react';
import { reduxForm } from 'redux-form';
import TestForm from './TestForm'

interface testProp {
    dispatch?: any,
    boolVal?: boolean,
}

//map function
function mapStateToProps(state:any): testProp { //state of type in any
      console.log('state:'+JSON.stringify(state));

      return ({
        boolVal : state.ITempState.value
        //state.form.value - form values
      });
  }

export const fields = ['testField'];

@connect(mapStateToProps)

export class Test extends React.Component<testProp, {}> {
   public constructor(){
    super();
    this.update = this.update.bind(this);
    this.persist = this.persist.bind(this);
  }

   public update():void{
     console.log("updating");
     this.props.dispatch(reverse(this.props.boolVal));
   }

   public persist():void{
     console.log("persist");
     Office.context.roamingSettings.set('rSettings',this.props.boolVal);
     Office.context.roamingSettings.saveAsync();
   }

  public render(): React.ReactElement<{}> {

    var str = JSON.stringify(this.props.boolVal);
    var str2 = JSON.stringify(Office.context.roamingSettings.get('rSettings'));
    console.log(JSON.stringify(Office.context.roamingSettings.get('test')));
    console.log('boolVal:' + str);

    return(

    <div>
    <TestForm onSubmit={(formValues)=>{console.log(formValues)}} />
    <p>Value is:{str}</p>
    <button onClick={this.update} > Reverse </button>
    <p>Saved val is: {str2}</p>
    <button onClick={this.persist} > Perists </button>
    </div>);
  }
 }

  /*
state:{
  "ITempState":{"value":false},
  "form":{"simpleForm":{"_asyncValidating":false,"_initialized":false,"_submitting":false,"_submitFailed":false,"testField":{"visited":true,"_isFieldValue":true,"value":"gegegeff","touched":true}}}
}
  */

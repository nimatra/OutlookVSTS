/// <reference path="../../office.d.ts" />
import * as React from 'react';
import { Provider, connect} from 'react-redux';
import {ITempState} from './../Redux/TestReducer';
import { IBoolAction, reverse} from './../Redux/TestActions';
import {Component} from 'react';
import { reduxForm } from 'redux-form';


export const fields = ['testField'];

export class TestForm extends React.Component<any, any> {


  public render(): React.ReactElement<{}> {
    const {fields: {testField}, handleSubmit} = this.props //can remove handleSubmit

    return(<form onSubmit = {handleSubmit}>

    <div>
    <label> TestField </label>
    <input type="text" placeholder ="enter text" {...testField}/>
    <button> Submit </button>
    </div>

    </form>);
  }
}
  export default reduxForm({
    form: 'simpleForm',
    fields
 })(TestForm)



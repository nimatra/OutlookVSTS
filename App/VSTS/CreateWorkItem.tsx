/// <reference path="../../office.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
//import { Description } from './Description';
//import { Title } from './Title';
import { Save } from './Save';
import { TypeDropdown } from './TypeDropdown';
//import { TestTitle } from './TestTitle';
import { Gear } from './Gear';
import { testState, initalState } from './Reducers/ReducersET';
import { changeTitle, changeDescription, changeAddAsAttachment } from '../Reducers/ActionsET';
//import Select from 'react-select';


//import SimpleForm from './SimpleForm';

export interface ICreateProp {
    dispatch?: any;
    wi_type?: string;
    title?: string;
    firstTime?: boolean;
    description?: string;
    addasattachment?: boolean;
}

function mapStateToProps (state: any): ICreateProp  {
  console.log('mapStateToProps' +JSON.stringify(state));
  return {wi_type: state.testState.wi_type, title: state.testState.title, description: state.testState.description, addasattachment: state.testState.addasattachment, 
          firstTime: state.testState.firstTime} ;
   }

@connect (mapStateToProps)

export class CreateWorkItem extends React.Component<ICreateProp, {}> {

  isReady : boolean; // set to false

  private Initialize():void{
    this.isReady = true;
    this.forceUpdate(); //re-renders page
  }

  public constructor() {
    super(); //required first line
    this.isReady = false; //should be false, but doesnt reload
    this.Initialize = this.Initialize.bind(this);
    Office.initialize = this.Initialize;
  }


public handlechangeTitle(event) : void{
  this.props.dispatch(changeTitle (event.target.value, this.props.firstTime))
}

public handlechangeDescription (event) : void {
  this.props.dispatch(changeDescription (event.target.value))
}

public handlechangeAddAsAttachment () : void {
  this.props.dispatch(changeAddAsAttachment(this.props.addasattachment))
}

public render(): React.ReactElement<{}> {

  console.log('got to create pg');
if (this.isReady == false)
  return (<div>loading!!</div>);

  var normalizedSubject = Office.context.mailbox.item.normalizedSubject;
  var currentTitle: string = this.props.title
  if (currentTitle == "" && this.props.firstTime)
     this.props.title = normalizedSubject;

  var headings = {
    font: '14px arial, ms-segoe-ui-semibold'
  }

  var addasattachment = {
    font: '14px arial, ms-segoe-ui'
  }

  var title = {
  width: '250px',
  height: '18px',
  align: 'left',
  resize: 'none',
  font: '14px arial, ms-segoe-ui', 
  }

  var scroll = {
    width: '250px',
    height: '150px',
    overflow: 'auto',
    align: 'left',
    font: '14px arial, ms-segoe-ui',
    resize: 'none'
  };

  return (<div>

<Gear />
<TypeDropdown/>

<br/>
<h1 style = {headings}> TITLE </h1>
    <input type="text" style={title} id= "titleval" value={this.props.title} onChange={this.handlechangeTitle.bind(this)}  />
<br/> <br/>
<div style = {headings}> DESCRIPTION </div>
  <label style = {addasattachment} ><input type="checkbox" id="cbox" onClick = {this.handlechangeAddAsAttachment.bind(this)} checked = "checked"/> Add Email as Attachment </label> <br/>
  <textarea style={scroll} id = "description" value={this.props.description} onChange={this.handlechangeDescription.bind(this)}> </textarea>

<br/> <br/>
<div style = {headings}> CLASSIFICATION </div>
Mirandas Components here :)
<Save/>

</div>);
  }
 }

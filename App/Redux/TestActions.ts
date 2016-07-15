/// <reference path="../../typings/tsd.d.ts" />


//action types

//action type
export interface IBoolAction{
  type: string,
  value: boolean
}

export interface IProfileAction{
  type:string,
  value: any
}
//action creator
export function reverse(val:boolean): IBoolAction {
  return {
    type: 'REVERSE',
    value: !val
  };
}

export function updateProfile(val:any): IProfileAction{
  return {
    type: 'UPDATE_PROFILE',
    value: val
  }
}

/*export function fetchProfile(){
    var url = 'https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=1.0';
    //var memberID = 'temp';
    return fetch(url).then(response => response.json()).then(json =>
        dispatch(updateProfile(json))
        console.log(json));
}*/













/*import { IField } from './workItemModel';

export enum ACTION { CreateWorkItem, ChangeWorkItemType }

export interface IWorkItemAction {
  type: ACTION;
  workItemType: string;
  workItemFields: IField[];
}

export function createWorkItem(type: string, fields: IField[]) : IWorkItemAction {
  return { type: ACTION.CreateWorkItem, workItemType: type, workItemFields: fields };
}

export function changeWorkItemType(type: string) : IWorkItemAction {
  return { type: ACTION.ChangeWorkItemType, workItemType: type, workItemFields: null };
}*/
/// <reference path="../../typings/tsd.d.ts" />
import { Auth, AuthState } from '../auth';

export interface IUser{
    authState: AuthState;
    authToken : string;
    user: string;
    returning: boolean
}

















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
/// <reference path="../../typings/tsd.d.ts" />

/*
actions types
*/
export const UpdateAuthState = 'UPDATE_AUTHSTATE'
export const PrevPage = 'GET_PREVPAGE'




















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
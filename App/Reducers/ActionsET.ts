//export const NEW_TITLE = 'NEW_TITLE'
//export const NEW_DESCRIP = 'NEW_DESCRIP'

export enum ACTION {NEW_TITLE}

export interface ITestingAction {
  type: ACTION;
  value: string;
}

 export function changeTitle (value : string): ITestingAction {
   return {type: ACTION.NEW_TITLE, value};
 }

{/*
export function addTitle (value) {
  return {type: NEW_TITLE, value}
}

export function addDescrip (value) {
  return {type: NEW_DESCRIP, value}
}
*/}

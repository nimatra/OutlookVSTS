export const NEW_TITLE = 'NEW_TITLE'
export const NEW_DESCRIP = 'NEW_DESCRIP'

export enum ACTION { ChangeTest }

export interface ITestingAction {
  type: ACTION;
  testtype: string;
}

export interface ITestingState {
  type: string;
  field: string;
}

export function changetest (type: string) :ITestingAction {
  return { type: ACTION.ChangeTest, testtype: type }
}

{/*
export function addTitle (text) {
  return {type: NEW_TITLE, text}
}

export function addDescrip (text) {
  return {type: NEW_DESCRIP, text}
}
*/}

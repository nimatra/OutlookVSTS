//export const NEW_TITLE = 'NEW_TITLE'

export enum ACTION {NEW_TITLE}

export interface ITestingAction {
  type: ACTION;
  title: string;
}

 export function changeTitle (title : string): ITestingAction {
   return {type: ACTION.NEW_TITLE, title};
 }

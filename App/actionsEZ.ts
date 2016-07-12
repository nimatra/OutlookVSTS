/// <reference path="../typings/tsd.d.ts" />

export interface IEditText {
  type: string;
  value: string;
}

export function writeValue(val: string): IEditText {
  console.log('in writevalue');
  return {
    type: 'WriteText',
    value: val
  };
}

// export interface IEditBool {
//   type: ACTION;
//   foo: boolean;
// }

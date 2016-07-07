/**
 * Brute force TypeScript type definition used by Office.js.
 */

declare module Office {
  export function initialize():any;

  export var cast:any;
  export var context:any;

  export namespace MailboxEnums{
    export class ItemNotificationMessageType{
      static ProgressIndicator: string;
      static InformationalMessage: string;
      static ErrorMessage: string;
    }
  }
}

declare module 'office' {
  var out:typeof Office;
  export = out;
}


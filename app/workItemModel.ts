export interface IField {
    label: string;
    value: any;
    type: string;
}

export interface IWorkItemState {
    type: string; //type of the work item
    fields: IField[]; //fields for the specified type
}


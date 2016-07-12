/// <reference path='../../office.d.ts' />

const ACCOUNT_STRING: string = 'account';
const PROJECT_STRING: string = 'project';
const TEAM_STRING: string = 'team';

export class RoamingSettings {


    public account: string;
    public project: string;
    public team: string;

    public constructor() {
        this.account = Office.context.roamingSettings.get(ACCOUNT_STRING);
        this.project = Office.context.roamingSettings.get(PROJECT_STRING);
        this.team = Office.context.roamingSettings.get(TEAM_STRING);
    }

    public setRoamingSettings(account: string, project: string, team: string): void {
        this.account = account;
        this.project = project;
        this.team = team;
        Office.context.roamingSettings.set(ACCOUNT_STRING, account);
        Office.context.roamingSettings.set(PROJECT_STRING, project);
        Office.context.roamingSettings.set(TEAM_STRING, team);
        Office.context.roamingSettings.saveAsync();
    }
}

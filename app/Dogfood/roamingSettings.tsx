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
        if (this.account == null) {
            this.account = 'O365Exchange';
        }
        this.project = Office.context.roamingSettings.get(PROJECT_STRING);
        if (this.project == null) {
            this.project = 'Outlook Services';
        }
        this.team = Office.context.roamingSettings.get(TEAM_STRING);
        if (this.team == null) {
            this.team = 'Ecosystem - Ext Core';
        }
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

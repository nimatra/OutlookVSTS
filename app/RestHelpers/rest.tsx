import { Stage } from '../Reducers/ActionsET';

export class UserProfile {
    public displayName: string;
    public publicAlias: string;
    public emailAddress: string;
    public coreRevision: number;
    public timeStamp: string;
    public id: string;
    public revision: string;

    public constructor(blob: any) {
        this.displayName = blob.displayName;
        this.publicAlias = blob.publicAlias;
        this.id = blob.id;
    }
}

export class Project {
    public id: string;
    public name: string;
    public description: string;
    public url: string;
    public state: string;

    public constructor(blob: any) {
        this.id = blob.id;
        this.name = blob.name;
        this.description = blob.description;
        this.url = blob.url;
        this.state = blob.state;
    }

}

export class Account {
    public id: string;
    public name: string;
    public uri: string;

    public constructor(blob: any) {
        this.id = blob.accountId;
        this.name = blob.accountName;
        this.uri = blob.accountUri;
    }
}

export class Team {
    public id: string;
    public name: string;

    public constructor(blob: any) {
        this.id = blob.id;
        this.name = blob.name;
    }
}

interface IRestCallback { (output: string): void; }
interface IItemCallback { (item: string): void; }
interface IUserProfileCallback { (profile: UserProfile): void; }
interface IProjectsCallback { (projects: Project[]): void; }
interface IAccountsCallback { (accounts: Account[]): void; }
interface ITeamsCallback { (teams: Team[]): void; }

export class Rest {

    private static userProfile: UserProfile;
    private static accounts: Account[];

    public static getItem(user: string, item: number, callback: IItemCallback): void {
        this.makeRestCallWithArgs('getItem', user, { fields: 'System.TeamProject', ids: item, instance: 'o365exchange' }, (output) => {
            callback(output);
        });
    }

    public static getUserProfile(user: string, callback: IUserProfileCallback): void {
        this.makeRestCall('me', user, (output) => {
            this.userProfile = new UserProfile(JSON.parse(output));
            callback(this.userProfile);
        });
    }

    public static getAccounts(user: string, callback: IAccountsCallback): void {
        if (this.userProfile) { // if user profile already exists
            this.makeRestCallWithArgs('accounts', user, { memberId: this.userProfile.id }, (output) => {
                let parsed: any = JSON.parse(output);
                this.accounts = [];
                parsed.value.forEach(account => {
                    this.accounts.push(new Account(account));
                });
                callback(this.accounts);
            });
        } else { // get user profile and come back
            this.getUserProfile(user, (profile: UserProfile) => {
                this.getAccounts(user, callback);
            });
        }
    }

    public static getProjects(user: string, accountName: string, callback: IProjectsCallback): void {
        this.makeRestCallWithArgs('projects', user, { account: accountName }, (output) => {
            let parsed: any = JSON.parse(output);
            let projects: Project[] = [];
            parsed.value.forEach(project => {
                projects.push(new Project(project));
            });
            callback(projects);
        });
    }

    public static getTeams(user: string, projectName: string, accountName: string, callback: ITeamsCallback): void {
        this.makeRestCallWithArgs('getTeams', user, { account: accountName, project: projectName }, (output) => {
            let parsed: any = JSON.parse(output);
            let teams: Team[] = [];
            parsed.value.forEach(team => {
                teams.push(new Team(team));
            });
            callback(teams);
        });
    }

    public static getTeamAreaPath(user: string, account: string, project: string, teamName: string, callback: IRestCallback): void {
        this.getTeams(user, project, account, (teams: Team[]) => {
            let guid: string;
            teams.forEach(team => {
                if (team.name === teamName) {
                    guid = team.id;
                }
            });
            this.makeRestCallWithArgs('getTeamField', user, {account: account, project: project, team: guid}, (output) => {
                let parsed: any = JSON.parse(output);
                if (parsed.field.referenceName !== 'System.AreaPath') {
                    // we don't support teams that don't use area path as their team field
                    callback('');
                } else {
                    callback(parsed.defaultValue);
                }
            });
        });
    }

    public static createBug(user: string, options: any, title: string, body: string, callback: IRestCallback): void {
        this.createBugCall(user, options, title, body, callback);
    }

    public static createBugCall(user: string, options: any, title: string, body: string, callback: IRestCallback): void {
        this.getTeamAreaPath(user, options.account, options.project, options.team, (areaPath) => {
            this.makeRestCallWithArgs(
                'newBug',
                user,
                { account: options.account, areaPath: areaPath, body: body, project: options.project, title: title },
                (output) => {
                    console.log(output);
                    callback(output);
                });
        });
    }

   public static createWorkItem (user: string, account: string, project: string, workItemType: string, stage: Stage,
                                 title: string, description: string, callback: IRestCallback): void {
        console.log('got to createWorkItem function');
        this.makeRestCallWithArgs('createWorkItem',
                                  user,
                                  { account: account, description: description, project: project, stage: Stage,
                                    title: title, workItemType: workItemType},
                                  (output) => {callback(output); });
    }

    private static makeRestCall(name: string, user: string, callback: IRestCallback): void {
        $.get('./rest/' + name + '?user=' + user, callback);
    }

    private static makeRestCallWithArgs(name: string, user: string, args: any, callback: IRestCallback): void {
        console.log('got to restcallwithargs');
        const path: string = './rest/' + name + '?user=' + user + '&' + $.param(args);
        console.log('got to restcallwithargs part 2' + path);
        $.get(path, callback);
    }

}

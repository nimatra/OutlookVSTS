/// <reference path='../../office.d.ts' />
import * as React from 'react';
import { Provider } from 'react-redux';
import { Auth, AuthState } from '../auth';
import {Authenticate} from '../Authenticate/authenticate';
import { ButtonField } from '../components/fields/buttonField';
import { CheckboxField } from '../components/fields/checkboxField';
import { HtmlField } from '../components/fields/htmlField';
import { SelectField } from '../components/fields/selectField';
import { StringField } from '../components/fields/stringField';
import { Rest, Account, Project, Team } from '../RestHelpers/rest';
import { RoamingSettings } from './roamingSettings';

interface IHandleEmailCallback { (id: string): void; }

interface IDogfoodState {
  authState?: AuthState;
  user?: string;
  projects?: string[];
  accounts?: string[];
  teams?: string[];
  project?: string;
  account?: string;
  team?: string;
  title?: string;
  body?: string;
  attachEmail?: boolean;
}

export class Dogfood extends React.Component<{}, IDogfoodState> {

  private messageKey: string = 'VSTS Bug Creator';
  private notifier: any;
  private roamingSettings: RoamingSettings;

  public constructor() {
    super();
    this.state = {
      accounts: [],
      attachEmail: false,
      authState: AuthState.None,
      projects: [],
      teams: [],
      user: '' };
    Office.initialize = this.Initialize.bind(this);
  }

  public Initialize(): void {
    console.log('Initing');
    this.notifier = Office.context.mailbox.item.notificationMessages;
    this.roamingSettings = new RoamingSettings();
    this.setState({
      account: this.roamingSettings.account,
      project: this.roamingSettings.project,
      team: this.roamingSettings.team });
    this.updateAuth();
  }

  public updateAuth(): void {
    let user: string;
    if (this.state.user) {
      user = this.state.user;
    }    else {
      user = Office.context.mailbox.userProfile.emailAddress;
    }
    Auth.getAuthState(user, (state: AuthState) => {
      this.setState({
        authState: state,
        user: user });
      if (state === AuthState.Authorized) {
        this.populateAccounts();
      }
    });
  }

  public populateAccounts(): void {
    Rest.getAccounts(this.state.user, (accounts: Account[]) => {
      let accountNames: string[] = [];
      accounts.forEach(account => {
        accountNames.push(account.name);
      });
      let account: string = this.roamingSettings.account;
      this.setState({ account: account, accounts: accountNames });
      if (account != null) {
        this.populateProjects(account);
      }
    });
  }

  public populateProjects(account: string): void {
    Rest.getProjects(this.state.user, account, (projects: Project[]) => {
      let projectNames: string[] = [];
      projects.forEach(project => {
        projectNames.push(project.name);
      });
      let project: string = this.roamingSettings.project;
      this.setState({ project: project, projects: projectNames });
      if (project != null) {
        this.populateTeams(project, account);
      }
    });
  }

  public populateTeams(project: string, account: string): void {
    Rest.getTeams(this.state.user, project, account, (teams: Team[]) => {
      let teamNames: string[] = [];
      teams.forEach(team => {
        teamNames.push(team.name);
      });
      let team: string = this.roamingSettings.team;
      this.setState({ team: team, teams: teamNames });
    });
  }

  public notificationMessage(type: any, message: string): void {
    let types: any = Office.MailboxEnums.ItemNotificationMessageType;
    let output: any = {message: message, type : type};
    if (type === types.InformationalMessage) {
      output.persistent = false;
      output.icon = '';
    }
    return output;
  }

  public onAccountSelectChanged(selected: string): void {
    this.setState({ account: selected, project: '', team: '', teams: [] });
    this.populateProjects(selected);
  }

  public onProjectSelectChanged(selected: string): void {
    this.setState({ project: selected, team: '', teams: [] });
    this.populateTeams(selected, this.state.account);
  }

  public onTeamSelectChanged(selected: string): void {
    this.setState({ team: selected });
  }

  public onTitleChanged(event: any): void {
    this.setState({ title: event.target.value });
  }

  public onBodyChanged(event: any): void {
    this.setState({ body: event.target.value });
  }

  public onAttachChange(event: any): void {
    this.setState({ attachEmail: event.target.value });
  }

  public fillTitle(): void {
    this.setState({ title: Office.context.mailbox.item.subject });
  }

  public fillBody(): void {
    Office.context.mailbox.item.body.getAsync('text', (asyncResult) => {
      if (asyncResult.error) {
        console.log(asyncResult.error);
      }
      this.setState({ body: asyncResult.value.trim() });
    });
  }

  public createTask(): void {

    // shortcuts to constructs
    let types: any = Office.MailboxEnums.ItemNotificationMessageType;
    let state: IDogfoodState = this.state;

    // alert the user that we're working
    this.notifier.addAsync(this.messageKey, this.notificationMessage(types.ProgressIndicator, 'Creating Bug'));
    this.roamingSettings.setRoamingSettings(state.account, state.project, state.team);

    // ensure we have all the data we need
    if (state.team && state.title && state.body) {

      let options: any = { account: state.account, project: state.project, team: state.team};

      // handle extra calls if we need to attach the email
      this.handleEmailAttachment((id: string) => {

        options.id = id;
        Rest.createBug(state.user, options, state.title, state.body, (output) => {
          let parsed: any = JSON.parse(output);
          this.notifier.replaceAsync(this.messageKey, this.notificationMessage(types.ProgressIndicator, 'Created bug #' + parsed.id));
        });
      });
    } else {
      this.notifier.replaceAsync(this.messageKey, this.notificationMessage(types.ErrorMessage, 'Bug must have a team, title, and body'));
    }
  }

  public handleEmailAttachment(callback: IHandleEmailCallback): void {
    if (this.state.attachEmail) {
      // _TODO: Email Attachment Code
      callback('');
    } else {
      callback('');
    }
  }

  public render(): React.ReactElement<Provider> {
    const state: AuthState = this.state.authState;
    const user: string = this.state.user;
    const accounts: string[] = this.state.accounts;
    const projects: string[] = this.state.projects;
    const teams: string[] = this.state.teams;
    const title: string = this.state.title;
    const body: string = this.state.body;

    const account: string = this.state.account;
    const project: string = this.state.project;
    const team: string = this.state.team;

    switch (state) {
      case AuthState.None: // we have to wait for Office to initialize, so show a waiting state
        return (<div className='ms-font-m'>Loading</div>);
      case AuthState.Request: // office has initialized, but we don't have auth for this user, pass them to the auth flow
        return (<Authenticate user={user} pollInterval={2000} refresh={this.updateAuth.bind(this) } />);
      case AuthState.Authorized: // we have auth for this user, go ahead and show something cool
            let items: JSX.Element[] = [<SelectField label='Account:'
                                                     options={accounts}
                                                     onChange={this.onAccountSelectChanged.bind(this)}
                                                     selected={account} />];
            if (projects.length > 0) {
              items.push(<SelectField label='Project:'
                                      options={projects}
                                      onChange={this.onProjectSelectChanged.bind(this)}
                                      selected={project} />);
            }
            if (teams.length > 0) {
              items.push(<SelectField label='Team:'
                                      options={teams}
                                      onChange={this.onTeamSelectChanged.bind(this)}
                                      selected={team} />);
            }
        return (<div>
          <h1 className='ms-font-su'>Create a bug</h1>
          {items}
          <StringField label='Bug Title' onChange={this.onTitleChanged.bind(this) } value={title} />
          <ButtonField primary={false} onClick={this.fillTitle.bind(this) } label='Use Email Subject' />
          <HtmlField onChange={this.onBodyChanged.bind(this) } label='Bug Description' text={body}/>
          <ButtonField primary={false} onClick={this.fillBody.bind(this) } label='Use Email Body' /> <br />
          <CheckboxField onChange={this.onAttachChange.bind(this) } label='Attach email to bug?' /> <br/ >
          <ButtonField primary={true} onClick={this.createTask.bind(this) } label='Create' /><br />

        </div>);
      default:
        return(<div className='ms-font-m'>This should never happen</div>);
    }
  }
}

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
      this.setState({ accounts: accountNames });
    });
  }

  public populateProjects(account: string): void {
    Rest.getProjects(this.state.user, account, (projects: Project[]) => {
      let projectNames: string[] = [];
      projects.forEach(project => {
        projectNames.push(project.name);
      });
      this.setState({ projects: projectNames });
    });
  }

  public populateTeams(project: string, account: string): void {
    Rest.getTeams(this.state.user, project, account, (teams: Team[]) => {
      let teamNames: string[] = [];
      teams.forEach(team => {
        teamNames.push(team.name);
      });
      this.setState({ teams: teamNames });
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

    switch (state) {
      case AuthState.None: // we have to wait for Office to initialize, so show a waiting state
        return (<div>Loading</div>);
      case AuthState.Request: // office has initialized, but we don't have auth for this user, pass them to the auth flow
        return (<Authenticate user={user} pollInterval={2000} refresh={this.updateAuth.bind(this) } />);
      case AuthState.Authorized: // we have auth for this user, go ahead and show something cool
        return (<div>
          <h1>Create a bug</h1>
          <SelectField label='Account:' options={accounts} onChange={this.onAccountSelectChanged.bind(this) }/>
          <SelectField label='Project:' options={projects} onChange={this.onProjectSelectChanged.bind(this) }/>
          <SelectField label='Team:' options={teams} onChange={this.onTeamSelectChanged.bind(this) }/>
          <StringField label='Bug Title' onChange={this.onTitleChanged.bind(this) } value={title} />
          <ButtonField primary={false} onClick={this.fillTitle.bind(this) } label='Use Email Subject' />
          <HtmlField onChange={this.onBodyChanged.bind(this) } label='Bug Description' text={body}/>
          <ButtonField primary={false} onClick={this.fillBody.bind(this) } label='Use Email Body' /> <br />
          <CheckboxField onChange={this.onAttachChange.bind(this) } label='Attach email to bug?' /> <br/ ><br />
          <ButtonField primary={true} onClick={this.createTask.bind(this) } label='Create' /><br />

        </div>);
      default:
        return(<div>This should never happen</div>);
    }
  }
}

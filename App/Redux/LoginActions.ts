/// <reference path="../../typings/tsd.d.ts" />

export interface ISettingsInfo {
  label: string;
  value: string;
}

export interface ISettingsAction {
  type: 'DEFAULT_SETTINGS';
  account: string;
  project: string;
  team: string;
}

export interface ISettingsListsAction {
  type: 'CURRENT_LISTS';
  accountList: ISettingsInfo[];
  projectList: ISettingsInfo[];
  teamList: ISettingsInfo[];
}

export interface ISettingsAndListsAction {
  type: 'CURRENT_SETTINGS';
  lists: ISettingsListsAction;
  settings: ISettingsAction;
}

export function updateSettingsAndListsAction(accountTemp: string, projectTemp: string, teamTemp: string,
                                       accountList: ISettingsInfo[], projectList: ISettingsInfo[],
                                       teamList: ISettingsInfo[]): ISettingsAndListsAction {
  console.log('updateSettingsAndLists');
  return {
      lists: {
        type: 'CURRENT_LISTS',
        accountList: accountList,
        projectList: projectList,
        teamList: teamList,
      },
      settings: {
        type: 'DEFAULT_SETTINGS',
        account: accountTemp,
        project: projectTemp,
        team: teamTemp,
      },
      type: 'CURRENT_SETTINGS',
  };
}

export interface IUserProfileAction {
  type: string;
  displayName: string;
  email: string;
  memberID: string;
}

export function updateUserProfileAction(name: string, mail: string, id: string): IUserProfileAction {
  console.log('profile actions:' + name + mail + id);
  return{
      displayName: name,
      email: mail,
      memberID: id,
      type: 'USER_PROFILE',
  };
}
















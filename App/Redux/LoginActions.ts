/// <reference path="../../typings/tsd.d.ts" />

export interface ISettings {
  type: string;
  account: string;
  project: string;
  team: string;
}

export interface ISettingsInfo {
  label: string;
  value: string;
}

export function updateSettings(accountTemp: string, projectTemp: string, teamTemp: string): ISettings {
  console.log('' + accountTemp + projectTemp + teamTemp);
  return{
    account: accountTemp,
    project: projectTemp,
    team: teamTemp,
    type: 'DEFAULT_SETTINGS',
  };
}

export interface ISettingsLists {
  type: string;
  accountList: ISettingsInfo[];
  projectList: ISettingsInfo[];
  teamList: ISettingsInfo[];
}

export function updateSettingsLists(accountTemp: ISettingsInfo[], projectTemp: ISettingsInfo[], teamTemp: ISettingsInfo[]): ISettingsLists {
  return{
    accountList: accountTemp,
    projectList: projectTemp,
    teamList: teamTemp,
    type: 'DEFAULT_SETTINGS',
  };
}


export interface IUserProfile{
  type: string;
  displayName: string;
  email: string;
  memberID: string;
}

export function updateUserProfile(name: string, mail: string, id: string): IUserProfile {
  return{
      displayName: name,
      email: mail,
      memberID: id,
      type: 'USER_PROFILE',
  };
}















/// <reference path="../../typings/tsd.d.ts" />
import { Auth} from '../auth';

//action types
export interface ISettings{
  type: string,
  account: string,
  project: string,
  team: string
}

export interface ISettingsInfo{
  type:string,
  name:string,
  url:string,
  id:string
}

export function updateSettings(accountTemp:string, projectTemp:string, teamTemp: string):ISettings{
  return{
    type: 'DEFAULT_SETTINGS',
    account: accountTemp,
    project: projectTemp,
    team: teamTemp
  };
}

export const accountList: ISettingsInfo[] = [];
export const projectList: ISettingsInfo[] = [];
export const teamList: ISettingsInfo[] = [];

export interface IUserProfile{
  type: string,
  displayName: string,
  email: string,
  memberID: string
}

export function updateUserProfile(name:string, mail: string, id:string):IUserProfile{
  return{
      type: 'USER_PROFILE',
      displayName: name,
      email: mail,
      memberID: id
  };
}















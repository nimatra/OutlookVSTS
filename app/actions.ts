/// <reference path="../typings/tsd.d.ts" />
export enum ACTION { Photos_ReceivedFromServer, AddPhoto }
import { AnState } from './Store/AnState';
import thunk from 'redux-thunk';

export interface IPhotoAction {
  type: ACTION;
  photo?: string;
}

export interface IGetAllPhotosAction {
  type: ACTION;
  photos?: string[];
}

export function GetPhotosFromServer() {
  return dispatch => {
      dispatch(updatePhotos(['https://scontent-sea1-1.xx.fbcdn.net/v/t1.0-9/10501792_10153349365714299_8175611118427912525_n.jpg?oh=a18803b150e22da8f738ad3509f35302&oe=580A78F8']));
    //get images from server
  };
}


export function addPhoto(photo: string): IPhotoAction {
  return {
    photo: photo,
    type: ACTION.AddPhoto,
  };
}
export function updatePhotos(json: string[]): IGetAllPhotosAction {
  return {
    photos: json,
    type: ACTION.Photos_ReceivedFromServer,
  };
}



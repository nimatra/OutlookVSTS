/// <reference path='../typings/tsd.d.ts' />

import { Reducer, combineReducers } from 'redux';
import { AnState } from './Store/AnState';
import { IGetAllPhotosAction, IPhotoAction, ACTION } from './actions';

export const initialState: AnState = {
  allPhotos: <string[]>[],
};

function photosReducer(state: string[] = initialState.allPhotos, action: IGetAllPhotosAction): string[] {
  switch (action.type) {
    case ACTION.Photos_ReceivedFromServer:
      return Object.assign(
        <string[]>[],
        state,
        action.photos
      );
    default:
      return state;
  }
}

export const anReducer: Reducer = combineReducers({
  allPhotos: photosReducer,
});

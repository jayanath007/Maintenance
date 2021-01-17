import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as mainMenu from './main-menu.reducer';

declare interface State {
    mainMenu: mainMenu.State;
}

export const featureName = 'dpsMainLayout';

export const reducers = {
    mainMenu: mainMenu.reducer
};

export const getRootState = createFeatureSelector<State>(featureName);

export const getMainMenuState = createSelector(getRootState, (state) => state.mainMenu);
export const getMainMenuItems = createSelector(getMainMenuState, mainMenu.getMainMenuItems);


import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as core from './core.reducer';

declare interface State {
    core: core.State;
}

export const featureName = 'dpsCore';

export const reducers = {
    core: core.reducer
};

export const getRootState = createFeatureSelector<State>(featureName);

export const getCoreState = createSelector(getRootState, (state) => state.core);
export const getDepartments = createSelector(getCoreState, core.getDepartments);
export const getDomains = createSelector(getCoreState, core.getDomains);
export const getSelectedDomain = createSelector(getCoreState, core.getSelectedDomain);

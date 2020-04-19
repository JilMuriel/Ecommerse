import {createSelector} from 'reselect';

const selectDirectory = state => state.directory;

export const selectDerectorySections = createSelector(
    [selectDirectory],
    directory => directory.sections
)
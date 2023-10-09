import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_SHORT_PROJECT_NOTE } from 'store/types/detailedTypes';

export const useDetailedState = () => useSelector(
  (rootState: { detailed: any }) => rootState.detailed
);

export const useDetailedDispatch = () => {
  const dispatch = useDispatch();

  const _updateShortProjectNote = useCallback((short_project_note) => {
     dispatch({
        type: UPDATE_SHORT_PROJECT_NOTE,
        short_project_note
     });
  }, [dispatch]);

  return {
    updateShortProjectNote: _updateShortProjectNote,
  }
};

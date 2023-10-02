import { useSelector, useDispatch } from 'react-redux';
import { getFinancialData, setClickOpenPopup } from '../store/actions/financialActions';
import { useCallback } from 'react';

export const useFinancialState = () =>
  useSelector((state: { financial: any }) => state.financial);

export const useFinancialDispatch = () => {
  const dispatch = useDispatch();

  const _setClickOpenPopup = useCallback((tabKey: any) => {
    dispatch(setClickOpenPopup(tabKey));
  }, [dispatch]);

  return {
    getFinancialData: (id: number, filters: any) => {
      dispatch(getFinancialData(id, filters));
    },
    setClickOpenPopup: _setClickOpenPopup
  };
};

import { useSelector, useDispatch } from 'react-redux';
import { getFinancialData } from '../store/actions/financialActions';

export const useFinancialState = () =>
  useSelector((state: { financial: any }) => state.financial);

export const useFinancialDispatch = () => {
  const dispatch = useDispatch();
  return {
    getFinancialData: (id: number, filters: any) => {
      dispatch(getFinancialData(id, filters));
    },
  };
};

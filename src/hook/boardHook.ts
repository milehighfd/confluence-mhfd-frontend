import { useSelector, useDispatch } from 'react-redux';
import {
  setIsOpenModal
} from '../store/actions/boardActions';

export const useBoardState = () => useSelector(
  (state: { board: any }) => state.board
);

export const useBoardDispatch = () => {
  const dispatch = useDispatch();
  return {
    setIsOpenModal: (isOpenModal: boolean) => {
      dispatch(setIsOpenModal(isOpenModal));
    }
  };
};

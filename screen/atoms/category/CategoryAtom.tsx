import {atom} from 'recoil';

export const currentCategoryState = atom<'view' | 'select'>({
  key: 'currentCategoryState',
  default: 'view',
});

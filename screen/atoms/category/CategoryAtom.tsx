import {atom} from 'recoil';

export const currentCategoryScreenState = atom<
  'view' | 'selectAge' | 'selectDifficulty' | 'selectCategory'
>({
  key: 'currentCategoryScreenState',
  default: 'view',
});

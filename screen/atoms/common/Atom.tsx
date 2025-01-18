import {atom} from 'recoil';

export const ageState = atom<number>({
  key: 'ageState',
  default: 13,
});

// 추후 이 3개는 데이터베이스 작업 후 임시 데이터로 함
export const ageElementState = atom<Set<string>>({
  key: 'ageElementState',
  default: new Set<string>(),
});

export const difficultyElementState = atom<Set<string>>({
  key: 'difficultyElementState',
  default: new Set<string>(),
});

export const categoryElementState = atom<Set<string>>({
  key: 'categoryElementState',
  default: new Set<string>(),
});

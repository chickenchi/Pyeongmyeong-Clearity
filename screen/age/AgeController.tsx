import {ageElementState, ageState} from '@atoms/common/Atom';
import {useEffect} from 'react';
import {useRecoilState} from 'recoil';

export const AgeController = () => {
  const [age] = useRecoilState(ageState);
  const [ageType, setAgeType] = useRecoilState(ageElementState);

  const ageSet = new Set(ageType);

  useEffect(() => {
    if (!ageType.size) {
      switch (true) {
        case age >= 0 && age <= 7:
          ageSet.add('~7세');
          break;
        case age >= 8 && age <= 13:
          ageSet.add('초등');
          break;
        case age >= 14 && age <= 16:
          ageSet.add('중등');
          break;
        case age >= 17 && age <= 19:
          ageSet.add('고등');
          break;
        default:
          ageSet.add('일반');
          break;
      }

      setAgeType(ageSet);
    }
  }, [age]);

  return <></>;
};

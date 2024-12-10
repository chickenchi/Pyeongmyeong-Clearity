import React, {createContext, useContext, useState} from 'react';

interface StartPopupContextType {
  type: string;
  showStartPopup: (type: string) => void;
  hideStartPopup: () => void;
}

const StartPopupContext = createContext<StartPopupContextType | null>(null);

export const useStartPopup = () => {
  const context = useContext(StartPopupContext);
  if (!context) {
    throw new Error('useType must be used within an TypeProvider');
  }
  return context;
};

export const StartPopupProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [type, setType] = useState<StartPopupContextType['type']>('');

  const showStartPopup = (typeData: StartPopupContextType['type']) =>
    setType(typeData);
  const hideStartPopup = () => setType(null);

  return (
    <StartPopupContext.Provider value={{type, showStartPopup, hideStartPopup}}>
      {children}
    </StartPopupContext.Provider>
  );
};

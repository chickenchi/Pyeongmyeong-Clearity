import React, {createContext, useContext, useState} from 'react';

interface CustomAgeContextType {
  customAge: {onConfirm: () => void; onCancel: () => void};
  showCustomAge: (customAge: {
    onConfirm: () => void;
    onCancel: () => void;
  }) => void;
  hideCustomAge: () => void;
}

const CustomAgeContext = createContext<CustomAgeContextType | null>(null);

export const useCustomAge = () => {
  const context = useContext(CustomAgeContext);
  if (!context) {
    alert('asdf');
    throw new Error('useCustomAge must be used within an CustomAgeProvider');
  }
  return context;
};

export const CustomAgeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [customAge, setCustomAge] =
    useState<CustomAgeContextType['customAge']>(null);

  const showCustomAge = (customAgeData: CustomAgeContextType['customAge']) =>
    setCustomAge(customAgeData);
  const hideCustomAge = () => setCustomAge(null);

  return (
    <CustomAgeContext.Provider
      value={{customAge, showCustomAge, hideCustomAge}}>
      {children}
    </CustomAgeContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';

interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface DateRangeContextProps {
  value: DateRange;
  setValue: (newValue: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<DateRange>({
    startDate: null,
    endDate: null
  });

  return (
    <DateRangeContext.Provider value={{ value, setValue }}>{children}</DateRangeContext.Provider>
  );
};

export const useDateRange = (): DateRangeContextProps => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
};

import dayjs from 'dayjs';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const [params] = useSearchParams();
  const startDate = params.get('startDate');
  const endDate = params.get('endDate');
  const [value, setValue] = useState<DateRange>({
    startDate: startDate ?? dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
    endDate: endDate ?? dayjs(new Date()).format('YYYY-MM-DD')
  });

  useEffect(() => {
    if (!startDate || !endDate) {
      setValue({
        startDate: startDate ?? dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
        endDate: endDate ?? dayjs(new Date()).format('YYYY-MM-DD')
      });
    }
  }, [startDate, endDate]);

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

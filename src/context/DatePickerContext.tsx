import dayjs from 'dayjs';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface DateRange {
  startDate: string | null;
  endDate: string | null;
}

interface DateRangeContextProps {
  value: DateRange;
  setValue: (newValue: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'dateRange';

export const DateRangeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialValue = () => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      try {
        return JSON.parse(storedValue); // LocalStorage-dagi qiymatni yuklash
      } catch (error) {
        console.error('Error parsing localStorage:', error);
      }
    }
    // Agar localStorage bo'sh bo'lsa, standart qiymatlarni qaytarish
    return {
      startDate: dayjs(new Date()).subtract(7, 'day').format('YYYY-MM-DD'),
      endDate: dayjs(new Date()).format('YYYY-MM-DD')
    };
  };
  const [value, setValue] = useState(getInitialValue);

  // LocalStorage-ni har safar qiymat o'zgarsa yangilash
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  }, [value]);

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

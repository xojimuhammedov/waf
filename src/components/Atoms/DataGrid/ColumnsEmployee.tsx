import MyButton from '../MyButton/MyButton';
import { useEffect, useRef, useState } from 'react';
import { Columns, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';

import MyDropdown, { DropdownItemWrapper } from '../MyDropdown';
import { MyCheckbox, MyInput } from '../Form';
import { useLocation, useSearchParams } from 'react-router-dom';
import { paramsStrToObj } from 'utils/helper';
import { KeyTypeEnum } from 'enums/key-type.enum';
import { get } from 'lodash';
import { KEYS } from 'constants/key';
import { URLS } from 'constants/url';
import { useGetAllQuery, usePostQuery } from 'hooks/api';
import dayjs from 'dayjs';
import storage from 'services/storage';

/**
 * `ColumnsButton` provides an interface for users to customize the visibility of columns in a data grid. It uses a dropdown menu to list all available columns with checkboxes, allowing users to select which columns they want to display. The component's open state is managed locally, while the columns' visibility states are managed both locally and globally via the table context. This allows for immediate feedback in the UI and persistent changes across the application. The component integrates with `react-i18next` for internationalization, supporting dynamic translations for the button text and other UI elements.
 *
 * @returns {React.ReactElement} The Customize Columns button with a dropdown menu for column visibility customization.
 *
 * Functionality:
 * - Utilizes a `MyDropdown` component to present a list of columns with checkboxes.
 * - Allows users to check or uncheck boxes to show or hide columns in the data grid.
 * - Provides "Reset" and "Apply" buttons to reset to default visibility or apply changes, respectively.
 * - Leverages the `useTableContext` for accessing and updating the columns' visibility state.
 * - Supports internationalization for text displayed within the component.
 */

const ColumnsEmployee = ({ setData, setEmployee, employee }: any) => {
  const userDataString: string | null = storage.get('userData');
  const companyId: any = userDataString ? JSON.parse(userDataString) : {};
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const filters: any = paramsStrToObj(location.search);
  const [values, setValues] = useState<any>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (search) {
      searchParams.set('search', search);
      searchParams.set('page', '1');
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const { data } = useGetAllQuery({
    key: KEYS.getEmployee,
    url: URLS.getEmployee,
    params: {
      filters: {
        $or: {
          [0]: {
            firstName: {
              $containsi: get(filters, 'search')
            }
          },
          [1]: {
            lastName: {
              $containsi: get(filters, 'search')
            }
          }
        }
      },
      sort: {
        createdAt: 'DESC'
      },
      pagination: {
        pageSize: 1000
      }
    }
  });

  const { mutate: create } = usePostQuery({
    listKeyId: KEYS.postHistoryReports,
    hideSuccessToast: true
  });

  const onSubmit = (evt: any) => {
    evt.preventDefault();
    create(
      {
        url: URLS.postHistoryReports,
        attributes: {
          data: {
            fromDate: dayjs(new Date()).format('YYYY-MM-DD'),
            toDate: dayjs(new Date()).format('YYYY-MM-DD'),
            employees: employee,
            companyId: get(companyId, 'company.id')
          }
        }
      },
      {
        onSuccess: (data: any) => {
          console.log(data);
          setOpen(false);
          setData(data?.data?.data?.attendances);
        },
        onError: (e) => {
          console.log(e);
        }
      }
    );
  };
  return (
    <MyDropdown
      open={open}
      setOpen={setOpen}
      buttonProps={{
        children: 'Select Employees',
        variant: 'secondary',
        className: 'w-max dark:bg-bg-button employee-menu',
        startIcon: <Filter />,
        endIcon: open ? <ChevronUp /> : <ChevronDown />
      }}>
      <DropdownItemWrapper className="cursor-default">
        <p className="mb-2 text-c-xs-p text-text-subtle">{'Select column to show'}</p>
        <MyInput
          onKeyUp={(event) => {
            if (event.key === KeyTypeEnum.enter) {
              handleSearch();
            } else {
              setSearch(get(event, 'target.value', ''));
            }
          }}
          startIcon={<Search className="stroke-text-muted" onClick={handleSearch} />}
          className="w-full dark:bg-bg-input-dark"
          placeholder={'Search...'}
          size="small"
          defaultValue={get(filters, 'search')}
        />
      </DropdownItemWrapper>

      <div className="dark:bg-bg-button">
        <div className="h-[150px] overflow-y-auto">
          {get(data, 'data.data', [])?.map((column: any, i: number) => {
            const isChecked = values.includes(column.id);
            return (
              <DropdownItemWrapper
                // onClick={() => {
                //   setEmployee((prevEmployee: any) => [...prevEmployee, column.id]);
                // }}
                key={i}
                className="flex flex-row items-center gap-2">
                <MyCheckbox
                  defaultChecked={isChecked}
                  label={column?.firstName + ' ' + column?.lastName}
                  onChange={() => {
                    setEmployee((prevEmployee: any) => [...prevEmployee, column.id]);
                    setValues((prevValues: any) => [...prevValues, column.id]);
                  }}
                  id={column.id}
                  className="text-xs"
                />
              </DropdownItemWrapper>
            );
          })}
        </div>

        <div className="flex w-full flex-row items-center gap-2 p-3">
          <MyButton
            onClick={() => {
              setOpen(false);
            }}
            variant="secondary"
            size="base"
            className="flex-1">
            {'Reset'}
          </MyButton>
          <MyButton
            onClick={onSubmit}
            type="submit"
            size="base"
            variant="primary"
            className="flex-1">
            {'Apply'}
          </MyButton>
        </div>
      </div>
    </MyDropdown>
  );
};

export default ColumnsEmployee;

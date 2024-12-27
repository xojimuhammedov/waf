import { ReactNode, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Datepicker from 'react-tailwindcss-datepicker';

interface FormInputProps
  extends Omit<React.ComponentPropsWithoutRef<'input'>, 'size' | 'className'> {
  rounded?: boolean;
  size?: 'small' | 'base';
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
  label?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  rootClassName?: string;
  labelExtractInfo?: ReactNode;
  onChange?: any;
  format?: string;
  plugins?: any[];
  dateSeparator?: string;
  placeholder?: string;
  value?: any;
  disableDayPicker?: boolean;
  useRange?: boolean;
  asSingle?: boolean;
}

type FormInputRef = React.ComponentPropsWithRef<'input'>['ref'];

/**
 * `MyInput` is a customizable input component that extends the standard HTML input. It provides additional
 * features like different sizes, optional rounded corners, error state styling, full width option, and
 * inclusion of start/end icons. This component integrates with `i18next` for optional translation.
 *
 * @component
 * @param {FormInputProps} props - The properties of the input component.
 * @param {boolean} [props.rounded] - If true, the input will have rounded corners.
 * @param {'small' | 'base'} [props.size='base'] - The size of the input ('small' or 'base').
 * @param {boolean} [props.error=false] - If true, applies error styling to the input.
 * @param {boolean} [props.fullWidth=true] - If true, the input takes full width of its container.
 * @param {string} [props.className] - Additional custom CSS classes.
 * @param {string} [props.rootClassName] - Additional custom CSS classes for root element.
 * @param {ReactNode} [props.label] - Optional label for the input.
 * @param {ReactNode} [props.labelExtraInfo] - Optional extra info is positioned after label for the input.
 * @param {string} [props.helperText] - Optional helper text displayed below the input.
 * @param {ReactNode} [props.startIcon] - Icon displayed at the start of the input.
 * @param {ReactNode} [props.endIcon] - Icon displayed at the end of the input.
 * @param {FormInputRef} ref - Ref forwarded to the input element.
 * @returns {React.ReactElement} - The rendered input component.
 */

const MyTailwindPicker = forwardRef((props: FormInputProps, ref: FormInputRef) => {
  const {
    error = false,
    fullWidth = true,
    asSingle = false,
    size = 'base',
    rounded,
    className,
    label,
    helperText,
    startIcon,
    endIcon,
    rootClassName,
    labelExtractInfo,
    dateSeparator,
    placeholder,
    format,
    onChange,
    plugins,
    value,
    disableDayPicker,
    useRange,
    ...computedProps
  } = props;

  const requiredLabelStyles = `before:absolute before:right-[-10px] before:top-0 before:text-text-error before:content-['*']`;
  const helperTextErrorStyles = 'text-text-error';

  return (
    <div className="w-full">
      {label && (
        <label
          className={twMerge([
            'relative mb-1.5 inline-block text-c-m-p text-text-base dark:text-text-title-dark',
            computedProps.required && requiredLabelStyles
          ])}
          htmlFor={computedProps.name}>
          {label}
          {labelExtractInfo && (
            <span className="ml-1 text-c-m-p text-text-muted">({labelExtractInfo})</span>
          )}
        </label>
      )}
      <div className={'relative'}>
        {startIcon && (
          <div className="absolute left-[12px] top-full mt-[10px] [&>svg]:h-5 [&>svg]:w-5">
            {startIcon}
          </div>
        )}
        {endIcon && (
          <div className="absolute right-2.5 top-2/4 -translate-y-2/4 [&>svg]:h-5 [&>svg]:w-5">
            {endIcon}
          </div>
        )}
      </div>

      <Datepicker
        containerClassName={'form-datepicker w-full tailwind-datepicker-button'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        useRange={useRange}
        asSingle={asSingle}
        {...computedProps}
        inputClassName={'datepicker dark:text-text-title-dark text-c-m text-text-base'}
      />
      {helperText && (
        <p className={twMerge(['mt-xs text-c-xs', error && helperTextErrorStyles])}>{helperText}</p>
      )}
    </div>
  );
});

export default MyTailwindPicker;

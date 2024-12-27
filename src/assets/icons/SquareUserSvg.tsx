import clsx from 'clsx';
import { FC } from 'react';
import { SvgComponentProps } from 'types/common';

const SquareUserSvg: FC<SvgComponentProps> = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={clsx(['stroke-tag-blue-icon', className])}
      {...props}>
      <path
        d="M5.83333 17.5V15.8333C5.83333 15.3913 6.00893 14.9674 6.32149 14.6548C6.63405 14.3423 7.05797 14.1667 7.5 14.1667H12.5C12.942 14.1667 13.366 14.3423 13.6785 14.6548C13.9911 14.9674 14.1667 15.3913 14.1667 15.8333V17.5M4.16667 2.5H15.8333C16.7538 2.5 17.5 3.24619 17.5 4.16667V15.8333C17.5 16.7538 16.7538 17.5 15.8333 17.5H4.16667C3.24619 17.5 2.5 16.7538 2.5 15.8333V4.16667C2.5 3.24619 3.24619 2.5 4.16667 2.5ZM12.5 8.33333C12.5 9.71404 11.3807 10.8333 10 10.8333C8.61929 10.8333 7.5 9.71404 7.5 8.33333C7.5 6.95262 8.61929 5.83333 10 5.83333C11.3807 5.83333 12.5 6.95262 12.5 8.33333Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default SquareUserSvg;

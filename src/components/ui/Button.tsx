'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'prebook';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  disableAnimation?: boolean;
}

const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variants = {
  primary: 'bg-green-700 text-white hover:bg-green-800 active:bg-green-900 shadow-sm hover:shadow-md',
  secondary: 'bg-green-100 text-green-800 hover:bg-green-200 active:bg-green-300 border border-green-200',
  outline: 'border-2 border-green-700 text-green-700 hover:bg-green-50 active:bg-green-100',
  ghost: 'text-green-700 hover:bg-green-50 active:bg-green-100',
  prebook: 'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800 shadow-sm hover:shadow-md',
};

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
  xl: 'px-10 py-5 text-xl gap-3',
};

type MotionButtonProps = Omit<HTMLMotionProps<'button'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disableAnimation = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const combinedClassName = clsx(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    );

    const content = (
      <>
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && !isLoading && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </>
    );

    if (disableAnimation) {
      return (
        <button
          ref={ref}
          className={combinedClassName}
          disabled={disabled || isLoading}
          {...props}
        >
          {content}
        </button>
      );
    }

    const motionProps: MotionButtonProps = {
      ref,
      className: combinedClassName,
      disabled: disabled || isLoading,
      whileHover: { scale: 1.02, y: -1 },
      whileTap: { scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
      ...props,
    };

    return <motion.button {...motionProps}>{content}</motion.button>;
  }
);

Button.displayName = 'Button';
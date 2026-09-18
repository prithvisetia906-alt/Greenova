'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CSSProperties } from 'react';

const motionUnsupportedProps = [
  'onDrag', 'onDragEnd', 'onDragStart', 'onDragEnter', 'onDragLeave', 'onDragOver', 'onDrop',
  'onAnimationStart', 'onAnimationEnd', 'onAnimationIteration', 'style'
] as const;

function filterMotionProps<T extends Record<string, unknown>>(props: T): Omit<T, typeof motionUnsupportedProps[number]> {
  const filtered = { ...props };
  motionUnsupportedProps.forEach((key) => {
    delete filtered[key];
  });
  return filtered;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const baseStyles = 'w-full px-4 py-3.5 text-base bg-white border rounded-xl transition-all duration-200 placeholder:text-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 disabled:bg-green-50 disabled:cursor-not-allowed';

type MotionInputProps = Omit<HTMLMotionProps<'input'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'style'> & {
  style?: CSSProperties;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className={clsx('w-full', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-green-800 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <motion.input
            ref={ref}
            id={inputId}
            className={clsx(
              baseStyles,
              leftIcon && 'pl-12',
              rightIcon && 'pr-12',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={clsx(errorId, hintId)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...filterMotionProps(props)}
          />
          {rightIcon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400 pointer-events-none" aria-hidden="true">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-green-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  minRows?: number;
}

type MotionTextareaProps = Omit<HTMLMotionProps<'textarea'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'style'> & {
  style?: CSSProperties;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      fullWidth = true,
      minRows = 4,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    return (
      <div className={clsx('w-full', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-green-800 mb-2"
          >
            {label}
          </label>
        )}
        <motion.textarea
          ref={ref}
          id={textareaId}
          className={clsx(
            baseStyles,
            'resize-y min-h-[100px]',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={clsx(errorId, hintId)}
          rows={minRows}
          whileFocus={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          {...filterMotionProps(props)}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-green-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  fullWidth?: boolean;
}

type MotionSelectProps = Omit<HTMLMotionProps<'select'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'style'> & {
  style?: CSSProperties;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      placeholder,
      fullWidth = true,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <div className={clsx('w-full', fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-green-800 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <motion.select
            ref={ref}
            id={selectId}
            className={clsx(
              baseStyles,
              'pr-12 appearance-none bg-no-repeat bg-right-4',
              'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3E%3Cpath stroke=%27%236B735A%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3E%3C/svg%3E")]',
              error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={clsx(errorId, hintId)}
            whileFocus={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...filterMotionProps(props)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </motion.select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-green-400" aria-hidden="true">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-600 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-sm text-green-500">
            {hint}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  fullWidth?: boolean;
}

type MotionCheckboxInputProps = Omit<HTMLMotionProps<'input'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'style'> & {
  style?: CSSProperties;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, fullWidth = false, className, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={clsx('flex items-start gap-3', fullWidth && 'w-full')}>
        <div className="relative flex items-center justify-center mt-0.5 flex-shrink-0">
          <motion.input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className="absolute opacity-0 h-5 w-5 cursor-pointer"
            aria-describedby={description ? `${checkboxId}-desc` : undefined}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            {...filterMotionProps(props)}
          />
          <motion.div
            className={clsx(
              'w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all duration-200',
              props.checked
                ? 'bg-green-600 border-green-600'
                : 'border-green-300 hover:border-green-500 bg-white',
              className
            )}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            aria-hidden="true"
          >
            {props.checked && (
              <motion.svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </motion.div>
        </div>
        <div className="flex-1 min-w-0">
          <label htmlFor={checkboxId} className="cursor-pointer">
            <p className="text-base font-medium text-green-900">{label}</p>
            {description && (
              <p id={`${checkboxId}-desc`} className="mt-0.5 text-sm text-green-600">
                {description}
              </p>
            )}
          </label>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string; description?: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
}

export const RadioGroup = ({
  label,
  name,
  options,
  value,
  onChange,
  error,
  orientation = 'vertical',
  fullWidth = false,
}: RadioGroupProps) => {
  const groupId = name.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${groupId}-error` : undefined;

  return (
    <div className={clsx('w-full', fullWidth && 'w-full')}>
      <fieldset>
        <legend className="block text-sm font-medium text-green-800 mb-3">{label}</legend>
        <div
          className={clsx(
            'gap-3',
            orientation === 'horizontal' ? 'flex flex-wrap' : 'flex flex-col'
          )}
          role="radiogroup"
          aria-labelledby={`${groupId}-legend`}
          aria-describedby={errorId}
        >
          {options.map((option) => (
            <label
              key={option.value}
              className={clsx(
                'relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                orientation === 'horizontal' ? 'flex-1 min-w-[150px]' : 'w-full',
                value === option.value
                  ? 'border-green-500 bg-green-50'
                  : 'border-green-100 hover:border-green-300 bg-white'
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="absolute opacity-0 h-5 w-5 cursor-pointer"
              />
              <div
                className={clsx(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0',
                  value === option.value
                    ? 'border-green-500 bg-green-500'
                    : 'border-green-300 bg-white'
                )}
                aria-hidden="true"
              >
                {value === option.value && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    className="w-2.5 h-2.5 rounded-full bg-white"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-green-900">{option.label}</p>
                  {option.icon && (
                    <span className="text-green-500" aria-hidden="true">{option.icon}</span>
                  )}
                </div>
                {option.description && (
                  <p className="mt-0.5 text-sm text-green-600">{option.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>
        {error && (
          <p id={errorId} className="mt-2 text-sm text-red-600 flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </fieldset>
    </div>
  );
};
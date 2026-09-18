'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const variants = {
  default: 'bg-green-100 text-green-800 border border-green-200',
  success: 'bg-green-50 text-green-700 border border-green-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  error: 'bg-red-50 text-red-700 border border-red-200',
  info: 'bg-blue-50 text-blue-700 border border-blue-200',
  outline: 'bg-transparent text-green-700 border-2 border-green-300',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-3 py-1 text-sm gap-1.5',
  lg: 'px-4 py-1.5 text-base gap-2',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'md', dot = false, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          'inline-flex items-center font-medium rounded-full border transition-colors',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span
            className={clsx(
              'w-1.5 h-1.5 rounded-full flex-shrink-0',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-amber-500',
              variant === 'error' && 'bg-red-500',
              variant === 'info' && 'bg-blue-500',
              variant === 'default' && 'bg-green-500',
              variant === 'outline' && 'bg-green-500'
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

const sizeClasses = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-xl',
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  const colors = [
    'bg-green-100 text-green-800',
    'bg-emerald-100 text-emerald-800',
    'bg-lime-100 text-lime-800',
    'bg-amber-100 text-amber-800',
    'bg-orange-100 text-orange-800',
    'bg-teal-100 text-teal-800',
    'bg-cyan-100 text-cyan-800',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, name, size = 'md', shape = 'circle', className, ...props }, ref) => {
    const colorClass = name ? getColorFromName(name) : 'bg-green-100 text-green-800';
    const initials = name ? getInitials(name) : '?';

    if (src) {
      return (
        <div
          ref={ref}
          className={clsx('relative overflow-hidden', sizeClasses[size], shapeClasses[shape], className)}
          {...props}
        >
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(
          'flex items-center justify-center font-medium',
          sizeClasses[size],
          shapeClasses[shape],
          colorClass,
          className
        )}
        {...props}
      >
        {initials}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface SeparatorProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = true, className, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={orientation}
        className={clsx(
          'border-0 bg-green-200',
          orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, optional, className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={clsx('block text-sm font-medium text-green-800 mb-2', className)}
        {...props}
      >
        {children}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">*</span>
        )}
        {optional && (
          <span className="text-green-500 ml-1 text-normal font-normal">(optional)</span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';
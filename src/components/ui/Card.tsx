'use client';

import { forwardRef, HTMLAttributes, CSSProperties } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass' | 'product';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  disableAnimation?: boolean;
}

const baseStyles = 'rounded-2xl transition-all duration-300';

const variants = {
  default: 'bg-white border border-green-100 shadow-sm',
  elevated: 'bg-white shadow-lg hover:shadow-xl',
  outlined: 'bg-white border-2 border-green-200 hover:border-green-300',
  glass: 'bg-white/70 backdrop-blur-md border border-white/20 shadow-xl',
  product: 'bg-white border border-green-100 shadow-sm hover:shadow-lg hover:border-green-200',
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

type MotionDivProps = Omit<HTMLMotionProps<'div'>, 'onDrag' | 'onDragEnd' | 'onDragStart' | 'onDragEnter' | 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'style'> & {
  style?: CSSProperties;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      hover = false,
      padding = 'md',
      disableAnimation = false,
      className,
      ...props
    },
    ref
  ) => {
    const combinedClassName = clsx(
      baseStyles,
      variants[variant],
      paddings[padding],
      className
    );

    const Component = disableAnimation ? 'div' : motion.div;

    const motionProps: MotionDivProps = hover && !disableAnimation
      ? {
          whileHover: { y: -4, boxShadow: '0 20px 40px -10px rgb(0 0 0 / 0.1)' },
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={combinedClassName}
        {...motionProps}
        {...filterMotionProps(props)}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, as: Component = 'h3', className, ...props }, ref) => (
    <Component
      ref={ref}
      className={clsx('text-xl font-semibold text-green-950', className)}
      {...props}
    >
      {children}
    </Component>
  )
);
CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p ref={ref} className={clsx('text-green-600 mt-1', className)} {...props}>
      {children}
    </p>
  )
);
CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('', className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('mt-4 pt-4 border-t border-green-100 flex items-center', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';
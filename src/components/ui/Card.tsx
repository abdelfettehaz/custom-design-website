import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { useTheme } from '../../hooks/useTheme';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  hover = false,
  glass = false,
  padding = 'md',
}) => {
  const { theme } = useTheme();

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
  };

  const baseClasses = clsx(
    'rounded-xl border transition-all duration-300 ease-in-out',
    glass
      ? 'bg-white/20 backdrop-blur-lg border-white/20'
      : 'bg-white border-gray-200 shadow-sm',
    theme.name === 'dark' && !glass && 'bg-gray-800 border-gray-700',
    hover && 'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
    paddingClasses[padding],
    className
  );

  const CardComponent = hover ? motion.div : 'div';

  return (
    <CardComponent
      className={baseClasses}
      {...(hover && {
        whileHover: { y: -2 },
        transition: { duration: 0.2 },
      })}
    >
      {children}
    </CardComponent>
  );
};
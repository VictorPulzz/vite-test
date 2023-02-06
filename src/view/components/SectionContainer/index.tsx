import clsx from 'clsx';
import React from 'react';

interface SectionContainerProps {
  title?: string;
  containerClassName?: string;
  titleClassName?: string;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  children,
  containerClassName,
  titleClassName,
}) => {
  return (
    <section className={clsx('section-container', containerClassName)}>
      {title && <h2 className={clsx('text-p1 font-bold pb-2', titleClassName)}>{title}</h2>}
      {children}
    </section>
  );
};

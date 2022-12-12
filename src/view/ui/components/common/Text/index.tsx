import clsx from 'clsx';
import * as React from 'react';

import styles from './styles.module.scss';

interface Props {
  weight?: TextWeight;
  children: React.ReactNode;
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3';
  variant?: TextVariant;
  accent?: boolean;
  primary?: boolean;
  secondary?: boolean;
  className?: string;
  align?: TextAlign;
  title?: string;
}

export enum TextWeight {
  REGULAR = 'regular',
  MEDIUM = 'medium',
  BOLD = 'bold',
}

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum TextVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P1 = 'p1',
  P2 = 'p2',
  P3 = 'p3',
  P4 = 'p4',
  C1 = 'c1',
  C2 = 'c2',
}

export const Text: React.FC<Props> = ({
  children,
  variant,
  tag = 'p',
  secondary = false,
  weight,
  className,
  align,
  title,
  accent = false,
  primary = false,
}) => {
  const combinedClassName = React.useMemo(() => {
    return clsx(
      styles['text'],
      variant ? styles[`text--${variant}`] : undefined,
      {
        [styles['text--secondary']]: secondary,
        [styles['text--accent']]: accent,
        [styles['text--primary']]: primary,
        [styles[`text--${weight}`]]: weight,
        [styles[`text--${align}`]]: align,
      },
      className,
    );
  }, [accent, align, className, primary, secondary, variant, weight]);

  return React.createElement(tag, { className: combinedClassName, title }, children);
};

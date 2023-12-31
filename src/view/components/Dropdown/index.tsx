import { useClickAway } from '@appello/web-kit';
import clsx from 'clsx';
import React, {
  forwardRef,
  ReactNode,
  UIEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getMenuPositionClassName } from './utils';

export interface DropdownItem<TValue = undefined> {
  label: string;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  items?: DropdownItem<TValue>[];
  itemsContainerWidth?: number | string;
  value?: TValue;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface DropdownProps<TValue> {
  items: DropdownItem<TValue>[];
  containerWidth?: number | string;
  onSelect?: (value: TValue, option: DropdownItem<TValue>) => void;
  children?: (params: { onClick: () => void; isOpen: boolean }) => React.ReactElement;
  className?: string;
  renderOption?: (option: DropdownItem<TValue>) => ReactNode;
  closeOnScroll?: boolean;
  defaultVisible?: boolean;
}

export interface DropdownPropsRef {
  setDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type ForwardRefDropdownProps<TValue> = DropdownProps<TValue> & {
  ref?: React.Ref<DropdownPropsRef>;
};

const DropdownBase = <TValue,>(
  {
    items,
    containerWidth = 300,
    onSelect,
    children,
    className,
    renderOption,
    closeOnScroll = false,
    defaultVisible = false,
  }: DropdownProps<TValue>,
  ref?: React.ForwardedRef<DropdownPropsRef>,
): React.ReactElement => {
  const [menuPositionClassName, setMenuPositionClassName] = useState<string>('');
  const [dropdownIsOpen, setDropdownOpen] = useState<boolean>(defaultVisible);

  const toggleDropdown = useCallback(() => setDropdownOpen(state => !state), []);
  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  useImperativeHandle(ref, () => ({ setDropdownOpen }), []);

  const childrenProps = useMemo(() => {
    return {
      isOpen: dropdownIsOpen,
      onClick: toggleDropdown,
    };
  }, [dropdownIsOpen, toggleDropdown]);

  const handleSelect = React.useCallback(
    (item: DropdownItem<TValue>) => {
      if (item.disabled) {
        return;
      }

      if (item.onSelect) {
        item.onSelect();
      } else if (item.value !== undefined && onSelect) {
        onSelect(item.value, item);
      }
      closeDropdown();
    },
    [closeDropdown, onSelect],
  );

  const { ref: containerRef } = useClickAway<HTMLDivElement>(() => {
    if (!defaultVisible) {
      closeDropdown();
    }
  });

  const scrollListener = React.useCallback(
    (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (!el?.classList?.contains('rnd__menu')) {
        closeDropdown();
      }
    },
    [closeDropdown],
  );

  useEffect(() => {
    if (dropdownIsOpen && closeOnScroll) {
      document.addEventListener('scroll', scrollListener, true);
    }
    return () => {
      document.removeEventListener('scroll', scrollListener, true);
    };
  }, [dropdownIsOpen]);

  const rootMenuRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (dropdownIsOpen && rootMenuRef.current) {
      setMenuPositionClassName(getMenuPositionClassName(rootMenuRef.current));
    }
    return () => {
      if (dropdownIsOpen) {
        setMenuPositionClassName('');
      }
    };
  }, [dropdownIsOpen]);

  return (
    <div className={clsx('rnd', className)} ref={containerRef}>
      {children?.(childrenProps)}
      {dropdownIsOpen && (
        <ul
          className={`rnd__root-menu rnd__menu ${menuPositionClassName}`}
          ref={rootMenuRef}
          style={{ width: containerWidth }}
        >
          {items.map((item, index) => (
            <Option key={index} option={item} renderOption={renderOption} onSelect={handleSelect} />
          ))}
        </ul>
      )}
    </div>
  );
};

interface OptionProps<TValue> {
  option: DropdownItem<TValue>;
  onSelect: (item: DropdownItem<TValue>) => void;
  renderOption?: (option: DropdownItem<TValue>) => React.ReactNode;
}

const Option = <TValue,>({
  option,
  onSelect,
  renderOption,
}: OptionProps<TValue>): React.ReactElement => {
  const items = option.items;
  const hasSubmenu = !!items;
  const itemsContainerWidth = option.itemsContainerWidth ?? 150;
  const [menuPositionClassName, setMenuPositionClassName] = useState<string>('');
  const [submenuIsOpen, setSubmenuOpen] = useState(false);

  const handleClick = React.useCallback(
    (e: UIEvent) => {
      if (hasSubmenu) return;

      e.stopPropagation();
      onSelect(option);
    },
    [hasSubmenu, onSelect, option],
  );

  const submenuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const submenuElement = submenuRef.current;

    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const isHTMLElement = entry.target instanceof HTMLElement;
        if (isHTMLElement) {
          setSubmenuOpen(entry.target.offsetWidth > 0);
          setMenuPositionClassName(getMenuPositionClassName(entry.target));
        }
      });
    });

    if (submenuElement) {
      observer.observe(submenuElement);
    }

    return () => {
      if (submenuElement) {
        observer.unobserve(submenuElement);
      }
    };
  }, []);

  const iconAfter = hasSubmenu ? chevronNode : option.iconAfter;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={clsx('rnd__option', option.className, {
        'rnd__option--disabled': option.disabled,
        'rnd__option--with-menu': hasSubmenu,
      })}
      onKeyUp={handleClick}
      onMouseDown={handleClick}
    >
      {hasSubmenu && (
        <ul
          className={clsx(`rnd__menu rnd__submenu ${menuPositionClassName}`, {
            'rnd__submenu--opened': submenuIsOpen,
          })}
          ref={submenuRef}
          style={{ width: itemsContainerWidth }}
        >
          {items.map((item, index) => (
            <Option key={index} option={item} renderOption={renderOption} onSelect={onSelect} />
          ))}
        </ul>
      )}
      {renderOption && renderOption(option)}
      {!renderOption && (
        <>
          {option.iconBefore && (
            <div className="rnd__option-icon rnd__option-icon--left">{option.iconBefore}</div>
          )}
          <p className="rnd__option-label">{option.label}</p>
          {iconAfter && <div className="rnd__option-icon rnd__option-icon--right">{iconAfter}</div>}
        </>
      )}
    </li>
  );
};

const chevronNode = (
  <div
    style={{
      border: '5px solid currentColor',
      borderRightColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      width: 0,
      height: 0,
    }}
  />
);

export const Dropdown = forwardRef(DropdownBase) as <TValue>(
  p: ForwardRefDropdownProps<TValue>,
) => React.ReactElement;

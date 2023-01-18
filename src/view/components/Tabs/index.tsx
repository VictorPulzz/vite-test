import clsx from 'clsx';
import React, { memo, useEffect, useRef } from 'react';

export interface Tab {
  label: string;
  id: number;
}

type Props = {
  tabs: Tab[];
  activeTabId: number;
  tabsClassName?: string;
  tabsPanelClassName?: string;
  onChange: (tabId: number) => void;
  children: React.ReactNode;
};

export const Tabs: React.FC<Props> = memo(
  ({ tabs, activeTabId, tabsClassName, tabsPanelClassName, onChange, children }) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const activeLineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (tabsRef.current && activeLineRef.current) {
        const tabElements = Array.from(tabsRef.current.children);

        const activeTabElement = tabElements.find(
          tabElement => Number(tabElement.id) === activeTabId,
        );

        if (activeTabElement) {
          const { offsetLeft, offsetWidth } = activeTabElement as HTMLButtonElement;
          activeLineRef.current.style.width = `${offsetWidth}px`;
          activeLineRef.current.style.left = `${offsetLeft}px`;
        }
      }
    }, [activeTabId]);

    return (
      <>
        <div className={clsx('overflow-x-auto', tabsClassName)}>
          <div ref={tabsRef} className="relative flex gap-2 ">
            {tabs.map(({ id, label }) => (
              <button
                type="button"
                key={id}
                id={String(id)}
                className="py-2 px-4"
                disabled={id === activeTabId}
                onClick={() => onChange(id)}
              >
                <span className={`text-c1 ${id === activeTabId ? 'text-blue' : 'text-gray-2'}`}>
                  {label}
                </span>
              </button>
            ))}
          </div>
          <div className="relative rounded-t-md h-[2px]">
            <div
              ref={activeLineRef}
              className="absolute top-0 h-[2px] bg-blue rounded-t-md duration-300"
            />
          </div>
        </div>
        <div className={tabsPanelClassName}>{children}</div>
      </>
    );
  },
);

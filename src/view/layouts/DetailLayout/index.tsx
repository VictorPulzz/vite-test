import { Button, ButtonVariant } from '@appello/web-ui';
import React, { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
  title: ReactNode;
  contentClassName?: string;
  rightHeaderElement?: ReactNode;
}

export const DetailLayout: FC<Props> = ({
  children,
  title,
  contentClassName,
  rightHeaderElement,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col bg-gray-7">
      <header className="bg-white shadow-4 flex items-center px-5 py-3">
        <Button
          variant={ButtonVariant.SECONDARY}
          withIcon="left-arrow"
          onClick={() => navigate(-1)}
          className="mr-4"
        />
        <h1 className="text-p3 font-semibold">{title}</h1>
        {rightHeaderElement && <div className="ml-auto">{rightHeaderElement}</div>}
      </header>
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

import { useListQueryParams } from '@appello/web-kit';
import { Pagination, useAppelloKit } from '@appello/web-ui';
import clsx from 'clsx';
import { format } from 'date-fns';
import React, { FC } from 'react';

import { DateFormat } from '~/constants/dates';
import { PAGE_SIZE } from '~/constants/pagination';
import { DocumentFilter } from '~/services/gql/__generated__/globalTypes';
import { getFileExtension } from '~/utils/getFileExtension';

import { DocsListType, DocsType } from '../../types';
import { DocumentMenu } from '../DocumentMenu';

interface Props {
  type: DocsType;
  data: DocsListType;
  onPageChange: (options: { limit: number; offset: number }) => Promise<unknown>;
}

export const DocsList: FC<Props> = ({ type, data, onPageChange }) => {
  const { pageSize } = useAppelloKit();
  const { offset, setOffset } = useListQueryParams<DocumentFilter>(pageSize);

  const hasPagination = data.count > PAGE_SIZE;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-auto">
        <div
          className={clsx(
            'grid gap-4 mt-6',
            type === DocsType.USER ? 'grid-cols-2' : 'grid-cols-3',
          )}
        >
          {data.results.map(document => (
            <div
              className="flex justify-between items-center gap-3 font-medium p-4 border border-solid border-gray-5 rounded-md"
              key={document.id}
            >
              <div className="flex gap-3 items-center min-w-0">
                <div className="bg-blue/10 p-3 text-blue text-p5 rounded-md w-10 h-10 flex items-center justify-center">
                  {getFileExtension(document.name)}
                </div>
                <div className="flex flex-col gap-[5px] truncate">
                  <span className="text-p3 text-black leading-4 truncate">
                    {document.name.split('.').slice(0, -1).join('.')}
                  </span>
                  <span className="text-p5 text-gray-2 leading-4 truncate">
                    {format(new Date(String(document.createdAt)), DateFormat.D_MMM_Y)} •{' '}
                    {document.addedBy?.fullName}{' '}
                    {type !== DocsType.INTERNAL &&
                      type !== DocsType.PROJECT &&
                      type !== DocsType.USER &&
                      `• ${document.project?.name}`}
                  </span>
                </div>
              </div>
              <DocumentMenu
                documentId={document.id}
                documentName={document.name}
                fileUrl={document.file.url}
                type={type}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        {hasPagination && (
          <Pagination
            itemsCount={data.results.length}
            offset={offset}
            pageSize={PAGE_SIZE}
            setOffset={setOffset}
            totalCount={data.count}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </div>
  );
};

import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';

import { MoreCell } from './components/MoreCell';
import { DocumentTemplatesResultType } from './types';

const columnHelper = createColumnHelper<DocumentTemplatesResultType>();

export const DOCUMENT_TEMPLATES_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: 'name',
    header: 'Name',
  }),
  // TODO add description column
  // columnHelper.accessor('description', {
  //   id: 'description',
  //   header: 'Description',
  // }),
  columnHelper.accessor('url', {
    id: 'url',
    header: 'Url',
    cell: ctx => {
      return (
        <TextLink external to={ctx.getValue() ?? ''} className="underline">
          {ctx.getValue()}
        </TextLink>
      );
    },
  }),
  columnHelper.group({
    id: 'more',
    cell: MoreCell,
    meta: {
      className: 'w-0',
    },
  }),
];

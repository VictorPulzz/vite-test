import { TextLink } from '@appello/web-ui';
import { createColumnHelper } from '@tanstack/table-core';
import React from 'react';

import { DocumentTemplateSort } from '~/services/gql/__generated__/globalTypes';

import { MoreCell } from './components/MoreCell';
import { DocumentTemplatesResultType } from './types';

const columnHelper = createColumnHelper<DocumentTemplatesResultType>();

export const DOCUMENT_TEMPLATES_TABLE_COLUMNS = [
  columnHelper.accessor('name', {
    id: DocumentTemplateSort.NAME,
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    id: 'description',
    header: 'Description',
    enableSorting: false,
  }),
  columnHelper.accessor('url', {
    id: DocumentTemplateSort.URL,
    header: 'Url',
    cell: ctx => {
      return (
        <TextLink external className="underline" to={ctx.getValue() ?? ''}>
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

import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Button, ButtonVariant } from '~/view/ui/components/common/Button';
import { EmptyState } from '~/view/ui/components/common/EmptyState';
import { SearchInput } from '~/view/ui/components/common/SearchInput';
import { SelectField } from '~/view/ui/components/form/SelectField';

import { DocumentMenu } from './components/DocumentMenu';

// TODO remove document when backend will be ready
const document = {
  name: 'Document name',
  createdAt: '16 Mar 2023',
  createdBy: 'Alex C',
  format: 'PDF',
};

interface DocsProps {
  withHeading?: boolean;
}

export const Docs: FC<DocsProps> = ({ withHeading }) => {
  const params = useParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const projectId = params.id ? Number(params.id) : 0;

  // const { data, loading } = useFetchProjectRepositoriesQuery({
  //   variables: {
  //     data: { id: projectId },
  //   },
  // });
  const documents = new Array(7).fill(document);

  // TODO remove test data later
  const data = {
    loading: false,
    documentsList: documents,
  };

  const { control } = useForm();

  return (
    <div className="shadow-4 bg-white rounded-md p-7 min-h-[calc(100vh-12rem)]">
      {withHeading && (
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[2px]">
            <h2 className="text-p1 font-bold">Documents</h2>
            <span className="text-c1 text-gray-1 leading-none">Last update: 8h ago</span>
          </div>
          <Button
            variant={ButtonVariant.PRIMARY}
            label="Upload new"
            withIcon="add"
            className="w-36"
            onClick={() => null}
          />
        </div>
      )}
      <div className="flex items-end gap-3 mt-3">
        <SearchInput onChange={() => null} placeholder="Search documents" className="flex-auto" />
        <div className="flex items-end gap-3 w-1/2">
          <SelectField name="user" options={[]} control={control} placeholder="Category" />
          <SelectField name="user" options={[]} control={control} placeholder="Added by" />
          <SelectField name="user" options={[]} control={control} placeholder="Sort" />
        </div>
      </div>
      {data.documentsList.length === 0 && (
        <EmptyState iconName="documents" label="No documents here yet" />
      )}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.documentsList.map(({ format, name, createdAt, createdBy }, index) => (
          <div
            key={index}
            className="flex justify-between gap-3 font-medium p-4 border border-solid border-gray-5 rounded-md"
          >
            <div className="flex gap-3">
              <div className="bg-blue/10 p-3 text-blue text-c1 rounded-md">{format}</div>
              <div className="flex flex-col gap-[3px]">
                <span className="text-p3 text-black">{name}</span>
                <span className="text-c1 text-gray-2 leading-none">
                  {createdAt}, {createdBy}
                </span>
              </div>
            </div>
            <DocumentMenu />
          </div>
        ))}
      </div>
    </div>
  );
};

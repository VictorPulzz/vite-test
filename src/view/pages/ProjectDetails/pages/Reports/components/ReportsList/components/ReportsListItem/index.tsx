import { Button, ButtonVariant } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { ProjectReportsResultType } from '~/view/pages/ProjectDetails/types';

interface Props {
  report: ProjectReportsResultType;
  isAdminOrPM: boolean;
}

export const ReportsListItem: FC<Props> = ({ report, isAdminOrPM }) => {
  const navigate = useNavigate();
  const params = useParams();

  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  return (
    <div className="flex justify-between items-center p-5 border-solid border border-gray-5 rounded-md">
      <div>
        <p className="font-medium">{report.name}</p>
        <p className="text-p5 text-gray-1 flex gap-1 items-center">
          {report.submittedAt && (
            <span>{format(new Date(report.submittedAt), DateFormat.D_MMM_Y)}</span>
          )}
          {isAdminOrPM && !!report.submittedAt && <span>•</span>}
          {isAdminOrPM && <span> {report.submittedBy?.fullName}</span>}
        </p>
      </div>
      <Button
        variant={report.submittedAt ? ButtonVariant.SECONDARY : ButtonVariant.PRIMARY}
        label={report.submittedAt ? 'View' : 'Start'}
        onClick={() =>
          navigate(
            generatePath(
              report.submittedAt
                ? ROUTES.PROJECT_DETAILS_REPORTS_VIEW
                : ROUTES.PROJECT_DETAILS_REPORTS_SUBMIT,
              { id: projectId, reportId: report.id },
            ),
          )
        }
        className="w-[100px]"
      />
    </div>
  );
};

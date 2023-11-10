import { Button, ButtonVariant } from '@appello/web-ui';
import { format } from 'date-fns';
import React, { FC, useMemo } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { DateFormat } from '~/constants/dates';
import { ROUTES } from '~/constants/routes';
import { useUserProfile } from '~/view/hooks/useUserProfile';
import { ProjectReportsResultType } from '~/view/pages/ProjectDetails/types';

interface Props {
  report: ProjectReportsResultType;
}

export const ReportsListItem: FC<Props> = ({ report }) => {
  const { profile, isAdminOrPM } = useUserProfile();
  const navigate = useNavigate();
  const params = useParams();

  const projectId = useMemo(() => (params?.id ? Number(params.id) : 0), [params]);

  const reportButton = useMemo(() => {
    const isAssignedToUser = profile.id === report.submittedBy?.id;
    const defaultLabel = isAssignedToUser ? 'Start' : 'Not submitted';
    const defaultVariant = isAssignedToUser ? ButtonVariant.PRIMARY : ButtonVariant.SECONDARY;

    return (
      <Button
        className="w-[120px]"
        disabled={!isAssignedToUser && !report.submittedAt}
        label={report.submittedAt ? 'View' : defaultLabel}
        variant={report.submittedAt ? ButtonVariant.SECONDARY : defaultVariant}
        onClick={() =>
          navigate(
            generatePath(
              report.submittedAt
                ? ROUTES.PROJECT_DETAILS_REPORTS_VIEW
                : ROUTES.PROJECT_DETAILS_REPORTS_SUBMIT,
              {
                id: projectId,
                reportId: report.id,
              },
            ),
          )
        }
      />
    );
  }, [navigate, profile.id, projectId, report.id, report.submittedAt, report.submittedBy?.id]);

  return (
    <div className="flex justify-between items-center p-5 border-solid border border-gray-5 rounded-md">
      <div>
        <p className="font-medium">{report.name}</p>
        <p className="text-p5 text-gray-1 flex gap-1 items-center">
          {report.submittedAt && (
            <span>{format(new Date(report.submittedAt), DateFormat.D_MMM_Y)}</span>
          )}
          {isAdminOrPM && !!report.submittedAt && <span>•</span>}
          {isAdminOrPM && (
            <span>
              {profile.id === report.submittedBy?.id ? 'Your report' : report.submittedBy?.fullName}
            </span>
          )}
        </p>
      </div>
      {reportButton}
    </div>
  );
};

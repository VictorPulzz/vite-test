import React, { FC } from 'react';

import { SectionContainer } from '~/view/components/SectionContainer';
import { ProjectReportAnswerType } from '~/view/pages/ProjectDetails/types';

import { ProjectStatusReportAnswer } from './components/ProjectStatusReportAnswer';

interface Props {
  projectStatus: ProjectReportAnswerType[];
}

export const ProjectStatusSection: FC<Props> = ({ projectStatus }) => {
  return (
    <SectionContainer title="Status">
      <div className="mt-4 grid gap-3 grid-cols-2 max-h-[290px] overflow-auto">
        {projectStatus.map(reportAnswer => (
          <ProjectStatusReportAnswer key={reportAnswer.id} reportAnswer={reportAnswer} />
        ))}
      </div>
    </SectionContainer>
  );
};

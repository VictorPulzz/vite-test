import { getErrorData } from '@appello/common/lib/services/rtkQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormHandleSubmit, UseFormReturn } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';

import { useCreateMessageMutation, useGetLeadQuery } from '~/services/rtk/lead';
import { CreateMessageRequest } from '~/services/rtk/lead/types';
import { processApiError } from '~/utils/processApiError';

const formSchema = z.object({
  prompt: z.string(),
});

type CreateNewMessageFormValues = z.infer<typeof formSchema>;

interface UseCreateNewMessageFormReturn {
  form: UseFormReturn<CreateNewMessageFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<CreateNewMessageFormValues>>;
  resetForm?(): void;
}

export function useCreateNewMessageForm(): UseCreateNewMessageFormReturn {
  const params = useParams();
  const leadId = useMemo(() => (params.id ? String(params.id) : ''), [params.id]);

  const { data } = useGetLeadQuery(leadId);

  const defaultValues: CreateNewMessageFormValues = useMemo(() => {
    return {
      // TODO this is temporary hardcoded default value for prompts
      prompt:
        `Let's play game. You're Robert, the commercial manager of Australian software development company called Appello. Appello does UI/UX design, web & mobile app development. Appello's not an outsourcing company, their employees are full time in-house, over 80 staff across Sydney, Brisbane, London, Seattle & Berlin\n` +
        `This is the data that we gathered about a company:\n` +
        `"{ company_info }"\n` +
        `Give me the text for initial email as a response to submitted form on a website.\n` +
        `In the response:\n` +
        `* email subject should be "company name — Appello introduction", where you replace "company name" with name of the company, or if it's not known, name of the person\n` +
        `* Ask about current stage of the project. If the data already mentions the stage, then ask more details about the current stage\n` +
        `* Give reassurance that Appello is experienced with such projects and will be a good and reliable partner. If you can assume sector or area of business, tell that Appello had projects & experience with that sector.\n` +
        `* Add a reasonable call to action, to plan a meeting the following day in the morning, or the time they written. Use Sydney time by default, otherwise if data contains other places, clarify which timezone to use\n` +
        `* Don't do over 1000 characters and 7 paragraphs\n` +
        `* Don't sound spammy and tell too much about Appello. Be more like a helpful friend. Base your offer on what they requested\n` +
        `* Use Australian English grammar and phrases. Don't sound too cliche \n ${data?.about}`,
    };
  }, [data?.about]);

  const form = useForm<CreateNewMessageFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const [createMessage] = useCreateMessageMutation();

  const handleSubmit = useCallback(
    async (values: CreateNewMessageFormValues) => {
      const payload = {
        id: String(leadId),
        prompt: values.prompt,
      };
      try {
        await createMessage(payload).unwrap();
      } catch (e) {
        processApiError<CreateMessageRequest>({
          errors: getErrorData(e),
          fields: {
            prompt: 'prompt',
          },
        });
      }
    },
    [createMessage, leadId],
  );

  return useMemo(
    () => ({
      form,
      handleSubmit: form.handleSubmit(handleSubmit),
      resetForm: () => form.reset(defaultValues),
    }),
    [defaultValues, form, handleSubmit],
  );
}

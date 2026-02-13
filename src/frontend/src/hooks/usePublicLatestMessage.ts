import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetLatestPublicMessage() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<string>({
    queryKey: ['latestPublicMessage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLatestPublicMessage();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSubmitPublicMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newMessage: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitPublicMessage(newMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['latestPublicMessage'] });
    },
  });
}

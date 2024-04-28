import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';

const queryClient = useQueryClient();

const notesQuery = useQuery({
  queryFn: () => ...,
  queryKey: ['notes'],
});

const noteId = useRoute().query.id;
const noteDetailQuery = useQuery({
  queryFn: () => ...,
  queryKey: ['notes', noteId],
});

const deleteMutation = useMutation({
  mutationFn: () => { ... },
  onSuccess: () => {
    queryClient.invalidateQueries(['notes']);
  },
});

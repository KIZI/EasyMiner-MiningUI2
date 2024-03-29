import { useSelectedRulesStoreRefs } from '@selectedRules/stores/selectedRulesStore';
import { useMutation } from '@tanstack/vue-query';
import { computed } from 'vue';
import { queryClient } from '@/libs/vueQuery';
import { queryKeys } from '@/api/queryKeys';
import type { TaskRule } from '@/api/tasks/types';
import { api } from '@/api/api';
import { useRuleSetRulesQuery } from '@/api/ruleSets/useRuleSetRulesQuery';
import { useErrorHandler } from '@/composables/useErrorHandler';

export function useSelectedRules(options: {
  onMutationSuccess?: () => void;
} = {}) {
  const { handleError } = useErrorHandler();

  const { currentRuleSetId } = useSelectedRulesStoreRefs();
  const { rules } = useRuleSetRulesQuery(currentRuleSetId);

  function isRuleSelected(rule: TaskRule) {
    return rules.value?.some((selectedRule) => selectedRule.id === rule.id);
  }

  function onMutationSuccess() {
    options.onMutationSuccess?.();
    invalidateCurrentRuleSet();
  }

  const addRulesMutation = useMutation({
    mutationFn: api.ruleSets.addRules,
    onSuccess: onMutationSuccess,
    onError: handleError,
  });
  const removeRulesMutation = useMutation({
    mutationFn: api.ruleSets.removeRules,
    onSuccess: onMutationSuccess,
    onError: handleError,
  });

  const isToggleLoading = computed(() => {
    return addRulesMutation.isLoading.value || removeRulesMutation.isLoading.value;
  });

  function handleAdd(selected: TaskRule | TaskRule[]) {
    if (!currentRuleSetId.value) return;
    if (!Array.isArray(selected)) selected = [selected];

    addRulesMutation.mutate({
      id: currentRuleSetId.value,
      rules: selected.map((rule) => rule.id),
    });
  }

  function handleRemove(selected: TaskRule | TaskRule[]) {
    if (!currentRuleSetId.value) return;
    if (!Array.isArray(selected)) selected = [selected];

    removeRulesMutation.mutate({
      id: currentRuleSetId.value,
      rules: selected.map((rule) => rule.id),
    });
  }

  function handleToggle(task: TaskRule) {
    if (isRuleSelected(task)) {
      return handleRemove(task);
    }

    handleAdd(task);
  }

  function invalidateCurrentRuleSet() {
    queryClient.invalidateQueries(queryKeys.ruleSets.rules(currentRuleSetId));
  }

  return {
    addRulesMutation,
    removeRulesMutation,
    isToggleLoading,
    handleAdd,
    handleRemove,
    handleToggle,
    isRuleSelected,
    invalidateCurrentRuleSet,
  };
}

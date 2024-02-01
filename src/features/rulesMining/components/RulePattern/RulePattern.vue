<template>
  <div class="grid grid-cols-2 gap-x-10">
    <RulePatternItemSet :cedent="CEDENT.Antecedent" />
    <RulePatternItemSet :cedent="CEDENT.Consequent" />
  </div>
</template>

<script setup lang="ts">
import RulePatternItemSet from '@/features/rulesMining/components/RulePattern/RulePatternItemSet.vue';
import { CEDENT } from '@/features/rulesMining/types/rulePattern.types';
</script>

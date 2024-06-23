<template>
  <div class="grid grow grid-cols-2 gap-x-10">
    <RulePatternItemSet :cedent="CEDENT.Antecedent" />
    <RulePatternItemSet :cedent="CEDENT.Consequent" />
  </div>
</template>

<script setup lang="ts">
import RulePatternItemSet from '@rulesMining/components/RulePattern/RulePatternItemSet.vue'
import { CEDENT } from '@rulesMining/types/rulePattern.types'
</script>

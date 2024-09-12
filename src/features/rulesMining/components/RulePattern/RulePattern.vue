<template>
  <div class="grid grow grid-cols-2 gap-x-10">
    <EditRulePatternItemPopover>
      <RulePatternItemSet :cedent="CEDENT.Antecedent" />
      <RulePatternItemSet :cedent="CEDENT.Consequent" />
    </EditRulePatternItemPopover>
  </div>
</template>

<script setup lang="ts">
import EditRulePatternItemPopover from '@rulesMining/components/RulePattern/EditRulePatternItemPopover.vue'
import RulePatternItemSet from '@rulesMining/components/RulePattern/RulePatternItemSet.vue'
import { CEDENT } from '@rulesMining/types/rulePattern.types'
</script>

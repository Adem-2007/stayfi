<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../stores/dashboardLanguage.js';
  import StepCard from './components/StepCard.svelte';
  import EmptyStepsState from './components/EmptyStepsState.svelte';

  export let steps = [];

  const dispatch = createEventDispatcher();

  function handleEdit(step) {
    dispatch('edit', step);
  }

  function handleDelete(stepId) {
    dispatch('delete', stepId);
  }

  $: sortedSteps = [...steps].sort((a, b) => a.order - b.order);
</script>

<div class="space-y-4 sm:space-y-6">
  <div class="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg sm:text-xl font-bold text-gray-900">{$dashboardTranslations.stepsList?.title || 'Custom Steps'}</h2>
      <span class="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold rounded-full whitespace-nowrap">
        {steps.length} {steps.length === 1 ? ($dashboardTranslations.stepsList?.step || 'Step') : ($dashboardTranslations.stepsList?.steps || 'Steps')}
      </span>
    </div>

    {#if steps.length === 0}
      <EmptyStepsState />
    {:else}
      <div class="space-y-4">
        {#each sortedSteps as step}
          <StepCard 
            {step}
            on:edit={() => handleEdit(step)}
            on:delete={() => handleDelete(step.id)}
          />
        {/each}
      </div>
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  import FieldItem from './FieldItem.svelte';
  import EmptyFieldsState from './EmptyFieldsState.svelte';
  
  export let fields = [];
  export let currentLang;
  
  const dispatch = createEventDispatcher();
</script>

<div class="mb-6 sm:mb-8">
  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
    <h3 class="text-base sm:text-lg font-bold text-gray-900">{$dashboardTranslations.stepBuilder?.formFields || 'Form Fields'}</h3>
    <button
      on:click={() => dispatch('addField')}
      class="w-full sm:w-auto px-4 py-2 text-sm sm:text-base bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      {$dashboardTranslations.buttons?.addField || 'Add Field'}
    </button>
  </div>

  {#if fields.length === 0}
    <EmptyFieldsState />
  {:else}
    <div class="space-y-3">
      {#each fields as field}
        <FieldItem 
          {field} 
          {currentLang}
          on:edit={() => dispatch('editField', field)}
          on:delete={() => dispatch('deleteField', field.id)}
        />
      {/each}
    </div>
  {/if}
</div>

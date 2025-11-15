<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  import LanguagePreviews from './LanguagePreviews.svelte';
  import FieldsPreview from './FieldsPreview.svelte';
  
  export let step;
  
  const dispatch = createEventDispatcher();
</script>

<div class="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
  <div class="flex flex-col sm:flex-row items-start justify-between gap-3">
    <div class="flex-1 w-full min-w-0">
      <div class="flex items-center gap-2 mb-3 flex-wrap">
        <span class="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full whitespace-nowrap">
          {$dashboardTranslations.stepsList?.order || 'Order'}: {step.order}
        </span>
        <span class="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full whitespace-nowrap">
          {step.fields.length} {step.fields.length === 1 ? ($dashboardTranslations.stepsList?.field || 'Field') : ($dashboardTranslations.stepsList?.fields || 'Fields')}
        </span>
      </div>
      
      <h3 class="text-base sm:text-lg font-bold text-gray-900 mb-1 break-words">
        {step.title.en}
      </h3>
      
      {#if step.subtitle.en}
        <p class="text-xs sm:text-sm text-gray-600 mb-3 break-words">{step.subtitle.en}</p>
      {/if}

      <LanguagePreviews {step} />
      
      {#if step.fields.length > 0}
        <FieldsPreview fields={step.fields} />
      {/if}
    </div>

    <div class="flex sm:flex-col items-center gap-2 w-full sm:w-auto sm:ml-4">
      <button
        on:click={() => dispatch('edit')}
        class="flex-1 sm:flex-initial p-2 sm:p-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
        title="{$dashboardTranslations.buttons?.edit || 'Edit'} {$dashboardTranslations.stepsList?.step || 'Step'}"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        on:click={() => dispatch('delete')}
        class="flex-1 sm:flex-initial p-2 sm:p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="{$dashboardTranslations.buttons?.delete || 'Delete'} {$dashboardTranslations.stepsList?.step || 'Step'}"
      >
        <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</div>

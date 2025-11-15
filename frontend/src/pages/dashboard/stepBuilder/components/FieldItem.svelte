<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  import FieldTypeBadge from './FieldTypeBadge.svelte';
  
  export let field;
  export let currentLang;
  
  const dispatch = createEventDispatcher();
</script>

<div class="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200 hover:border-blue-300 transition-all">
  <div class="flex items-start justify-between gap-2">
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-2 flex-wrap">
        <FieldTypeBadge type={field.type} />
        {#if field.required}
          <span class="px-2 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-md">
            {$dashboardTranslations.stepBuilder?.required || 'Required'}
          </span>
        {/if}
      </div>
      <p class="text-sm sm:text-base font-semibold text-gray-900 break-words">{field.label[currentLang] || field.label.en}</p>
      {#if field.placeholder[currentLang]}
        <p class="text-xs sm:text-sm text-gray-500 mt-1 break-words">
          {$dashboardTranslations.stepBuilder?.placeholderPreview || 'Placeholder'}: {field.placeholder[currentLang]}
        </p>
      {/if}
    </div>
    <div class="flex items-center gap-1 flex-shrink-0">
      <button
        on:click={() => dispatch('edit')}
        class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
        title="{$dashboardTranslations.buttons?.edit || 'Edit'}"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button
        on:click={() => dispatch('delete')}
        class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="{$dashboardTranslations.buttons?.delete || 'Delete'}"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  </div>
</div>

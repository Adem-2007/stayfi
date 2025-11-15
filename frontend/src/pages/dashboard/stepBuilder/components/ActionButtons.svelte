<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  const dispatch = createEventDispatcher();
</script>

<div class="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-gray-200">
  <button
    on:click={() => dispatch('cancel')}
    class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all"
  >
    {$dashboardTranslations.buttons?.cancel || 'Cancel'}
  </button>
  <button
    on:click={() => dispatch('save')}
    class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:shadow-lg transition-all"
  >
    {$dashboardTranslations.buttons?.saveStep || 'Save Step'}
  </button>
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let options = [];
  export let currentLang;
  export let searchable = false;
  export let showSearchable = false;
  
  const dispatch = createEventDispatcher();
  let newOption = { en: '', fr: '', ar: '' };
  
  function addOption() {
    if (!newOption.en || !newOption.fr || !newOption.ar) {
      alert($dashboardTranslations.validation?.fillOptionAllLanguages || 'Please fill in the option for all languages');
      return;
    }
    
    dispatch('add', { 
      id: Date.now().toString(),
      ...JSON.parse(JSON.stringify(newOption))
    });
    newOption = { en: '', fr: '', ar: '' };
  }
  
  function removeOption(optionId) {
    dispatch('remove', optionId);
  }
</script>

<div class="p-4 bg-gray-50 rounded-xl border border-gray-200">
  <label class="block text-sm font-semibold text-gray-700 mb-3">
    {$dashboardTranslations.fieldEditor?.options || 'Options'} <span class="text-red-500">*</span>
  </label>
  
  <div class="space-y-3 mb-4">
    <input
      type="text"
      bind:value={newOption[currentLang]}
      placeholder="{$dashboardTranslations.fieldEditor?.enterOption || 'Enter option in'} {$dashboardTranslations.languages?.[currentLang] || currentLang.toUpperCase()}"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
    />
    <button
      on:click={addOption}
      class="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      {$dashboardTranslations.buttons?.addOption || 'Add Option'}
    </button>
  </div>

  {#if options.length > 0}
    <div class="space-y-2">
      <p class="text-xs font-semibold text-gray-500 mb-2">{$dashboardTranslations.fieldEditor?.addedOptions || 'ADDED OPTIONS:'}</p>
      {#each options as option}
        <div class="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
          <span class="text-sm font-medium text-gray-900">{option[currentLang] || option.en}</span>
          <button
            on:click={() => removeOption(option.id)}
            class="p-1 text-red-600 hover:bg-red-50 rounded transition-all"
            title="{$dashboardTranslations.buttons?.remove || 'Remove'}"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {:else}
    <p class="text-sm text-gray-500 text-center py-4">{$dashboardTranslations.fieldEditor?.noOptions || 'No options added yet'}</p>
  {/if}

  {#if showSearchable}
    <div class="mt-4 pt-4 border-t border-gray-200">
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          bind:checked={searchable}
          class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
        />
        <div>
          <span class="text-sm font-semibold text-gray-700">{$dashboardTranslations.fieldEditor?.searchable || 'Searchable'}</span>
          <p class="text-xs text-gray-500">{$dashboardTranslations.fieldEditor?.searchableDesc || 'Allow users to search through options'}</p>
        </div>
      </label>
    </div>
  {/if}
</div>

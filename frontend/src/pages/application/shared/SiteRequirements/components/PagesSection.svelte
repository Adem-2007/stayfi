<script>
  import { translations } from '../../../../../stores/language.js';
  import DynamicList from '../../../components/DynamicList.svelte';
  
  export let pages = [];
  export let otherPages = [];

  $: pageOptions = $translations.siteRequirements?.pages.options || [];
  $: showOtherPages = pages.includes('other-page');

  function togglePage(pageId) {
    const index = pages.indexOf(pageId);
    if (index > -1) {
      pages = pages.filter(p => p !== pageId);
    } else {
      pages = [...pages, pageId];
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-gray-900">{$translations.siteRequirements?.pages.title || 'Pages & Screens'}</h3>
  </div>
  
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
    {#each pageOptions as option}
      {@const isSelected = pages.includes(option.id)}
      <button
        type="button"
        on:click={() => togglePage(option.id)}
        class="p-4 border-2 rounded-xl transition-all {isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}"
      >
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}">
            {#if isSelected} <svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> {/if}
          </div>
          <div class="flex-1">
            <div class="font-semibold text-gray-900">{option.name}</div>
            <div class="text-sm text-gray-500">{option.description}</div>
          </div>
        </div>
      </button>
    {/each}
  </div>

  {#if showOtherPages}
    <div class="mt-6 border-t pt-6">
      <DynamicList label={$translations.siteRequirements?.pages.otherLabel} bind:items={otherPages} placeholder={$translations.siteRequirements?.pages.otherPlaceholder} />
    </div>
  {/if}
</div>
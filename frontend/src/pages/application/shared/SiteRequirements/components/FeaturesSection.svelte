<script>
  import { translations } from '../../../../../stores/language.js';
  import DynamicList from '../../../components/DynamicList.svelte';
  
  export let features = [];
  export let otherFeatures = [];

  $: featureOptions = $translations.siteRequirements?.features.options || [];
  $: showOtherFeatures = features.includes('other-feature');

  function toggleFeature(featureId) {
    const index = features.indexOf(featureId);
    if (index > -1) {
      features = features.filter(f => f !== featureId);
    } else {
      features = [...features, featureId];
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-gray-900">{$translations.siteRequirements?.features.title || 'Additional Features'}</h3>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
    {#each featureOptions as option}
      {@const isSelected = features.includes(option.id)}
      <button
        type="button"
        on:click={() => toggleFeature(option.id)}
        class="p-4 border-2 rounded-xl transition-all {isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'}"
      >
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'}">
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
  
  {#if showOtherFeatures}
    <div class="mt-6 border-t pt-6">
      <DynamicList label={$translations.siteRequirements?.features.otherLabel} bind:items={otherFeatures} placeholder={$translations.siteRequirements?.features.otherPlaceholder} />
    </div>
  {/if}
</div>
<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../../stores/language.js';
  import PlatformCard from './components/PlatformCard.svelte';
  import Input from '../../components/Input.svelte';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let selectedPlatforms = formData.platforms || [];
  let otherPlatform = formData.otherPlatform || '';
  let showOtherInput = selectedPlatforms.includes('other');
  let error = '';

  // Make the platforms array reactive to language changes
  $: platforms = [
    {
      id: 'mobile',
      name: $translations.platformSelection?.mobileName || 'Mobile Application',
      description: $translations.platformSelection?.mobileDesc || 'iOS and Android apps',
      icon: `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>`,
      color: 'blue'
    },
    {
      id: 'desktop',
      name: $translations.platformSelection?.desktopName || 'Desktop Application',
      description: $translations.platformSelection?.desktopDesc || 'Windows, Mac, Linux',
      icon: `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
      color: 'purple'
    },
    {
      id: 'website',
      name: $translations.platformSelection?.websiteName || 'Website',
      description: $translations.platformSelection?.websiteDesc || 'Web application or site',
      icon: `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>`,
      color: 'green'
    },
    {
      id: 'other',
      name: $translations.platformSelection?.otherName || 'Other',
      description: $translations.platformSelection?.otherDesc || 'Specify your platform',
      icon: `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>`,
      color: 'yellow'
    }
  ];

  function togglePlatform(platformId) {
    const index = selectedPlatforms.indexOf(platformId);
    if (index > -1) {
      selectedPlatforms = selectedPlatforms.filter(p => p !== platformId);
      if (platformId === 'other') showOtherInput = false, otherPlatform = '';
    } else {
      selectedPlatforms = [...selectedPlatforms, platformId];
      if (platformId === 'other') showOtherInput = true;
    }
    error = '';
  }

  function handleNext() {
    if (selectedPlatforms.length === 0) {
      error = $translations.platformSelection?.errorSelectOne || 'Please select at least one platform';
      return;
    }
    if (showOtherInput && !otherPlatform.trim()) {
      error = $translations.platformSelection?.errorSpecifyOther || 'Please specify your platform';
      return;
    }
    formData = { ...formData, platforms: selectedPlatforms, otherPlatform: showOtherInput ? otherPlatform.trim() : '' };
    dispatch('next');
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="mb-6 md:mb-8">
    <button on:click={() => dispatch('back')} class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors">
      {#if $direction === 'rtl'}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      {/if}
      {$translations.platformSelection?.back || 'Back'}
    </button>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
      {$translations.platformSelection?.title || 'Choose Your'} <span class="text-blue-600">{$translations.platformSelection?.highlightedTitle || 'Platform'}</span>
    </h2>
    <p class="text-base sm:text-lg text-gray-600">{$translations.platformSelection?.subtitle || 'Select all platforms you need'}</p>
  </div>

  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
      {#each platforms as platform}
        <PlatformCard {platform} isSelected={selectedPlatforms.includes(platform.id)} on:toggle={() => togglePlatform(platform.id)} />
      {/each}
    </div>

    {#if showOtherInput}
      <div class="mt-6 p-4 sm:p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl transition-all duration-300">
        <Input
          label={$translations.platformSelection?.otherLabel || 'Specify Your Platform'}
          bind:value={otherPlatform}
          placeholder={$translations.platformSelection?.otherPlaceholder || 'e.g., Smart TV App...'}
          required={true}
        />
      </div>
    {/if}

    {#if error}
      <div class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
        <p class="text-sm text-red-700">{error}</p>
      </div>
    {/if}

    <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
      <div class="flex gap-4">
        <div class="flex-shrink-0"><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
        <div>
          <h4 class="font-semibold text-blue-900 mb-1">{$translations.platformSelection?.infoBoxTitle || 'Multiple Platforms?'}</h4>
          <p class="text-sm text-blue-700">{$translations.platformSelection?.infoBoxText || 'You can select multiple platforms...'}</p>
        </div>
      </div>
    </div>

    <div class="flex justify-end pt-6">
      <button type="button" on:click={handleNext} class="inline-flex items-center px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5">
        {$translations.platformSelection?.continue || 'Continue'}
        {#if $direction === 'rtl'}
            <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
        {:else}
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        {/if}
      </button>
    </div>
  </div>
</div>
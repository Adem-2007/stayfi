<script>
  import { translations } from '../../../../../stores/language.js';
  import DynamicList from '../../../components/DynamicList.svelte';
  
  export let selectedPlatforms = [];
  export let frontendTech = [];
  export let backendTech = [];
  export let otherFrontend = [];
  export let otherBackend = [];
  export let errors = {};

  $: techStackTranslations = $translations.siteRequirements?.techStack || {};
  $: websiteTech = techStackTranslations.website || [];
  $: mobileTech = techStackTranslations.mobile || [];
  $: desktopTech = techStackTranslations.desktop || [];
  $: backendOptions = techStackTranslations.backend || [];
  $: otherFrontendOption = techStackTranslations.otherFrontend;
  $: otherBackendOption = techStackTranslations.otherBackend;
  $: hasWebsite = selectedPlatforms.includes('website');
  $: hasMobile = selectedPlatforms.includes('mobile');
  $: hasDesktop = selectedPlatforms.includes('desktop');

  $: availableFrontendTech = (() => {
    let tech = [];
    if (hasWebsite) tech.push(...websiteTech);
    if (hasMobile) tech.push(...mobileTech);
    if (hasDesktop) tech.push(...desktopTech);
    const uniqueTech = tech.filter((t, index, self) => index === self.findIndex(i => i.id === t.id));
    if (otherFrontendOption) uniqueTech.push(otherFrontendOption);
    return uniqueTech;
  })();

  $: availableBackendTech = [...backendOptions, ...(otherBackendOption ? [otherBackendOption] : [])];
  $: showOtherFrontend = frontendTech.includes('other-frontend');
  $: showOtherBackend = backendTech.includes('other-backend');

  function toggleTech(id, type) {
    let currentSelection = type === 'frontend' ? frontendTech : backendTech;
    const index = currentSelection.indexOf(id);
    if (index > -1) {
      currentSelection = currentSelection.filter(item => item !== id);
    } else {
      currentSelection = [...currentSelection, id];
    }
    if (type === 'frontend') {
      frontendTech = currentSelection;
    } else {
      backendTech = currentSelection;
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200" data-error-key="frontendTech">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-gray-900">{techStackTranslations.title || 'Technology Stack'}</h3>
  </div>
  
  <div class="space-y-6">
    <div>
      <label class="font-semibold text-gray-800">{techStackTranslations.frontendLabel || 'Frontend'}</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3">
        {#each availableFrontendTech as tech}
          {@const isSelected = frontendTech.includes(tech.id)}
          <button
            type="button"
            on:click={() => toggleTech(tech.id, 'frontend')}
            class="p-4 border-2 rounded-xl transition-all {isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'}"
          >
             <div class="flex items-start gap-3">
              <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-yellow-600 border-yellow-600' : 'border-gray-300'}">
                {#if isSelected} <svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> {/if}
              </div>
              <div>
                <div class="font-semibold text-gray-900">{tech.name}</div>
                <div class="text-sm text-gray-500">{tech.description}</div>
              </div>
            </div>
          </button>
        {/each}
      </div>
      {#if errors.frontendTech}<p class="mt-2 text-sm text-red-600">{errors.frontendTech}</p>{/if}

      {#if showOtherFrontend}
        <div class="mt-4 border-t pt-4">
          <DynamicList label={techStackTranslations.otherFrontendLabel} bind:items={otherFrontend} placeholder={techStackTranslations.otherFrontendPlaceholder} required={true} />
        </div>
      {/if}
    </div>

    <div class="border-t pt-6" data-error-key="backendTech">
      <label class="font-semibold text-gray-800">{techStackTranslations.backendLabel || 'Backend'}</label>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-3">
        {#each availableBackendTech as tech}
          {@const isSelected = backendTech.includes(tech.id)}
          <button
            type="button"
            on:click={() => toggleTech(tech.id, 'backend')}
            class="p-4 border-2 rounded-xl transition-all {isSelected ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'}"
          >
             <div class="flex items-start gap-3">
              <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-yellow-600 border-yellow-600' : 'border-gray-300'}">
                {#if isSelected} <svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg> {/if}
              </div>
              <div>
                <div class="font-semibold text-gray-900">{tech.name}</div>
                <div class="text-sm text-gray-500">{tech.description}</div>
              </div>
            </div>
          </button>
        {/each}
      </div>
      {#if errors.backendTech}<p class="mt-2 text-sm text-red-600">{errors.backendTech}</p>{/if}

      {#if showOtherBackend}
        <div class="mt-4 border-t pt-4">
          <DynamicList label={techStackTranslations.otherBackendLabel} bind:items={otherBackend} placeholder={techStackTranslations.otherBackendPlaceholder} required={true} />
        </div>
      {/if}
    </div>
  </div>
</div>
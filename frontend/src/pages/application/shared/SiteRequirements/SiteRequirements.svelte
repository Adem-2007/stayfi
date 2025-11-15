<script>
  import { createEventDispatcher } from 'svelte';
  // Import the stores for translation and direction
  import { translations, direction } from '../../../../stores/language.js';
  import PagesSection from './components/PagesSection.svelte';
  import FeaturesSection from './components/FeaturesSection.svelte';
  import DesignSection from './components/DesignSection.svelte';
  import TechnologyStack from './components/TechnologyStack.svelte';
  import VerificationDatabase from './components/VerificationDatabase.svelte';
  import HostingAI from './components/HostingAI.svelte';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let requirements = {
    pages: formData.pages || [], otherPages: formData.otherPages || [],
    additionalFeatures: formData.additionalFeatures || [], otherFeatures: formData.otherFeatures || [],
    designOption: formData.designOption || '', designDescription: formData.designDescription || '', designUrl: formData.designUrl || '', designFiles: formData.designFiles || [],
    frontendTech: formData.frontendTech || [], backendTech: formData.backendTech || [], otherFrontend: formData.otherFrontend || [], otherBackend: formData.otherBackend || [],
    verificationMethods: formData.verificationMethods || [],
    database: formData.database || [], otherDatabase: formData.otherDatabase || [],
    hosting: formData.hosting || '', otherHosting: formData.otherHosting || '',
    implementAI: formData.implementAI || false, aiAutomation: formData.aiAutomation || false
  };

  let errors = {};
  
  function validateForm() {
    errors = {}; 
    // All fields are now optional, no validation required
    return true;
  }

  function handleNext() {
    if (validateForm()) {
      formData = { ...formData, ...requirements };
      dispatch('next');
    } else {
      const firstErrorKey = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-error-key="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
</script>

<div class="max-w-4xl mx-auto">
  <!-- HEADER SECTION - NOW FULLY TRANSLATED AND DIRECTION-AWARE -->
  <div class="mb-6 md:mb-8">
    <button on:click={() => dispatch('back')} class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors">
      <!-- Conditional arrow for Back button -->
      {#if $direction === 'rtl'}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      {/if}
      <!-- Translated text for Back button -->
      {$translations.siteRequirements?.back || 'Back'}
    </button>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
      <!-- Translated Title -->
      {$translations.siteRequirements?.title || 'Technical'} <span class="text-blue-600">{$translations.siteRequirements?.highlightedTitle || 'Requirements'}</span>
    </h2>
    <p class="text-base sm:text-lg text-gray-600">
      <!-- Translated Subtitle -->
      {$translations.siteRequirements?.subtitle || 'Define the technical specifications for your project'}
    </p>
  </div>

  <form on:submit|preventDefault={handleNext} class="space-y-6 md:space-y-8">
    <PagesSection bind:pages={requirements.pages} bind:otherPages={requirements.otherPages} />
    <FeaturesSection bind:features={requirements.additionalFeatures} bind:otherFeatures={requirements.otherFeatures} />
    <DesignSection bind:designOption={requirements.designOption} bind:designDescription={requirements.designDescription} bind:designUrl={requirements.designUrl} bind:designFiles={requirements.designFiles} />
    <TechnologyStack selectedPlatforms={formData.platforms || []} bind:frontendTech={requirements.frontendTech} bind:backendTech={requirements.backendTech} bind:otherFrontend={requirements.otherFrontend} bind:otherBackend={requirements.otherBackend} {errors} />
    <VerificationDatabase bind:verificationMethods={requirements.verificationMethods} bind:database={requirements.database} bind:otherDatabase={requirements.otherDatabase} {errors} />
    <HostingAI bind:hosting={requirements.hosting} bind:otherHosting={requirements.otherHosting} bind:implementAI={requirements.implementAI} bind:aiAutomation={requirements.aiAutomation} {errors} />

    <!-- CONTINUE BUTTON - NOW FULLY TRANSLATED AND DIRECTION-AWARE -->
    <div class="flex justify-end pt-4">
      <button type="submit" class="inline-flex items-center px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5">
        <!-- Translated text for Continue button -->
        {$translations.siteRequirements?.continue || 'Continue to Next Step'}
        <!-- Conditional arrow for Continue button -->
        {#if $direction === 'rtl'}
          <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
        {:else}
          <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        {/if}
      </button>
    </div>
  </form>
</div>
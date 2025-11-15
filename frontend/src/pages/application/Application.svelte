<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  // Correctly import all necessary stores, including the new 'direction'
  import { currentLanguage, translations, loadTranslations, direction } from '../../stores/language';
  import { customSteps, loadCustomSteps } from '../../stores/customSteps.js';
  import SelectUserType from './shared/SelectUserType.svelte';
  import CompanyInformation from './company/steps/CompanyInformation.svelte';
  import CustomerInformation from './customer/steps/CustomerInformation.svelte';
  import EmailVerification from './shared/EmailVerification/EmailVerification.svelte';
  import CompanyProjectDescription from './company/steps/CompanyProjectDescription.svelte';
  import CustomerProjectDescription from './customer/steps/CustomerProjectDescription.svelte';
  import PlatformSelection from './shared/PlatformSelection/PlatformSelection.svelte';
  import SiteRequirements from './shared/SiteRequirements/SiteRequirements.svelte';
  import SecurityPayment from './shared/SecurityPayment/SecurityPayment.svelte';
  import Summary from './shared/Summary/Summary.svelte';
  import DynamicStep from './shared/DynamicStep.svelte';

  // --- REMOVED: The custom createPersistentStore helper function is no longer needed. ---

  // --- FIXED: Reverted to using standard Svelte writable stores. ---
  // This will NOT persist data on page refresh.
  const currentStep = writable(1);
  const userType = writable(null); // 'company' or 'customer'
  const formData = writable({});
  
  // Load custom steps on mount
  onMount(() => {
    loadCustomSteps();
  });
  
  // Calculate total steps including custom steps
  $: totalSteps = 8 + $customSteps.length;
  
  // Get sorted custom steps
  $: sortedCustomSteps = [...$customSteps].sort((a, b) => a.order - b.order);
  
  // Map step numbers to components
  $: stepMapping = (() => {
    const mapping = {
      1: 'userType',
      2: 'information',
      3: 'emailVerification',
      4: 'projectDescription',
      5: 'platformSelection',
      6: 'siteRequirements',
      7: 'securityPayment',
    };
    
    // Insert custom steps after step 7
    let customStepNumber = 8;
    sortedCustomSteps.forEach((step, index) => {
      mapping[customStepNumber] = { type: 'custom', step };
      customStepNumber++;
    });
    
    // Summary is always last
    mapping[customStepNumber] = 'summary';
    
    return mapping;
  })();
  
  let showLangDropdown = false;

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  function changeLanguage(langCode, event) {
    if (event) {
      event.stopPropagation();
    }
    loadTranslations(langCode);
    showLangDropdown = false;
  }
  
  function toggleLanguageDropdown(event) {
    event.stopPropagation();
    showLangDropdown = !showLangDropdown;
  }

  $: currentLangData = languages.find(l => l.code === $currentLanguage) || languages[0];

  function handleUserTypeSelect(type) {
    userType.set(type);
    currentStep.set(2);
    scrollToTop();
  }

  function handleBack() {
    if ($currentStep === 2) {
      userType.set(null);
    }
    currentStep.update(n => Math.max(1, n - 1));
    scrollToTop();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleEditFromSummary(event) {
    const stepMap = {
      'customer': 2,
      'project': 4,
      'requirements': 6,
      'security': 7
    };
    
    if (stepMap[event.detail.step]) {
      currentStep.set(stepMap[event.detail.step]);
    }
  }

  // --- FIXED: Updated this function to reset the standard writable stores to their initial values. ---
  function handleSubmissionComplete() {
    console.log('Submission complete. Resetting form state...');
    currentStep.set(1);
    userType.set(null);
    formData.set({});
  }

  // Scroll to top whenever step changes
  $: if ($currentStep) {
    scrollToTop();
  }
</script>

<!-- The 'dir' attribute is bound to the reactive '$direction' store -->
<div dir={$direction} class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
  <!-- Header -->
  <div class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <a href="#/" on:click|preventDefault={handleSubmissionComplete} class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span class="text-yellow-400 font-bold text-xl">S</span>
            </div>
            <span class="text-2xl font-bold text-gray-900">{$translations.header?.appName || 'StayFi'}</span>
          </a>
          <a href="#/dashboard" class="px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Dashboard
          </a>
        </div>
        
        <div class="flex items-center gap-4">
          <!-- Language Selector -->
          <div class="relative">
            <button
              type="button"
              on:click={toggleLanguageDropdown}
              class="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
            >
              <span class="text-xl">{currentLangData.flag}</span>
              <span class="text-sm font-medium text-gray-700">{currentLangData.name}</span>
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {#if showLangDropdown}
              <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" on:click|stopPropagation>
                {#each languages as lang}
                  <button
                    type="button"
                    on:click={(e) => changeLanguage(lang.code, e)}
                    class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left {$currentLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}"
                  >
                    <span class="text-xl">{lang.flag}</span>
                    <span class="font-medium">{lang.name}</span>
                    {#if $currentLanguage === lang.code}
                      <svg class="w-5 h-5 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
          
          <div class="text-sm text-gray-600">
            {$translations.header?.stepLabel || 'Step'} <span class="font-bold text-blue-600">{$currentStep}</span> {$translations.header?.of || 'of'} {totalSteps}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Progress Bar -->
  <div class="bg-white border-b border-gray-200">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-500 ease-out"
          style="width: {($currentStep / totalSteps) * 100}%"
        ></div>
      </div>
    </div>
  </div>

  <!-- Content -->
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    {#if stepMapping[$currentStep] === 'userType'}
      <SelectUserType on:select={(e) => handleUserTypeSelect(e.detail)} />
    {:else if stepMapping[$currentStep] === 'information'}
      {#if $userType === 'company'}
        <CompanyInformation on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
      {:else if $userType === 'customer'}
        <CustomerInformation on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
      {/if}
    {:else if stepMapping[$currentStep] === 'emailVerification'}
      <EmailVerification 
        email={$formData.email} 
        name={$formData.name || $formData.companyName}
        on:verified={() => currentStep.update(n => n + 1)} 
      />
    {:else if stepMapping[$currentStep] === 'projectDescription'}
      {#if $userType === 'company'}
        <CompanyProjectDescription on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
      {:else if $userType === 'customer'}
        <CustomerProjectDescription on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
      {/if}
    {:else if stepMapping[$currentStep] === 'platformSelection'}
      <PlatformSelection on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
    {:else if stepMapping[$currentStep] === 'siteRequirements'}
      <SiteRequirements on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
    {:else if stepMapping[$currentStep] === 'securityPayment'}
      <SecurityPayment on:back={handleBack} on:next={() => currentStep.update(n => n + 1)} bind:formData={$formData} />
    {:else if stepMapping[$currentStep]?.type === 'custom'}
      <DynamicStep 
        step={stepMapping[$currentStep].step}
        bind:formData={$formData}
        on:back={handleBack}
        on:next={() => currentStep.update(n => n + 1)}
      />
    {:else if stepMapping[$currentStep] === 'summary'}
      <Summary 
        on:back={handleBack} 
        on:edit={handleEditFromSummary} 
        on:submit={handleSubmissionComplete}
        formData={$formData} 
      />
    {/if}
  </div>
</div>

<svelte:window on:click={() => showLangDropdown = false} />
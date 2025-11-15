<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../../stores/language.js';
  import TextArea from '../../components/TextArea.svelte';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  // This local object correctly captures the input from the text areas
  let projectData = {
    principalGoal: formData.principalGoal || '',
    currentProblem: formData.currentProblem || '',
    targetAudience: formData.targetAudience || ''
    // removed unused properties like expectedSolution
  };

  let errors = {};

  function validateForm() {
    errors = {};
    const t = $translations.validation || {};
    if (!projectData.principalGoal.trim()) errors.principalGoal = t.required || 'Principal goal is required';
    if (!projectData.currentProblem.trim()) errors.currentProblem = t.required || 'Current problem is required';
    if (!projectData.targetAudience.trim()) errors.targetAudience = t.required || 'Target audience is required';
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateForm()) {
      // --- FIX IS HERE ---
      // Instead of re-creating the formData object, we now update its properties directly.
      // This ensures the central store in the parent component is correctly updated.
      formData.principalGoal = projectData.principalGoal;
      formData.currentProblem = projectData.currentProblem;
      formData.targetAudience = projectData.targetAudience;
      
      dispatch('next');
    }
  }
</script>

<div class="max-w-3xl mx-auto">
  <!-- Header Section -->
  <div class="mb-6 md:mb-8">
    <button 
      on:click={() => dispatch('back')}
      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
    >
      {#if $direction === 'rtl'}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      {/if}
      {$translations.projectDescription?.back || 'Back'}
    </button>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
      {$translations.projectDescription?.title || 'Project Overview'}
    </h2>
    <p class="text-base sm:text-lg text-gray-600">{$translations.projectDescription?.subtitle || 'Help us understand your project vision'}</p>
  </div>

  <!-- Form Section -->
  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
    <form on:submit|preventDefault={handleNext} class="space-y-4 md:space-y-6">
      
      <!-- Principal Goal -->
      <div class="bg-gradient-to-r from-blue-50 to-transparent p-4 sm:p-6 rounded-xl border border-blue-100">
        <div class="flex items-start gap-3 sm:gap-4">
          <div class="hidden sm:flex w-10 h-10 bg-blue-600 rounded-lg items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div class="flex-1">
            <TextArea
              label={$translations.projectDescription?.principalGoal || 'Principal Goal'}
              bind:value={projectData.principalGoal}
              placeholder={$translations.projectDescription?.principalGoalPlaceholder || 'What is the main objective?'}
              error={errors.principalGoal}
              required={true}
              rows={3}
              helpText={$translations.projectDescription?.principalGoalHelpText || "Describe the primary business goal..."}
            />
          </div>
        </div>
      </div>

      <!-- Current Problem -->
      <div class="bg-gradient-to-r from-yellow-50 to-transparent p-4 sm:p-6 rounded-xl border border-yellow-100">
        <div class="flex items-start gap-3 sm:gap-4">
          <div class="hidden sm:flex w-10 h-10 bg-yellow-500 rounded-lg items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div class="flex-1">
            <TextArea
              label={$translations.projectDescription?.currentProblem || 'Current Challenge'}
              bind:value={projectData.currentProblem}
              placeholder={$translations.projectDescription?.currentProblemPlaceholder || 'What problem are you facing?'}
              error={errors.currentProblem}
              required={true}
              rows={3}
              helpText={$translations.projectDescription?.currentProblemHelpText || "Explain the challenges you're experiencing"}
            />
          </div>
        </div>
      </div>
      
      <!-- Target Audience -->
      <div class="bg-gradient-to-r from-purple-50 to-transparent p-4 sm:p-6 rounded-xl border border-purple-100">
        <div class="flex items-start gap-3 sm:gap-4">
          <div class="hidden sm:flex w-10 h-10 bg-purple-600 rounded-lg items-center justify-center flex-shrink-0">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          </div>
          <div class="flex-1">
            <TextArea
              label={$translations.projectDescription?.targetAudience || 'Target Audience'}
              bind:value={projectData.targetAudience}
              placeholder={$translations.projectDescription?.targetAudiencePlaceholder || 'Who are the end users?'}
              error={errors.targetAudience}
              required={true}
              rows={3}
              helpText={$translations.projectDescription?.targetAudienceHelpText || "Understanding your audience is key"}
            />
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-2 md:pt-4">
        <button type="submit" class="inline-flex items-center px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5">
          {$translations.projectDescription?.continue || 'Continue'}
          {#if $direction === 'rtl'}
            <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
          {:else}
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
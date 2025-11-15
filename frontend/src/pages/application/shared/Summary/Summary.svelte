<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../../stores/language.js';
  import { submitApplication } from '../../../../stores/submit.js';
  import SuccessModal from './components/SuccessModal.svelte';
  import SummarySection from './components/SummarySection.svelte';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let submitting = false;
  let showSuccessModal = false;

  // This definition is correct. `t` is a reactive OBJECT, not a store.
  $: t = $translations.summary || {};

  async function handleSubmit() {
    submitting = true;
    
    try {
      const data = await submitApplication(formData);
      
      // Store submission ID for reference
      formData.submissionId = data.submissionId;
      
      submitting = false;
      showSuccessModal = true;
    } catch (error) {
      console.error('Submission error:', error);
      const errorMessage = error.message || 'Failed to submit application. Please ensure the backend server is running.';
      alert(t.errorSubmitting || errorMessage);
      submitting = false;
    }
  }

  function closeModal() {
    showSuccessModal = false;
    window.location.reload();
  }

  function handleEdit(event) {
    dispatch('edit', { step: event.detail.step });
  }

  $: formattedDate = new Date().toLocaleDateString($translations.currentLanguage?.code || 'en-US', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });
</script>

<div class="max-w-4xl mx-auto">
  <div class="mb-8 sm:mb-12 text-center">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {t.title || 'Application Summary'}
    </h1>
    <p class="text-base sm:text-lg text-gray-600">
      {t.subtitle || 'Review your project details'}
    </p>
    <div class="mt-4 text-sm text-gray-500">
      {formattedDate}
    </div>
  </div>

  <article class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-8 md:p-12 space-y-12">
    <SummarySection {formData} on:edit={handleEdit} />
  </article>

  <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
    <button type="button" on:click={() => dispatch('back')} class="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all inline-flex items-center justify-center">
      {#if $direction === 'rtl'}
        <!-- FIXED: Removed incorrect '$' from t -->
        {t.backToEdit || 'Back to Edit'}
        <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      {:else}
        <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        <!-- FIXED: Removed incorrect '$' from t -->
        {t.backToEdit || 'Back to Edit'}
      {/if}
    </button>
    
    <button type="button" on:click={handleSubmit} disabled={submitting} class="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg inline-flex items-center justify-center">
      {#if submitting}
        <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <!-- FIXED: Removed incorrect '$' from t -->
        <span class="ml-3">{t.submitting || 'Submitting...'}</span>
      {:else}
        <!-- FIXED: Removed incorrect '$' from t -->
        {t.submit || 'Submit Application'}
        {#if $direction === 'rtl'}
          <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {:else}
          <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        {/if}
      {/if}
    </button>
  </div>
</div>

<SuccessModal show={showSuccessModal} email={formData.email} on:close={closeModal} />
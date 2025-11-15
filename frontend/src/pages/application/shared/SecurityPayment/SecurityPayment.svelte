<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../../stores/language.js';
  import RecaptchaSection from './components/RecaptchaSection.svelte';
  import SecurityLevelSelector from './components/SecurityLevelSelector.svelte';
  import PaymentMethodSelector from './components/PaymentMethodSelector.svelte';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let security = {
    recaptcha: formData.recaptcha || false,
    securityLevel: formData.securityLevel || '',
    paymentMethods: formData.paymentMethods || [],
    otherPayment: formData.otherPayment || ''
  };

  let errors = {};

  $: showOtherPayment = security.paymentMethods.includes('other-payment');

  function validateForm() {
    errors = {};
    const t = $translations.securityPayment?.validation || {};
    if (!security.securityLevel) {
      errors.securityLevel = t.selectSecurityLevel || 'Please select a security level';
    }
    if (showOtherPayment && !security.otherPayment.trim()) {
      errors.otherPayment = t.specifyPayment || 'Please specify your payment method';
    }
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateForm()) {
      formData = { ...formData, ...security };
      dispatch('next');
    }
  }
</script>

<div class="max-w-4xl mx-auto">
  <div class="mb-6 md:mb-8">
    <button on:click={() => dispatch('back')} class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors">
      {#if $direction === 'rtl'}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      {/if}
      {$translations.securityPayment?.back || 'Back'}
    </button>
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
      {$translations.securityPayment?.title || 'Security &'} <span class="text-blue-600">{$translations.securityPayment?.highlightedTitle || 'Payment'}</span>
    </h2>
    <p class="text-base sm:text-lg text-gray-600">{$translations.securityPayment?.subtitle || 'Configure options'}</p>
  </div>

  <form on:submit|preventDefault={handleNext} class="space-y-6 md:space-y-8">
    <RecaptchaSection bind:recaptcha={security.recaptcha} />
    
    <!-- FIXED: Changed from bind: to explicit property and event handling -->
    <SecurityLevelSelector 
      securityLevel={security.securityLevel}
      on:select={(event) => security.securityLevel = event.detail}
      error={errors.securityLevel} 
    />
    
    <PaymentMethodSelector 
      bind:paymentMethods={security.paymentMethods} 
      bind:otherPayment={security.otherPayment} 
      {showOtherPayment} 
      error={errors.otherPayment} 
    />

    <div class="flex justify-end pt-4">
      <button type="submit" class="inline-flex items-center px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5">
        {$translations.securityPayment?.continue || 'Continue'}
        {#if $direction === 'rtl'}
          <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" /></svg>
        {:else}
          <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        {/if}
      </button>
    </div>
  </form>
</div>
<script>
  import { createEventDispatcher } from 'svelte';
  // Import the translations store
  import { translations } from '../../../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  export let canResend = false;
  export let countdown = 60;
  
  let resendLoading = false;

  async function handleResend() {
    resendLoading = true;
    dispatch('resend');
    setTimeout(() => {
      resendLoading = false;
    }, 1000);
  }
</script>

<div class="text-center pt-6 border-t border-gray-200">
  <p class="text-sm text-gray-600 mb-3">{$translations.emailVerification?.noCodeReceived || 'Didn\'t receive the code?'}</p>
  {#if canResend}
    <button
      on:click={handleResend}
      disabled={resendLoading}
      class="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if resendLoading}
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {$translations.emailVerification?.sending || 'Sending...'}
      {:else}
        {$translations.emailVerification?.resend || 'Resend Code'}
      {/if}
    </button>
  {:else}
    <p class="text-sm text-gray-500">
      {$translations.emailVerification?.resendIn || 'Resend code in'} <span class="font-semibold text-blue-600">{countdown}s</span>
    </p>
  {/if}
</div>
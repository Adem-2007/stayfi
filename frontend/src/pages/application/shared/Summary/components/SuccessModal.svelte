<script>
  import { createEventDispatcher } from 'svelte';
  import { translations } from '../../../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  export let show = false;
  export let email = '';
  
  $: t = $translations.summary?.modal || {};
  // Generate a random but stable reference number for the session
  const refNumber = `SF-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
</script>

{#if show}
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" on:click={() => dispatch('close')}>
    <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 transform transition-all animate-scale-in" on:click|stopPropagation>
      <div class="flex justify-center mb-6">
        <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce-once">
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
        </div>
      </div>
      <div class="text-center space-y-4">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">{t.title || 'Thank You!'}</h2>
        <p class="text-base sm:text-lg text-gray-700 leading-relaxed">{t.subtitle || 'We will contact you soon'}</p>
        <div class="bg-blue-50 rounded-2xl p-4 sm:p-6 space-y-3">
          <div class="flex items-start gap-3 text-left rtl:text-right">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            <div>
              <div class="font-semibold text-gray-900 mb-1">{t.confirmation || 'Confirmation'}</div>
              <div class="text-sm text-gray-600">{t.sentTo?.replace('{email}', email) || `Sent to ${email}`}</div>
            </div>
          </div>
          <div class="flex items-start gap-3 text-left rtl:text-right">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <div class="font-semibold text-gray-900 mb-1">{t.responseTime || 'Response Time'}</div>
              <div class="text-sm text-gray-600">{t.withinHours || 'Within 24-48 hours'}</div>
            </div>
          </div>
          <div class="flex items-start gap-3 text-left rtl:text-right">
            <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <div>
              <div class="font-semibold text-gray-900 mb-1">{t.nextSteps || 'Next Steps'}</div>
              <div class="text-sm text-gray-600">{t.proposal || 'Detailed proposal'}</div>
            </div>
          </div>
        </div>
        <div class="pt-4">
          <div class="text-xs text-gray-500 mb-2">{t.refNumber || 'Reference Number'}</div>
          <div class="text-2xl font-bold text-gray-900 font-mono tracking-wider">{refNumber}</div>
        </div>
      </div>
      <button type="button" on:click={() => dispatch('close')} class="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">
        {t.close || 'Close'}
      </button>
    </div>
  </div>
{/if}

<style>
  @keyframes bounce-once { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
  @keyframes scale-in { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
  .animate-bounce-once { animation: bounce-once 0.6s ease-in-out; }
  .animate-scale-in { animation: scale-in 0.3s ease-out; }
</style>
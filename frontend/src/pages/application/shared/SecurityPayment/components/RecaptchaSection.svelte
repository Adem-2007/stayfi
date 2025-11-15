<script>
  import { translations } from '../../../../../stores/language.js';
  export let recaptcha = false;
  $: t = $translations.securityPayment?.recaptcha || {};
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-start gap-4">
    <input type="checkbox" id="recaptcha" bind:checked={recaptcha} class="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0" />
    <div class="flex-1">
      <label for="recaptcha" class="cursor-pointer">
        <div class="flex items-center flex-wrap gap-x-3 gap-y-1 mb-2">
          <h3 class="text-lg sm:text-xl font-bold text-gray-900">{t.title || 'Enable reCAPTCHA'}</h3>
          <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{t.recommendation || 'Recommended'}</span>
        </div>
        <p class="text-gray-600 mb-4">{t.description || 'Protect your application...'}</p>
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div class="text-sm text-blue-700">
              <strong>{t.benefitsTitle || 'Benefits:'}</strong> {t.benefitsText || 'Prevents spam...'}
            </div>
          </div>
        </div>
      </label>
    </div>
  </div>
</div>
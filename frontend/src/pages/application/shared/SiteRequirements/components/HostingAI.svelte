<script>
  import { translations } from '../../../../../stores/language.js';
  import Dropdown from '../../../components/Dropdown.svelte';
  import Input from '../../../components/Input.svelte';
  
  export let hosting = '';
  export let otherHosting = '';
  export let implementAI = false;
  export let aiAutomation = false;
  export let errors = {};

  $: t = $translations.siteRequirements?.hostingAi || {};
  $: hostingOptions = t.hostingOptions || [];
  
  $: showOtherHosting = hosting === (t.hostingOptions?.[t.hostingOptions?.length - 1] || 'Other');
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <!-- Hosting -->
  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200" data-error-key="hosting">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg></div>
      <h3 class="text-lg font-bold text-gray-900">{t.hostingTitle || 'Hosting'}</h3>
    </div>
    <Dropdown bind:value={hosting} options={hostingOptions} placeholder={t.hostingPlaceholder || 'Select...'} error={errors.hosting} required={true} />
    {#if showOtherHosting}
      <div class="mt-4">
        <Input label={t.otherHostingLabel || 'Specify'} bind:value={otherHosting} placeholder={t.otherHostingPlaceholder || 'e.g., Heroku...'} error={errors.otherHosting} required={true} />
      </div>
    {/if}
  </div>

  <!-- AI Features -->
  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg></div>
      <h3 class="text-lg font-bold text-gray-900">{t.aiTitle || 'AI Integration'}</h3>
    </div>
    <div class="space-y-3">
      <label class="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all">
        <input type="checkbox" bind:checked={implementAI} class="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 flex-shrink-0" />
        <div class="flex-1">
          <div class="font-semibold text-gray-900">{t.aiFeatures || 'Implement AI Features'}</div>
          <div class="text-sm text-gray-600">{t.aiFeaturesDesc || 'Add AI capabilities...'}</div>
        </div>
      </label>
      <label class="flex items-start gap-3 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all">
        <input type="checkbox" bind:checked={aiAutomation} class="w-5 h-5 mt-0.5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500 flex-shrink-0" />
        <div class="flex-1">
          <div class="font-semibold text-gray-900">{t.aiAutomation || 'AI Automation'}</div>
          <div class="text-sm text-gray-600">{t.aiAutomationDesc || 'Automate workflows...'}</div>
        </div>
      </label>
    </div>
  </div>
</div>
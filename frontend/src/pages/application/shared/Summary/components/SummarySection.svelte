<script>
  import { createEventDispatcher } from 'svelte';
  import { translations } from '../../../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  export let formData = {};

  $: t = $translations.summary?.sections || {};
  $: c = $translations.summary?.common || {};

  function handleEdit(step) {
    dispatch('edit', { step });
  }

  // Helper to safely get nested properties
  const get = (obj, path, defaultValue) => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      result = result?.[key];
      if (result === undefined) return defaultValue;
    }
    return result;
  };

  // Map platform IDs to translated names
  $: platformNames = (formData.platforms || []).map(id => {
    const platform = get($translations, `platformSelection.${id}Name`);
    return platform ? platform : id.charAt(0).toUpperCase() + id.slice(1);
  });
</script>

<!-- Applicant Information -->
<section>
  <div class="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900">1. {t.applicant?.title || 'Applicant'}</h2>
    <button type="button" on:click={() => handleEdit('customer')} class="px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
      {c.edit || 'Edit'}
    </button>
  </div>
  <div>
    <p class="text-gray-700 leading-relaxed mb-4">
      {t.applicant?.submittedBy || 'Submitted by'} 
      <strong>{formData.name || formData.companyName || c.na}</strong>
      {#if formData.userType === 'company'}
        , {@html t.applicant?.companyIntro?.replace('{industry}', `<strong>${formData.industry || c.na}</strong>`)?.replace('{employeeCount}', `<strong>${formData.employeeCount || c.na}</strong>`)}
      {:else}
        , {t.applicant?.individualIntro || 'an individual.'}
      {/if}
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="bg-gray-50 p-4 rounded-lg"><div class="text-sm text-gray-500 mb-1">{t.applicant?.contactEmail}</div><div class="font-medium text-gray-900">{formData.email || c.na}</div></div>
      <div class="bg-gray-50 p-4 rounded-lg"><div class="text-sm text-gray-500 mb-1">{t.applicant?.phone}</div><div class="font-medium text-gray-900">{formData.phone || c.na}</div></div>
      <div class="bg-gray-50 p-4 rounded-lg"><div class="text-sm text-gray-500 mb-1">{t.applicant?.country}</div><div class="font-medium text-gray-900">{formData.country || c.na}</div></div>
      {#if formData.websiteUrl}<div class="bg-gray-50 p-4 rounded-lg"><div class="text-sm text-gray-500 mb-1">{t.applicant?.website}</div><div class="font-medium text-gray-900 truncate">{formData.websiteUrl}</div></div>{/if}
    </div>
  </div>
</section>

<!-- Project Overview -->
<section>
    <div class="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900">2. {t.project?.title || 'Project'}</h2>
        <button type="button" on:click={() => handleEdit('project')} class="px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>{c.edit || 'Edit'}</button>
    </div>
    <div class="space-y-6">
        {#if formData.userType === 'company'}
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.principalGoal}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.principalGoal || c.notSpecified}</p></div>
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.currentChallenge}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.currentProblem || c.notSpecified}</p></div>
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.targetAudience}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.targetAudience || c.notSpecified}</p></div>
        {:else}
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.principalGoal}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.principalGoal || c.notSpecified}</p></div>
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.currentChallenge}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.currentProblem || c.notSpecified}</p></div>
            <div><h3 class="text-lg font-semibold text-gray-900 mb-2">{t.project?.targetAudience}</h3><p class="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 rtl:border-l-0 rtl:border-r-4 border-gray-300">{formData.targetAudience || c.notSpecified}</p></div>
        {/if}
    </div>
</section>

<!-- Technical Specs -->
<section>
  <div class="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900">3. {t.tech?.title || 'Tech'}</h2>
    <button type="button" on:click={() => handleEdit('requirements')} class="px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>{c.edit || 'Edit'}</button>
  </div>
  <div class="space-y-6">
    <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.tech?.platforms}</h3><p class="text-gray-700 leading-relaxed mb-3">{t.tech?.platformsDesc}</p><ul class="list-disc list-inside space-y-1 text-gray-700 ml-4 rtl:ml-0 rtl:mr-4">{#each platformNames as name}<li>{name}</li>{/each}</ul></div>
    <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.tech?.stack}</h3><div class="space-y-4"><div><h4 class="text-base font-medium text-gray-800 mb-2">{t.tech?.frontend}</h4><p class="text-gray-700">{formData.frontendTech?.join(', ') || c.notSpecified}</p></div><div><h4 class="text-base font-medium text-gray-800 mb-2">{t.tech?.backend}</h4><p class="text-gray-700">{formData.backendTech?.join(', ') || c.notSpecified}</p></div><div><h4 class="text-base font-medium text-gray-800 mb-2">{t.tech?.database}</h4><p class="text-gray-700">{formData.database?.join(', ') || c.notSpecified}</p></div></div></div>
    <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.tech?.hostingInfra}</h3><p class="text-gray-700 leading-relaxed"><strong>{t.tech?.hosting}</strong> {formData.hosting || c.notSpecified}{#if formData.hosting === 'Other' && formData.otherHosting} ({formData.otherHosting}){/if}</p></div>
    <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.tech?.ai}</h3><div class="space-y-2"><p class="text-gray-700"><strong>{t.tech?.aiFeatures}</strong> {#if formData.implementAI}<span class="text-green-600 font-medium">✓ {t.tech?.enabled}</span>{:else}<span class="text-gray-500">{t.tech?.notIncluded}</span>{/if}</p><p class="text-gray-700"><strong>{t.tech?.aiAutomation}</strong> {#if formData.aiAutomation}<span class="text-green-600 font-medium">✓ {t.tech?.enabled}</span>{:else}<span class="text-gray-500">{t.tech?.notIncluded}</span>{/if}</p></div></div>
  </div>
</section>

<!-- Security & Payment -->
<section>
  <div class="flex items-center justify-between mb-6 pb-3 border-b-2 border-gray-200">
    <h2 class="text-xl sm:text-2xl font-bold text-gray-900">4. {t.security?.title || 'Security'}</h2>
    <button type="button" on:click={() => handleEdit('security')} class="px-3 sm:px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>{c.edit || 'Edit'}</button>
  </div>
  <div class="space-y-6">
    <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.security?.measures}</h3><p class="text-gray-700 leading-relaxed mb-3">{@html t.security?.measuresDesc?.replace('{securityLevel}', `<strong>${formData.securityLevel || 'standard'}</strong>`)?.replace('{recaptchaStatus}', formData.recaptcha ? (t.security?.withRecaptcha || 'including') : (t.security?.withoutRecaptcha || 'without'))}</p></div>
    {#if formData.paymentMethods?.length > 0}
      <div><h3 class="text-lg font-semibold text-gray-900 mb-3">{t.security?.payment}</h3><p class="text-gray-700 leading-relaxed mb-2">{t.security?.paymentDesc}</p><ul class="list-disc list-inside space-y-1 text-gray-700 ml-4 rtl:ml-0 rtl:mr-4">{#each formData.paymentMethods as method}<li class="capitalize">{method.replace('-', ' ')}</li>{/each}</ul></div>
    {/if}
  </div>
</section>

<!-- Conclusion -->
<section class="pt-6 border-t-2 border-gray-200">
  <p class="text-gray-700 leading-relaxed italic">{t.conclusion || 'This summary is final.'}</p>
</section>
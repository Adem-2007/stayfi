<script>
  import { createEventDispatcher } from 'svelte';
  // Import both translations and the new direction store
  import { translations, direction } from '../../../../stores/language.js';
  import Input from '../../components/Input.svelte';
  import Dropdown from '../../components/Dropdown.svelte';
  import TextArea from '../../components/TextArea.svelte';
  import countries from '../../../../data/countries.json';
  import industries from '../../../../data/industries.json';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let companyData = {
    name: formData.companyName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    whatsapp: formData.whatsapp || '',
    websiteUrl: formData.websiteUrl || '',
    employeeCount: formData.employeeCount || '',
    country: formData.country || '',
    address: formData.address || '',
    industry: formData.industry || ''
  };

  let errors = {};

  const employeeOptions = ['Less than 100', 'More than 100'];

  function validateForm() {
    errors = {};
    const t = $translations.validation || {};
    const fieldT = $translations.companyInfo || {};

    if (!companyData.name.trim()) errors.name = t.required || 'Company name is required';
    if (!companyData.email.trim()) {
      errors.email = t.required || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyData.email)) {
      errors.email = t.email || 'Please enter a valid email';
    }
    if (!companyData.phone.trim()) errors.phone = t.required || 'Phone number is required';
    if (!companyData.employeeCount) errors.employeeCount = t.required || 'Please select employee count';
    if (!companyData.country) errors.country = t.required || 'Please select a country';
    if (!companyData.industry) errors.industry = t.required || 'Please select an industry';

    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateForm()) {
      formData = { ...formData, ...companyData, userType: 'company' };
      dispatch('next');
    }
  }

  const buildingIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>';
  const emailIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>';
  const phoneIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>';
  const globeIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>';
  const usersIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>';
  const locationIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
  const briefcaseIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>';
</script>

<div class="max-w-3xl mx-auto">
  <div class="mb-8">
    <button 
      on:click={() => dispatch('back')}
      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
    >
      {#if $direction === 'rtl'}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      {:else}
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      {/if}
      {$translations.companyInfo?.back || 'Back'}
    </button>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      {$translations.companyInfo?.title || 'Company Information'}
    </h2>
    <p class="text-lg text-gray-600">{$translations.companyInfo?.subtitle || 'Tell us about your company so we can better serve your needs'}</p>
  </div>

  <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
    <form on:submit|preventDefault={handleNext} class="space-y-6">
      <Input
        label={$translations.companyInfo?.companyName || 'Company Name'}
        bind:value={companyData.name}
        placeholder={$translations.companyInfo?.companyNamePlaceholder || 'Enter your company name'}
        error={errors.name}
        required={true}
        icon={buildingIcon}
      />

      <div class="grid md:grid-cols-2 gap-6">
        <Input
          label={$translations.companyInfo?.email || 'Business Email'}
          type="email"
          bind:value={companyData.email}
          placeholder={$translations.companyInfo?.emailPlaceholder || 'company@example.com'}
          error={errors.email}
          required={true}
          icon={emailIcon}
        />
        <Input
          label={$translations.companyInfo?.phone || 'Phone Number'}
          type="tel"
          bind:value={companyData.phone}
          placeholder={$translations.companyInfo?.phonePlaceholder || '+1 (555) 000-0000'}
          error={errors.phone}
          required={true}
          icon={phoneIcon}
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Input
          label={$translations.customerInfo?.whatsappNumber || 'WhatsApp Number'}
          type="tel"
          bind:value={companyData.whatsapp}
          placeholder="+1 (555) 000-0000"
          optional={true}
          icon={phoneIcon}
        />
        <Input
          label={$translations.companyInfo?.websiteUrl || 'Website URL'}
          type="url"
          bind:value={companyData.websiteUrl}
          placeholder={$translations.companyInfo?.websiteUrlPlaceholder || 'https://example.com'}
          optional={true}
          icon={globeIcon}
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Dropdown
          label={$translations.companyInfo?.employeeCount || 'Company Size'}
          bind:value={companyData.employeeCount}
          options={employeeOptions}
          placeholder={$translations.companyInfo?.employeeCountPlaceholder || 'Select employee count'}
          error={errors.employeeCount}
          required={true}
          icon={usersIcon}
        />
        <Dropdown
          label={$translations.companyInfo?.industry || 'Industry'}
          bind:value={companyData.industry}
          options={industries}
          placeholder={$translations.companyInfo?.industryPlaceholder || 'Select your industry'}
          error={errors.industry}
          required={true}
          searchable={true}
          icon={briefcaseIcon}
        />
      </div>

      <Dropdown
        label={$translations.companyInfo?.country || 'Country'}
        bind:value={companyData.country}
        options={countries}
        placeholder={$translations.companyInfo?.countryPlaceholder || 'Select your country'}
        error={errors.country}
        required={true}
        searchable={true}
        icon={locationIcon}
      />

      <TextArea
        label={$translations.companyInfo?.businessAddress || 'Business Address'}
        bind:value={companyData.address}
        placeholder={$translations.companyInfo?.businessAddressPlaceholder || 'Enter your company address'}
        optional={true}
        rows={3}
      />

      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {$translations.companyInfo?.continue || 'Continue to Next Step'}
          {#if $direction === 'rtl'}
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          {:else}
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
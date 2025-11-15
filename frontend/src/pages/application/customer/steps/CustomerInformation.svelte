<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../../stores/language.js';
  import Input from '../../components/Input.svelte';
  import Dropdown from '../../components/Dropdown.svelte';
  import TextArea from '../../components/TextArea.svelte';
  import countries from '../../../../data/countries.json';
  
  const dispatch = createEventDispatcher();
  export let formData = {};
  
  let customerData = {
    name: formData.name || '',
    email: formData.email || '',
    phone: formData.phone || '',
    whatsapp: formData.whatsapp || '',
    websiteUrl: formData.websiteUrl || '',
    country: formData.country || '',
    service: formData.service || ''
  };

  let errors = {};

  function validateForm() {
    errors = {};
    const t = $translations.validation || {};
    if (!customerData.name.trim()) errors.name = t.required || 'Name is required';
    if (!customerData.email.trim()) {
      errors.email = t.required || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerData.email)) {
      errors.email = t.email || 'Please enter a valid email';
    }
    if (!customerData.phone.trim()) errors.phone = t.required || 'Phone number is required';
    if (!customerData.country) errors.country = t.required || 'Please select a country';
    if (!customerData.service.trim()) errors.service = t.required || 'Please describe the service you need';
    return Object.keys(errors).length === 0;
  }

  function handleNext() {
    if (validateForm()) {
      formData = { ...formData, ...customerData, userType: 'customer' };
      dispatch('next');
    }
  }

  const userIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
  const emailIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>';
  const phoneIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>';
  const globeIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>';
  const locationIcon = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>';
</script>

<div class="max-w-3xl mx-auto">
  <div class="mb-8">
    <button 
      on:click={() => dispatch('back')}
      class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
    >
      {#if $direction === 'rtl'}
        <!-- Right-pointing chevron for RTL "Back" -->
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      {:else}
        <!-- Left-pointing chevron for LTR "Back" -->
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      {/if}
      {$translations.customerInfo?.back || 'Back'}
    </button>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      {$translations.customerInfo?.title || 'Your Information'}
    </h2>
    <p class="text-lg text-gray-600">{$translations.customerInfo?.subtitle || 'Tell us about yourself and what you\'re looking for'}</p>
  </div>

  <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
    <form on:submit|preventDefault={handleNext} class="space-y-6">
      <Input
        label={$translations.customerInfo?.name || 'Full Name'}
        bind:value={customerData.name}
        placeholder={$translations.customerInfo?.namePlaceholder || 'Enter your full name'}
        error={errors.name}
        required={true}
        icon={userIcon}
      />

      <div class="grid md:grid-cols-2 gap-6">
        <Input
          label={$translations.customerInfo?.email || 'Email Address'}
          type="email"
          bind:value={customerData.email}
          placeholder={$translations.customerInfo?.emailPlaceholder || 'you@example.com'}
          error={errors.email}
          required={true}
          icon={emailIcon}
        />
        <Input
          label={$translations.customerInfo?.phone || 'Phone Number'}
          type="tel"
          bind:value={customerData.phone}
          placeholder={$translations.customerInfo?.phonePlaceholder || '+1 (555) 000-0000'}
          error={errors.phone}
          required={true}
          icon={phoneIcon}
        />
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <Input
          label={$translations.customerInfo?.whatsappNumber || 'WhatsApp Number'}
          type="tel"
          bind:value={customerData.whatsapp}
          placeholder="+1 (555) 000-0000"
          optional={true}
          icon={phoneIcon}
        />
        <Input
          label={$translations.customerInfo?.websiteUrl || 'Website URL'}
          type="url"
          bind:value={customerData.websiteUrl}
          placeholder={$translations.customerInfo?.websiteUrlPlaceholder || 'https://example.com'}
          optional={true}
          icon={globeIcon}
        />
      </div>

      <Dropdown
        label={$translations.customerInfo?.country || 'Country'}
        bind:value={customerData.country}
        options={countries}
        placeholder={$translations.customerInfo?.countryPlaceholder || 'Select your country'}
        error={errors.country}
        required={true}
        searchable={true}
        icon={locationIcon}
      />

      <TextArea
        label={$translations.customerInfo?.serviceDescription || 'Service Description'}
        bind:value={customerData.service}
        placeholder={$translations.customerInfo?.serviceDescriptionPlaceholder || 'Describe the software or service you need. Be as detailed as possible...'}
        error={errors.service}
        required={true}
        rows={5}
        helpText={$translations.customerInfo?.serviceHelpText || 'Tell us about your project, goals, timeline, and any specific requirements'}
      />

      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {$translations.customerInfo?.continue || 'Continue to Next Step'}
          {#if $direction === 'rtl'}
            <!-- Left-pointing arrow for RTL "Continue" -->
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          {:else}
            <!-- Right-pointing arrow for LTR "Continue" -->
            <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
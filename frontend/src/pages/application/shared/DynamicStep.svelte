<script>
  import { createEventDispatcher } from 'svelte';
  import { currentLanguage, translations } from '../../../stores/language.js';
  import Input from '../components/Input.svelte';
  import TextArea from '../components/TextArea.svelte';
  import Dropdown from '../components/Dropdown.svelte';
  import MultiSelect from '../components/MultiSelect.svelte';

  export let step;
  export let formData = {};

  const dispatch = createEventDispatcher();

  let errors = {};
  let localData = {};

  // Initialize local data from formData
  $: {
    if (step && step.fields) {
      step.fields.forEach(field => {
        if (formData[field.id] !== undefined) {
          localData[field.id] = formData[field.id];
        } else {
          // Initialize based on field type
          if (field.type === 'multiselect') {
            localData[field.id] = [];
          } else {
            localData[field.id] = '';
          }
        }
      });
    }
  }

  function validateField(field) {
    // Handle different field types
    if (field.type === 'multiselect') {
      if (field.required && (!localData[field.id] || localData[field.id].length === 0)) {
        errors[field.id] = $translations.validation?.selectAtLeastOne || 'Please select at least one option';
        return false;
      }
    } else if (field.type === 'dropdown') {
      if (field.required && !localData[field.id]) {
        errors[field.id] = $translations.validation?.required || 'This field is required';
        return false;
      }
    } else {
      // Input and textarea validation
      if (field.required && !localData[field.id]?.trim()) {
        errors[field.id] = $translations.validation?.required || 'This field is required';
        return false;
      }
    }
    
    if (field.type === 'input' && field.inputType === 'email' && localData[field.id]) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(localData[field.id])) {
        errors[field.id] = $translations.validation?.email || 'Please enter a valid email';
        return false;
      }
    }
    
    if (field.type === 'input' && field.inputType === 'url' && localData[field.id]) {
      try {
        new URL(localData[field.id]);
      } catch {
        errors[field.id] = $translations.validation?.url || 'Please enter a valid URL';
        return false;
      }
    }
    
    errors[field.id] = '';
    return true;
  }

  function handleNext() {
    errors = {};
    let isValid = true;

    step.fields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Update formData with local data
      Object.keys(localData).forEach(key => {
        formData[key] = localData[key];
      });
      
      dispatch('next');
    }
  }

  function handleBack() {
    dispatch('back');
  }
</script>

<div class="bg-white rounded-2xl shadow-xl p-8 md:p-12">
  <!-- Header -->
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">
      {step.title[$currentLanguage] || step.title.en}
    </h2>
    {#if step.subtitle[$currentLanguage] || step.subtitle.en}
      <p class="text-gray-600">
        {step.subtitle[$currentLanguage] || step.subtitle.en}
      </p>
    {/if}
  </div>

  <!-- Fields -->
  <div class="space-y-6 mb-8">
    {#each step.fields as field}
      <div>
        {#if field.type === 'input'}
          <Input
            label={field.label[$currentLanguage] || field.label.en}
            bind:value={localData[field.id]}
            type={field.inputType || 'text'}
            placeholder={field.placeholder[$currentLanguage] || field.placeholder.en || ''}
            error={errors[field.id] || ''}
            required={field.required}
            on:blur={() => validateField(field)}
          />
        {:else if field.type === 'textarea'}
          <TextArea
            label={field.label[$currentLanguage] || field.label.en}
            bind:value={localData[field.id]}
            placeholder={field.placeholder[$currentLanguage] || field.placeholder.en || ''}
            error={errors[field.id] || ''}
            required={field.required}
            helpText={field.helpText[$currentLanguage] || field.helpText.en || ''}
            on:blur={() => validateField(field)}
          />
        {:else if field.type === 'dropdown'}
          <Dropdown
            label={field.label[$currentLanguage] || field.label.en}
            bind:value={localData[field.id]}
            options={field.options.map(opt => opt[$currentLanguage] || opt.en)}
            placeholder={field.placeholder[$currentLanguage] || field.placeholder.en || 'Select an option'}
            error={errors[field.id] || ''}
            required={field.required}
            searchable={field.searchable || false}
          />
        {:else if field.type === 'multiselect'}
          <MultiSelect
            label={field.label[$currentLanguage] || field.label.en}
            bind:selected={localData[field.id]}
            options={field.options.map(opt => ({ id: opt.id, name: opt[$currentLanguage] || opt.en }))}
            placeholder={field.placeholder[$currentLanguage] || field.placeholder.en || 'Select options'}
            error={errors[field.id] || ''}
            required={field.required}
          />
        {/if}
      </div>
    {/each}
  </div>

  <!-- Actions -->
  <div class="flex items-center justify-between pt-6 border-t border-gray-200">
    <button
      on:click={handleBack}
      class="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
      {$translations.customerInfo?.back || 'Back'}
    </button>
    
    <button
      on:click={handleNext}
      class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
    >
      {$translations.customerInfo?.continue || 'Continue'}
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations } from '../../../stores/dashboardLanguage.js';
  import LanguageTabs from '../stepBuilder/components/LanguageTabs.svelte';
  import FieldTypeSelector from './components/FieldTypeSelector.svelte';
  import InputTypeSelector from './components/InputTypeSelector.svelte';
  import OptionsManager from './components/OptionsManager.svelte';
  import FieldProperties from './components/FieldProperties.svelte';
  import ActionButtons from '../stepBuilder/components/ActionButtons.svelte';

  export let field = null;

  const dispatch = createEventDispatcher();

  let fieldData = field ? JSON.parse(JSON.stringify(field)) : {
    id: Date.now().toString(),
    type: 'input',
    label: { en: '', fr: '', ar: '' },
    placeholder: { en: '', fr: '', ar: '' },
    helpText: { en: '', fr: '', ar: '' },
    required: false,
    inputType: 'text',
    options: [],
    searchable: false
  };

  let currentLang = 'en';

  function handleSave() {
    if (!fieldData.label.en || !fieldData.label.fr || !fieldData.label.ar) {
      alert($dashboardTranslations.validation?.fillAllLanguages || 'Please fill in the label for all languages');
      return;
    }
    
    if ((fieldData.type === 'dropdown' || fieldData.type === 'multiselect') && fieldData.options.length === 0) {
      alert($dashboardTranslations.validation?.addOneOption || 'Please add at least one option');
      return;
    }
    
    dispatch('save', fieldData);
  }

  function handleCancel() {
    dispatch('cancel');
  }

  function handleAddOption(event) {
    fieldData.options = [...fieldData.options, event.detail];
  }

  function handleRemoveOption(event) {
    fieldData.options = fieldData.options.filter(opt => opt.id !== event.detail);
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
  <div class="mb-6 sm:mb-8">
    <div class="flex items-start justify-between gap-3 mb-2">
      <h3 class="text-lg sm:text-xl font-bold text-gray-900">
        {field ? ($dashboardTranslations.fieldEditor?.titleEdit || 'Edit Field') : ($dashboardTranslations.fieldEditor?.titleCreate || 'Add New Field')}
      </h3>
      <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
        {field ? 'Edit' : 'New'}
      </span>
    </div>
    <p class="text-sm sm:text-base text-gray-600">{$dashboardTranslations.fieldEditor?.subtitle || 'Configure field properties and translations'}</p>
  </div>

  <LanguageTabs bind:currentLang />

  <div class="space-y-6">
    <FieldTypeSelector bind:selectedType={fieldData.type} />

    {#if fieldData.type === 'input'}
      <InputTypeSelector bind:inputType={fieldData.inputType} />
    {/if}

    {#if fieldData.type === 'dropdown' || fieldData.type === 'multiselect'}
      <OptionsManager 
        bind:options={fieldData.options}
        bind:searchable={fieldData.searchable}
        {currentLang}
        showSearchable={fieldData.type === 'dropdown'}
        on:add={handleAddOption}
        on:remove={handleRemoveOption}
      />
    {/if}

    <FieldProperties bind:fieldData {currentLang} />
  </div>

  <ActionButtons 
    on:save={handleSave}
    on:cancel={handleCancel}
  />
</div>

<script>
  import { createEventDispatcher } from 'svelte';
  import FieldEditor from '../fieldEditor/FieldEditor.svelte';
  import LanguageTabs from './components/LanguageTabs.svelte';
  import StepInformation from './components/StepInformation.svelte';
  import FieldsList from './components/FieldsList.svelte';
  import ActionButtons from './components/ActionButtons.svelte';
  import { dashboardTranslations } from '../../../stores/dashboardLanguage.js';

  export let step = null;

  const dispatch = createEventDispatcher();

  let stepData = step ? JSON.parse(JSON.stringify(step)) : {
    id: Date.now().toString(),
    title: { en: '', fr: '', ar: '' },
    subtitle: { en: '', fr: '', ar: '' },
    fields: [],
    order: 0
  };

  let currentLang = 'en';
  let showFieldEditor = false;
  let editingField = null;

  function handleAddField() {
    editingField = null;
    showFieldEditor = true;
  }

  function handleEditField(event) {
    editingField = event.detail;
    showFieldEditor = true;
  }

  function handleSaveField(event) {
    const field = event.detail;
    
    if (editingField) {
      const index = stepData.fields.findIndex(f => f.id === editingField.id);
      if (index !== -1) {
        stepData.fields[index] = field;
      }
    } else {
      stepData.fields = [...stepData.fields, field];
    }
    
    showFieldEditor = false;
    editingField = null;
  }

  function handleDeleteField(event) {
    if (confirm($dashboardTranslations.confirm?.deleteField || 'Delete this field?')) {
      stepData.fields = stepData.fields.filter(f => f.id !== event.detail);
    }
  }

  function handleSave() {
    if (!stepData.title.en || !stepData.title.fr || !stepData.title.ar) {
      alert($dashboardTranslations.validation?.fillAllLanguages || 'Please fill in the title for all languages');
      return;
    }
    
    if (stepData.fields.length === 0) {
      alert($dashboardTranslations.validation?.addOneOption || 'Please add at least one field');
      return;
    }
    
    dispatch('save', stepData);
  }

  function handleCancel() {
    dispatch('cancel');
  }
</script>

<div class="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
  <div class="mb-6 sm:mb-8">
    <div class="flex items-start justify-between gap-3 mb-2">
      <h2 class="text-xl sm:text-2xl font-bold text-gray-900">
        {step ? ($dashboardTranslations.stepBuilder?.titleEdit || 'Edit Step') : ($dashboardTranslations.stepBuilder?.titleCreate || 'Create New Step')}
      </h2>
      <span class="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full whitespace-nowrap">
        {step ? 'Edit' : 'New'}
      </span>
    </div>
    <p class="text-sm sm:text-base text-gray-600">{$dashboardTranslations.stepBuilder?.subtitle || 'Define your custom step with multi-language support'}</p>
  </div>

  {#if !showFieldEditor}
    <LanguageTabs bind:currentLang />
    
    <StepInformation bind:stepData {currentLang} />
    
    <FieldsList 
      bind:fields={stepData.fields}
      {currentLang}
      on:addField={handleAddField}
      on:editField={handleEditField}
      on:deleteField={handleDeleteField}
    />

    <ActionButtons 
      on:save={handleSave}
      on:cancel={handleCancel}
    />
  {:else}
    <FieldEditor 
      field={editingField}
      on:save={handleSaveField}
      on:cancel={() => showFieldEditor = false}
    />
  {/if}
</div>

<script>
  import { translations } from '../../../../../stores/language.js';
  import DynamicList from '../../../components/DynamicList.svelte';
  
  export let verificationMethods = [];
  export let database = [];
  export let otherDatabase = [];
  export let errors = {};

  $: t = $translations.siteRequirements?.verificationDb || {};
  $: verificationOptions = t.verificationOptions || [];
  $: databases = t.databaseOptions || [];

  $: showOtherDatabase = database.includes('other-db');

  function toggleSelection(id, type) {
    let currentSelection = type === 'verification' ? verificationMethods : database;
    const index = currentSelection.indexOf(id);
    if (index > -1) {
      currentSelection = currentSelection.filter(item => item !== id);
    } else {
      currentSelection = [...currentSelection, id];
    }
    if (type === 'verification') {
      verificationMethods = currentSelection;
    } else {
      database = currentSelection;
    }
  }
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
  <!-- User Verification -->
  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg></div>
      <h4 class="text-lg font-bold text-gray-900">{t.verificationTitle || 'User Verification'}</h4>
    </div>
    <div class="space-y-3">
      {#each verificationOptions as option}
        {@const isSelected = verificationMethods.includes(option.id)}
        <button type="button" on:click={() => toggleSelection(option.id, 'verification')} class="w-full p-4 border-2 rounded-xl transition-all {isSelected ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}">
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-green-600 border-green-600' : 'border-gray-300'}">{#if isSelected}<svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>{/if}</div>
            <div class="flex-1 text-left rtl:text-right">
              <div class="font-semibold text-gray-900">{option.name}</div>
              <div class="text-sm text-gray-500">{option.description}</div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Database -->
  <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200" data-error-key="database">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg></div>
      <h4 class="text-lg font-bold text-gray-900">{t.databaseTitle || 'Database'}</h4>
    </div>
    <div class="space-y-3">
      {#each databases as db}
        {@const isSelected = database.includes(db.id)}
        <button type="button" on:click={() => toggleSelection(db.id, 'database')} class="w-full p-4 border-2 rounded-xl transition-all {isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}">
          <div class="flex items-start gap-3">
            <div class="w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 transition-all {isSelected ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300'}">{#if isSelected}<svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>{/if}</div>
            <div class="flex-1 text-left rtl:text-right">
              <div class="font-semibold text-gray-900">{db.name}</div>
              <div class="text-sm text-gray-500">{db.description}</div>
            </div>
          </div>
        </button>
      {/each}
    </div>
    {#if errors.database}<p class="mt-2 text-sm text-red-600">{errors.database}</p>{/if}
    {#if showOtherDatabase}
      <div class="mt-4 border-t pt-4">
        <DynamicList label={t.otherDatabaseLabel} bind:items={otherDatabase} placeholder={t.otherDatabasePlaceholder} required={true} />
      </div>
    {/if}
  </div>
</div>
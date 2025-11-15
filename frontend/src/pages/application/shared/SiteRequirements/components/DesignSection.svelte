<script>
  import { translations } from '../../../../../stores/language.js';
  import Input from '../../../components/Input.svelte';
  import TextArea from '../../../components/TextArea.svelte';
  import FileUpload from '../../../components/FileUpload.svelte';
  
  export let designOption = '';
  export let designDescription = '';
  export let designUrl = '';
  export let designFiles = [];

  $: t = $translations.siteRequirements?.design || {};
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
      <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
    </div>
    <h3 class="text-lg sm:text-xl font-bold text-gray-900">{t.title || 'Design Preferences'}</h3>
  </div>
  
  <div class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      <button type="button" on:click={() => designOption = 'upload'} class="p-4 sm:p-6 text-center border-2 rounded-xl transition-all {designOption === 'upload' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}">
        <svg class="w-8 h-8 mx-auto mb-3 {designOption === 'upload' ? 'text-blue-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
        <div class="font-semibold text-gray-900">{t.upload || 'Upload Design'}</div>
        <div class="text-xs text-gray-500 mt-1">{t.uploadDesc || 'Images or mockups'}</div>
      </button>
      
      <button type="button" on:click={() => designOption = 'describe'} class="p-4 sm:p-6 text-center border-2 rounded-xl transition-all {designOption === 'describe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}">
        <svg class="w-8 h-8 mx-auto mb-3 {designOption === 'describe' ? 'text-blue-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        <div class="font-semibold text-gray-900">{t.describe || 'Describe Design'}</div>
        <div class="text-xs text-gray-500 mt-1">{t.describeDesc || 'Text description'}</div>
      </button>
      
      <button type="button" on:click={() => designOption = 'url'} class="p-4 sm:p-6 text-center border-2 rounded-xl transition-all {designOption === 'url' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}">
        <svg class="w-8 h-8 mx-auto mb-3 {designOption === 'url' ? 'text-blue-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        <div class="font-semibold text-gray-900">{t.share || 'Share Link'}</div>
        <div class="text-xs text-gray-500 mt-1">{t.shareDesc || 'Figma, Adobe XD'}</div>
      </button>
    </div>
    
    {#if designOption}
    <div class="border-t pt-6">
      {#if designOption === 'upload'}
        <FileUpload label={t.uploadLabel || 'Upload...'} bind:files={designFiles} accept="image/*,.pdf,.fig" multiple={true} />
      {:else if designOption === 'describe'}
        <TextArea label={t.describeLabel || 'Describe...'} bind:value={designDescription} placeholder={t.describePlaceholder || 'Colors, layout...'} rows={5} />
      {:else if designOption === 'url'}
        <Input label={t.urlLabel || 'URL...'} bind:value={designUrl} placeholder={t.urlPlaceholder || 'https://...'} type="url" />
      {/if}
    </div>
    {/if}
  </div>
</div>
<script>
  import { translations } from '../../../stores/language.js'; // Adjust the path as needed

  export let label = '';
  export let value = '';
  export let options = [];
  export let placeholder = 'Select an option';
  export let error = '';
  export let required = false;
  export let icon = null;
  export let searchable = false;
  
  let isOpen = false;
  let searchQuery = '';
  
  $: filteredOptions = searchable && searchQuery
    ? options.filter(opt => opt.toLowerCase().includes(searchQuery.toLowerCase()))
    : options;
  
  function selectOption(option) {
    value = option;
    isOpen = false;
    searchQuery = '';
  }
  
  function toggleDropdown(event) {
    event.stopPropagation();
    isOpen = !isOpen;
    if (!isOpen) searchQuery = '';
  }
  
  function handleClickOutside(event) {
    if (isOpen) {
      isOpen = false;
      searchQuery = '';
    }
  }
</script>

<div class="w-full relative">
  {#if label}
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="relative">
    <button
      type="button"
      on:click|stopPropagation={toggleDropdown}
      class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left flex items-center justify-between {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'} {icon ? 'pl-12' : ''}"
    >
      {#if icon}
        <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {@html icon}
        </div>
      {/if}
      
      <span class="{value ? 'text-gray-900' : 'text-gray-400'}">
        {value || placeholder}
      </span>
      
      <svg class="w-5 h-5 text-gray-400 transition-transform {isOpen ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    
    {#if isOpen}
      <div class="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-hidden" on:click|stopPropagation>
        {#if searchable}
          <div class="p-2 border-b border-gray-200">
            <input
              type="text"
              bind:value={searchQuery}
              placeholder={$translations.common?.search || 'Search...'}
              class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              on:click|stopPropagation
            />
          </div>
        {/if}
        
        <div class="overflow-y-auto max-h-48">
          {#each filteredOptions as option}
            <button
              type="button"
              on:click|stopPropagation={() => selectOption(option)}
              class="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors flex items-center justify-between {value === option ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}"
            >
              {option}
              {#if value === option}
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              {/if}
            </button>
          {/each}
          
          {#if filteredOptions.length === 0}
            <div class="px-4 py-8 text-center text-gray-500">
              {$translations.common?.noOptionsFound || 'No options found'}
            </div>
          {/if}
        </div>
      </div>
    {/if}
  </div>
  
  {#if error}
    <p class="mt-2 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {error}
    </p>
  {/if}
</div>

<svelte:body on:click={handleClickOutside} />
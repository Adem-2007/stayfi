<script>
  import { translations } from '../../../stores/language.js';
  import { direction } from '../../../stores/language.js'; // Import direction store

  export let label = '';
  export let value = '';
  export let placeholder = '';
  export let error = '';
  export let required = false;
  export let rows = 4;
  export let optional = false;
  export let helpText = '';
</script>

<div class="w-full">
  {#if label}
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
      {#if optional}
        <span class="text-gray-400 text-xs font-normal ml-1">({$translations.common?.optional || 'Optional'})</span>
      {/if}
    </label>
  {/if}
  
  <textarea
    bind:value
    {placeholder}
    {rows}
    class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}"
    class:text-right={$direction === 'rtl'}
    on:input
    on:blur
  ></textarea>
  
  {#if error}
    <p class="mt-2 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {error}
    </p>
  {:else if helpText}
    <p class="mt-2 text-xs text-gray-500 flex items-center gap-1">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {helpText}
    </p>
  {/if}
</div>
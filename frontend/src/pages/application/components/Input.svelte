<script>
  import { translations } from '../../../stores/language.js';
  import { direction } from '../../../stores/language.js'; // Import direction store

  export let label = '';
  export let value = '';
  export let type = 'text';
  export let placeholder = '';
  export let error = '';
  export let required = false;
  export let icon = null;
  export let optional = false;
</script>

<div class="w-full">
  {#if label}
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
      {#if optional}
        <!-- This now correctly handles spacing in LTR and RTL -->
        <span 
          class="text-gray-400 text-xs font-normal"
          class:ml-1={$direction === 'ltr'}
          class:mr-1={$direction === 'rtl'}
        >
          ({$translations.common?.optional || 'Optional'})
        </span>
      {/if}
    </label>
  {/if}
  
  <div class="relative">
    {#if icon}
      <!-- Correctly positions the icon on the right in RTL mode -->
      <div 
        class="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
        class:left-4={$direction === 'ltr'}
        class:right-4={$direction === 'rtl'}
      >
        {@html icon}
      </div>
    {/if}
    
    <input
      {type}
      bind:value
      {placeholder}
      class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all {error ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'}"      
      class:pl-12={$direction === 'ltr' && icon}
      class:pr-12={$direction === 'rtl' && icon}
      class:text-right={$direction === 'rtl'}
      on:input
      on:blur
    />
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
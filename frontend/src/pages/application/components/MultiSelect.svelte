<script>
  import { translations } from '../../../stores/language.js'; // Adjust the path as needed

  export let label = '';
  export let items = [];
  export let placeholder = 'Enter item...';
  export let required = false;
  export let error = '';
  
  let currentItem = '';
  
  function addItem() {
    if (currentItem.trim()) {
      items = [...items, currentItem.trim()];
      currentItem = '';
    }
  }
  
  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
  }
  
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addItem();
    }
  }
</script>

<div class="w-full">
  {#if label}
    <label class="block text-sm font-semibold text-gray-700 mb-2">
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <div class="flex gap-2 mb-3">
    <input
      type="text"
      bind:value={currentItem}
      on:keypress={handleKeyPress}
      {placeholder}
      class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
    <button
      type="button"
      on:click={addItem}
      class="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {$translations.common?.add || 'Add'}
    </button>
  </div>
  
  {#if items.length > 0}
    <div class="space-y-2">
      {#each items as item, index}
        <div class="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group hover:bg-gray-100 transition-colors">
          <div class="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            {index + 1}
          </div>
          <div class="flex-1 text-gray-900">{item}</div>
          <button
            type="button"
            on:click={() => removeItem(index)}
            class="flex-shrink-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
  
  {#if error}
    <p class="mt-2 text-sm text-red-500 flex items-center gap-1">
      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      {error}
    </p>
  {/if}
</div>
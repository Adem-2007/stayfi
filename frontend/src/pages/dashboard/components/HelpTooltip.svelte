<script>
  export let text;
  let showTooltip = false;
</script>

<div class="relative inline-block">
  <button
    type="button"
    on:mouseenter={() => showTooltip = true}
    on:mouseleave={() => showTooltip = false}
    on:click={() => showTooltip = !showTooltip}
    class="inline-flex items-center justify-center w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
  >
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
    </svg>
  </button>
  
  {#if showTooltip}
    <div class="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg whitespace-nowrap max-w-xs">
      {text}
      <div class="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
        <div class="border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  {/if}
</div>

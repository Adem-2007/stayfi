<script>
  import { createEventDispatcher } from 'svelte';
  // 1. Import the direction store
  import { direction } from '../../../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  export let platform;
  export let isSelected = false;

  function getColorClasses(color, selected) {
    const colors = {
      blue: { border: selected ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300', bg: selected ? 'bg-blue-50' : 'bg-white hover:bg-blue-50', icon: selected ? 'bg-blue-600' : 'bg-blue-100', iconText: selected ? 'text-white' : 'text-blue-600', check: 'bg-blue-600' },
      purple: { border: selected ? 'border-purple-600' : 'border-gray-200 hover:border-purple-300', bg: selected ? 'bg-purple-50' : 'bg-white hover:bg-purple-50', icon: selected ? 'bg-purple-600' : 'bg-purple-100', iconText: selected ? 'text-white' : 'text-purple-600', check: 'bg-purple-600' },
      green: { border: selected ? 'border-green-600' : 'border-gray-200 hover:border-green-300', bg: selected ? 'bg-green-50' : 'bg-white hover:bg-green-50', icon: selected ? 'bg-green-600' : 'bg-green-100', iconText: selected ? 'text-white' : 'text-green-600', check: 'bg-green-600' },
      yellow: { border: selected ? 'border-yellow-500' : 'border-gray-200 hover:border-yellow-300', bg: selected ? 'bg-yellow-50' : 'bg-white hover:bg-yellow-50', icon: selected ? 'bg-yellow-500' : 'bg-yellow-100', iconText: selected ? 'text-white' : 'text-yellow-600', check: 'bg-yellow-500' }
    };
    return colors[color];
  }

  $: colors = getColorClasses(platform.color, isSelected);
</script>

<!-- 2. Add dir={$direction} and remove text-left -->
<button
  type="button"
  on:click={() => dispatch('toggle')}
  dir={$direction}
  class="relative p-4 sm:p-6 border-2 rounded-2xl transition-all duration-300 w-full {colors.border} {colors.bg} {isSelected ? 'shadow-lg scale-105' : 'shadow hover:shadow-md'}"
>
  <!-- 3. Conditionally position the checkmark based on text direction -->
  <div class="absolute top-3 right-3 sm:top-4 sm:right-4 rtl:right-auto rtl:left-3 sm:rtl:left-4">
    <div class="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 transition-all {isSelected ? colors.check + ' border-transparent' : 'border-gray-300'}">
      {#if isSelected}
        <svg class="w-full h-full text-white p-0.5 sm:p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
      {/if}
    </div>
  </div>

  <div class="w-12 h-12 sm:w-16 sm:h-16 p-2 sm:p-4 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all {colors.icon}">
    <div class="{colors.iconText}">
      {@html platform.icon}
    </div>
  </div>

  <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{platform.name}</h3>
  <p class="text-sm sm:text-base text-gray-600">{platform.description}</p>
</button>
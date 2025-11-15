<script>
  import { createEventDispatcher } from 'svelte';
  import { translations } from '../../../../../stores/language.js';

  // FIXED: Added event dispatcher
  const dispatch = createEventDispatcher();
  
  export let securityLevel = '';
  export let error = '';

  $: t = $translations.securityPayment?.securityLevels || {};
  $: securityLevels = t.levels || [];

  const levelIcons = { easy: '🔒', medium: '🛡️', hard: '🔐' };
  const levelColors = {
      green: { border: 'border-green-500', bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:border-green-300' },
      blue: { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:border-blue-300' },
      purple: { border: 'border-purple-500', bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:border-purple-300' }
  };
  const colorMap = { easy: 'green', medium: 'blue', hard: 'purple' };

  // FIXED: Created a function to handle selection and dispatch the event
  function selectLevel(id) {
    securityLevel = id; // Update local state for immediate UI feedback
    dispatch('select', id); // Inform the parent of the change
  }
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></div>
    <div>
      <h3 class="text-lg sm:text-xl font-bold text-gray-900">{t.title || 'Security Level'} <span class="text-red-500">*</span></h3>
      <p class="text-sm text-gray-600">{t.subtitle || 'Choose the level of security'}</p>
    </div>
  </div>

  <div class="grid md:grid-cols-3 gap-4">
    {#each securityLevels as level}
      {@const isSelected = securityLevel === level.id}
      {@const color = colorMap[level.id]}
      {@const colors = levelColors[color]}
      <button 
        type="button" 
        on:click={() => selectLevel(level.id)} 
        class="relative p-6 border-2 rounded-2xl transition-all text-left rtl:text-right { isSelected ? `${colors.border} ${colors.bg} shadow-lg scale-105` : `border-gray-200 ${colors.hover} hover:shadow-md`}"
      >
        <div class="text-4xl mb-3">{levelIcons[level.id]}</div>
        <h4 class="text-lg font-bold text-gray-900 mb-1">{level.name}</h4>
        <p class="text-sm text-gray-600 mb-4 h-10">{level.description}</p>
        <ul class="space-y-2">
          {#each level.features as feature}
            <li class="flex items-start gap-2 text-sm text-gray-700">
              <svg class="w-4 h-4 {colors.text} flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
      </button>
    {/each}
  </div>
  {#if error}<p class="mt-4 text-sm text-red-500 flex items-center gap-1"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>{error}</p>{/if}
</div>
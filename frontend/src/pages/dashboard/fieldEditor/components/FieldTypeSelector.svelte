<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let selectedType;
  
  const fieldTypes = [
    { type: 'input', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'blue', bgClass: 'bg-blue-50', borderClass: 'border-blue-600', iconBgClass: 'bg-blue-100', iconColorClass: 'text-blue-600' },
    { type: 'textarea', icon: 'M4 6h16M4 12h16M4 18h7', color: 'purple', bgClass: 'bg-purple-50', borderClass: 'border-purple-600', iconBgClass: 'bg-purple-100', iconColorClass: 'text-purple-600' },
    { type: 'dropdown', icon: 'M19 9l-7 7-7-7', color: 'green', bgClass: 'bg-green-50', borderClass: 'border-green-600', iconBgClass: 'bg-green-100', iconColorClass: 'text-green-600' },
    { type: 'multiselect', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', color: 'orange', bgClass: 'bg-orange-50', borderClass: 'border-orange-600', iconBgClass: 'bg-orange-100', iconColorClass: 'text-orange-600' }
  ];
</script>

<div>
  <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
    {$dashboardTranslations.fieldEditor?.fieldType || 'Field Type'} <span class="text-red-500">*</span>
  </label>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
    {#each fieldTypes as { type, icon, bgClass, borderClass, iconBgClass, iconColorClass }}
      <button
        on:click={() => selectedType = type}
        class="p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all {selectedType === type ? `${borderClass} ${bgClass}` : 'border-gray-200 hover:border-gray-300'}"
      >
        <div class="flex items-center gap-2 sm:gap-3">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg {iconBgClass} flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 {iconColorClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icon} />
            </svg>
          </div>
          <div class="text-left flex-1 min-w-0">
            <p class="text-sm sm:text-base font-semibold text-gray-900">{$dashboardTranslations.fieldTypes?.[type] || type}</p>
            <p class="text-xs text-gray-500 hidden sm:block">{$dashboardTranslations.fieldTypes?.[`${type}Desc`] || ''}</p>
          </div>
        </div>
      </button>
    {/each}
  </div>
</div>

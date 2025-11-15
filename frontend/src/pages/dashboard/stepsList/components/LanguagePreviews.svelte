<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let step;
  
  const languages = [
    { code: 'en', flag: '🇬🇧' },
    { code: 'fr', flag: '🇫🇷' },
    { code: 'ar', flag: '🇸🇦' }
  ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mt-3 sm:mt-4">
  {#each languages as lang}
    <div class="p-2 sm:p-3 bg-white rounded-lg border border-gray-200">
      <p class="text-xs font-semibold text-gray-500 mb-1">
        {lang.flag} {$dashboardTranslations.languages?.[lang.code] || lang.code.toUpperCase()}
      </p>
      <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">{step.title[lang.code]}</p>
    </div>
  {/each}
</div>

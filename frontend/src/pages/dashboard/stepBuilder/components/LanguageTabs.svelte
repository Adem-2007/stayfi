<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let currentLang = 'en';
  
  const languages = [
    { code: 'en', flag: '🇬🇧', key: 'en' },
    { code: 'fr', flag: '🇫🇷', key: 'fr' },
    { code: 'ar', flag: '🇸🇦', key: 'ar' }
  ];
</script>

<div class="flex gap-1 sm:gap-2 mb-4 sm:mb-6 border-b border-gray-200 overflow-x-auto">
  {#each languages as lang}
    <button
      on:click={() => currentLang = lang.code}
      class="flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-sm sm:text-base font-medium transition-all whitespace-nowrap {currentLang === lang.code ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}"
    >
      <span class="inline sm:hidden">{lang.flag}</span>
      <span class="hidden sm:inline">{lang.flag} {$dashboardTranslations.languages?.[lang.key] || lang.code.toUpperCase()}</span>
    </button>
  {/each}
</div>

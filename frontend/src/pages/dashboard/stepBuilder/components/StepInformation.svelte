<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let stepData;
  export let currentLang;
</script>

<div class="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.stepBuilder?.stepTitle || 'Title'} ({currentLang.toUpperCase()}) <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      bind:value={stepData.title[currentLang]}
      placeholder="{$dashboardTranslations.stepBuilder?.enterStepTitle || 'Enter step title'}"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
  </div>

  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.stepBuilder?.stepSubtitle || 'Subtitle'} ({currentLang.toUpperCase()})
    </label>
    <input
      type="text"
      bind:value={stepData.subtitle[currentLang]}
      placeholder="{$dashboardTranslations.stepBuilder?.enterStepSubtitle || 'Enter step subtitle (optional)'}"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
  </div>

  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.stepBuilder?.stepOrder || 'Step Order'}
    </label>
    <input
      type="number"
      bind:value={stepData.order}
      min="0"
      placeholder="0"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
    <p class="mt-1 text-xs text-gray-500">{$dashboardTranslations.stepBuilder?.stepOrderHelp || 'Lower numbers appear first (0 = after default steps)'}</p>
  </div>
</div>

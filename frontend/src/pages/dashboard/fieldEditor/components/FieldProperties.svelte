<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let fieldData;
  export let currentLang;
</script>

<div class="space-y-4 sm:space-y-6">
  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.fieldEditor?.label || 'Label'} ({currentLang.toUpperCase()}) <span class="text-red-500">*</span>
    </label>
    <input
      type="text"
      bind:value={fieldData.label[currentLang]}
      placeholder="{$dashboardTranslations.fieldEditor?.enterLabel || 'Enter field label'}"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
  </div>

  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.fieldEditor?.placeholder || 'Placeholder'} ({currentLang.toUpperCase()})
    </label>
    <input
      type="text"
      bind:value={fieldData.placeholder[currentLang]}
      placeholder="{$dashboardTranslations.fieldEditor?.enterPlaceholder || 'Enter placeholder text (optional)'}"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
  </div>

  <div>
    <label class="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
      {$dashboardTranslations.fieldEditor?.helpText || 'Help Text'} ({currentLang.toUpperCase()})
    </label>
    <input
      type="text"
      bind:value={fieldData.helpText[currentLang]}
      placeholder="{$dashboardTranslations.fieldEditor?.enterHelpText || 'Enter help text (optional)'}"
      class="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
    />
  </div>

  <div>
    <label class="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        bind:checked={fieldData.required}
        class="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 flex-shrink-0"
      />
      <div class="flex-1">
        <span class="text-xs sm:text-sm font-semibold text-gray-700 block">{$dashboardTranslations.fieldEditor?.requiredField || 'Required Field'}</span>
        <p class="text-xs text-gray-500 mt-0.5">{$dashboardTranslations.fieldEditor?.requiredFieldDesc || 'User must fill this field to continue'}</p>
      </div>
    </label>
  </div>
</div>

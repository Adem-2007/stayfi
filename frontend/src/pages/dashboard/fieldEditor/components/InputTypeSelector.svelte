<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let inputType;
</script>

<div>
  <label class="block text-sm font-semibold text-gray-700 mb-2">
    {$dashboardTranslations.fieldEditor?.inputType || 'Input Type'}
  </label>
  <select
    bind:value={inputType}
    class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
  >
    <option value="text">{$dashboardTranslations.inputTypes?.text || 'Text'}</option>
    <option value="email">{$dashboardTranslations.inputTypes?.email || 'Email'}</option>
    <option value="tel">{$dashboardTranslations.inputTypes?.tel || 'Phone'}</option>
    <option value="url">{$dashboardTranslations.inputTypes?.url || 'URL'}</option>
    <option value="number">{$dashboardTranslations.inputTypes?.number || 'Number'}</option>
    <option value="date">{$dashboardTranslations.inputTypes?.date || 'Date'}</option>
  </select>
</div>

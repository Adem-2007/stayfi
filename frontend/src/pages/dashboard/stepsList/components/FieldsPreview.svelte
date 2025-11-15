<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let fields;
  
  function getFieldColor(type) {
    const colors = {
      input: 'bg-blue-100 text-blue-700',
      textarea: 'bg-purple-100 text-purple-700',
      dropdown: 'bg-green-100 text-green-700',
      multiselect: 'bg-orange-100 text-orange-700',
      select: 'bg-green-100 text-green-700',
      'file-upload': 'bg-yellow-100 text-yellow-700',
      'multi-input': 'bg-pink-100 text-pink-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  }
</script>

<div class="mt-4 pt-4 border-t border-gray-200">
  <p class="text-xs font-semibold text-gray-500 mb-2">{$dashboardTranslations.stepsList?.fieldsPreview || 'FIELDS:'}</p>
  <div class="flex flex-wrap gap-2">
    {#each fields as field}
      <span class="px-2 py-1 text-xs font-medium rounded-md capitalize {getFieldColor(field.type)}">
        {field.label.en}
        {#if field.required}
          <span class="text-red-500">*</span>
        {/if}
      </span>
    {/each}
  </div>
</div>

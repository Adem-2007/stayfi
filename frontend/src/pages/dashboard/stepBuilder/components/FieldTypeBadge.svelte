<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
  
  export let type;
  
  const typeConfig = {
    input: { bg: 'bg-blue-100', text: 'text-blue-700' },
    textarea: { bg: 'bg-purple-100', text: 'text-purple-700' },
    dropdown: { bg: 'bg-green-100', text: 'text-green-700' },
    multiselect: { bg: 'bg-orange-100', text: 'text-orange-700' },
    default: { bg: 'bg-gray-100', text: 'text-gray-700' }
  };
  
  $: config = typeConfig[type] || typeConfig.default;
  $: label = $dashboardTranslations.fieldTypes?.[type] || type;
</script>

<span class="px-2 py-1 text-xs font-semibold rounded-md capitalize {config.bg} {config.text}">
  {label}
</span>

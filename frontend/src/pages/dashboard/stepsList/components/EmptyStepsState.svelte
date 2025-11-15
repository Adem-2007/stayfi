<script>
  import { dashboardTranslations } from '../../../../stores/dashboardLanguage.js';
</script>

<div class="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
  <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
  <h3 class="text-lg font-semibold text-gray-900 mb-2">{$dashboardTranslations.stepsList?.noSteps || 'No custom steps yet'}</h3>
  <p class="text-gray-600 mb-6">{$dashboardTranslations.stepsList?.noStepsDesc || 'Create your first custom step to get started'}</p>
</div>

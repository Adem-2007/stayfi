<script>
  import { createEventDispatcher } from 'svelte';
  import { dashboardTranslations, dashboardDirection } from '../../../stores/dashboardLanguage.js';
  
  export let show = false;
  export let project = null;
  
  const dispatch = createEventDispatcher();
  
  function close() {
    dispatch('close');
  }
  
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      close();
    }
  }
</script>

{#if show && project}
  <div 
    class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    on:click={handleBackdropClick}
    dir={$dashboardDirection}
  >
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold">{$dashboardTranslations.projectDetails?.title || 'Project Details'}</h2>
              <p class="text-sm opacity-90 mt-1">ID: {project.submissionId || project.id}</p>
            </div>
          </div>
          <button 
            on:click={close}
            class="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <!-- Basic Info -->
        <section class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.basicInfo || 'Basic Information'}</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.name || 'Name'}</div>
              <div class="font-semibold text-gray-900">{project.formData?.name || project.formData?.companyName || 'N/A'}</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.email || 'Email'}</div>
              <div class="font-semibold text-gray-900 break-all">{project.formData?.email || 'N/A'}</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.phone || 'Phone'}</div>
              <div class="font-semibold text-gray-900">{project.formData?.phone || 'N/A'}</div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.status || 'Status'}</div>
              <div class="font-semibold text-gray-900 capitalize">{project.status}</div>
            </div>
            {#if project.formData?.industry}
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.industry || 'Industry'}</div>
                <div class="font-semibold text-gray-900">{project.formData.industry}</div>
              </div>
            {/if}
            {#if project.formData?.companySize}
              <div class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.companySize || 'Company Size'}</div>
                <div class="font-semibold text-gray-900">{project.formData.companySize}</div>
              </div>
            {/if}
          </div>
        </section>
        
        <!-- Project Goal -->
        {#if project.formData?.principalGoal}
          <section class="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.projectGoal || 'Project Goal'}</h3>
            </div>
            <p class="text-gray-700 bg-white p-4 rounded-lg whitespace-pre-wrap border border-blue-100">{project.formData.principalGoal}</p>
          </section>
        {/if}
        
        <!-- Platforms -->
        {#if project.formData?.platforms && project.formData.platforms.length > 0}
          <section class="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.platforms || 'Platforms'}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each project.formData.platforms as platform}
                <span class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg text-sm font-semibold shadow-sm">{platform}</span>
              {/each}
            </div>
          </section>
        {/if}
        
        <!-- Pages & Features -->
        {#if (project.formData?.pages && project.formData.pages.length > 0) || (project.formData?.additionalFeatures && project.formData.additionalFeatures.length > 0)}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Pages -->
            {#if project.formData?.pages && project.formData.pages.length > 0}
              <section class="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.pages || 'Pages'}</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  {#each project.formData.pages as page}
                    <span class="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">{page}</span>
                  {/each}
                  {#if project.formData.otherPages && project.formData.otherPages.length > 0}
                    {#each project.formData.otherPages as page}
                      <span class="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">{page}</span>
                    {/each}
                  {/if}
                </div>
              </section>
            {/if}
            
            <!-- Features -->
            {#if project.formData?.additionalFeatures && project.formData.additionalFeatures.length > 0}
              <section class="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-200">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-green-500 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.features || 'Features'}</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                  {#each project.formData.additionalFeatures as feature}
                    <span class="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">{feature}</span>
                  {/each}
                  {#if project.formData.otherFeatures && project.formData.otherFeatures.length > 0}
                    {#each project.formData.otherFeatures as feature}
                      <span class="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">{feature}</span>
                    {/each}
                  {/if}
                </div>
              </section>
            {/if}
          </div>
        {/if}
        
        <!-- Design -->
        {#if project.formData?.designOption}
          <section class="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl border border-pink-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.design || 'Design'}</h3>
            </div>
            <div class="bg-white p-4 rounded-lg space-y-3 border border-pink-100">
              <div class="flex items-start gap-2">
                <span class="text-sm font-semibold text-gray-500 min-w-[100px]">{$dashboardTranslations.projectDetails?.designOption || 'Option'}:</span>
                <span class="text-gray-900 font-medium">{project.formData.designOption}</span>
              </div>
              {#if project.formData.designDescription}
                <div class="flex items-start gap-2">
                  <span class="text-sm font-semibold text-gray-500 min-w-[100px]">{$dashboardTranslations.projectDetails?.designDescription || 'Description'}:</span>
                  <span class="text-gray-900">{project.formData.designDescription}</span>
                </div>
              {/if}
              {#if project.formData.designUrl}
                <div class="flex items-start gap-2">
                  <span class="text-sm font-semibold text-gray-500 min-w-[100px]">{$dashboardTranslations.projectDetails?.designUrl || 'URL'}:</span>
                  <a href={project.formData.designUrl} target="_blank" class="text-blue-600 hover:underline break-all">{project.formData.designUrl}</a>
                </div>
              {/if}
            </div>
          </section>
        {/if}
        
        <!-- Technology Stack -->
        {#if (project.formData?.frontendTech && project.formData.frontendTech.length > 0) || (project.formData?.backendTech && project.formData.backendTech.length > 0)}
          <section class="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-xl border border-yellow-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-yellow-600 to-yellow-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.techStack || 'Technology Stack'}</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#if project.formData.frontendTech && project.formData.frontendTech.length > 0}
                <div class="bg-white p-4 rounded-lg border border-yellow-100">
                  <div class="font-semibold text-gray-700 mb-3">{$dashboardTranslations.projectDetails?.frontend || 'Frontend'}</div>
                  <div class="flex flex-wrap gap-2">
                    {#each project.formData.frontendTech as tech}
                      <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">{tech}</span>
                    {/each}
                  </div>
                </div>
              {/if}
              {#if project.formData.backendTech && project.formData.backendTech.length > 0}
                <div class="bg-white p-4 rounded-lg border border-yellow-100">
                  <div class="font-semibold text-gray-700 mb-3">{$dashboardTranslations.projectDetails?.backend || 'Backend'}</div>
                  <div class="flex flex-wrap gap-2">
                    {#each project.formData.backendTech as tech}
                      <span class="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">{tech}</span>
                    {/each}
                  </div>
                </div>
              {/if}
            </div>
          </section>
        {/if}
        
        <!-- Database -->
        {#if project.formData?.database && project.formData.database.length > 0}
          <section class="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.database || 'Database'}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              {#each project.formData.database as db}
                <span class="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold border border-orange-200">{db}</span>
              {/each}
            </div>
          </section>
        {/if}
        
        <!-- Hosting & AI -->
        {#if project.formData?.hosting || project.formData?.implementAI !== undefined}
          <section class="bg-gradient-to-br from-cyan-50 to-white p-6 rounded-xl border border-cyan-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.hostingAi || 'Hosting & AI'}</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#if project.formData?.hosting}
                <div class="bg-white p-4 rounded-lg border border-cyan-100">
                  <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.hosting || 'Hosting'}</div>
                  <div class="font-semibold text-gray-900">{project.formData.hosting}</div>
                </div>
              {/if}
              {#if project.formData?.implementAI !== undefined}
                <div class="bg-white p-4 rounded-lg border border-cyan-100">
                  <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.aiImplementation || 'AI Implementation'}</div>
                  <div class="font-semibold text-gray-900">{project.formData.implementAI ? ($dashboardTranslations.projectDetails?.yes || 'Yes') : ($dashboardTranslations.projectDetails?.no || 'No')}</div>
                </div>
              {/if}
            </div>
          </section>
        {/if}
        
        <!-- Security & Payment -->
        {#if project.formData?.securityLevel || project.formData?.paymentMethod}
          <section class="bg-gradient-to-br from-red-50 to-white p-6 rounded-xl border border-red-200">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900">{$dashboardTranslations.projectDetails?.securityPayment || 'Security & Payment'}</h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {#if project.formData.securityLevel}
                <div class="bg-white p-4 rounded-lg border border-red-100">
                  <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.securityLevel || 'Security Level'}</div>
                  <div class="font-semibold text-gray-900">{project.formData.securityLevel}</div>
                </div>
              {/if}
              {#if project.formData.paymentMethod}
                <div class="bg-white p-4 rounded-lg border border-red-100">
                  <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{$dashboardTranslations.projectDetails?.paymentMethod || 'Payment Method'}</div>
                  <div class="font-semibold text-gray-900">{project.formData.paymentMethod}</div>
                </div>
              {/if}
            </div>
          </section>
        {/if}
      </div>
      
      <!-- Footer -->
      <div class="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
        <button 
          on:click={close}
          class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          {$dashboardTranslations.projectDetails?.close || 'Close'}
        </button>
      </div>
    </div>
  </div>
{/if}

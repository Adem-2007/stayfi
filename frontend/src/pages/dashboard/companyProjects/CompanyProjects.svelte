<script>
  import { onMount } from 'svelte';
  import { getSubmissions } from '../../../stores/submit.js';
  import { dashboardTranslations, dashboardDirection } from '../../../stores/dashboardLanguage.js';
  import ProjectDetailsModal from '../components/ProjectDetailsModal.svelte';
  
  let projects = [];
  let loading = true;
  let selectedProject = null;
  let showModal = false;
  
  onMount(async () => {
    try {
      const data = await getSubmissions('company');
      
      if (data.success) {
        projects = data.submissions.map(sub => ({
          ...sub,
          companyName: sub.formData?.companyName || 'N/A',
          projectType: sub.formData?.platforms?.join(', ') || 'N/A',
          createdAt: new Date(sub.submittedAt).toLocaleDateString()
        }));
      }
    } catch (error) {
      console.error('Error fetching company projects:', error);
    } finally {
      loading = false;
    }
  });
  
  function getStatusColor(status) {
    switch(status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
  
  function viewDetails(project) {
    selectedProject = project;
    showModal = true;
  }
</script>

<div class="space-y-6" dir={$dashboardDirection}>
  <!-- Header -->
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center gap-3 mb-2">
      <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{$dashboardTranslations.companyProjects?.title || 'Company Projects'}</h1>
        <p class="text-sm text-gray-600">{$dashboardTranslations.companyProjects?.subtitle || 'View and manage company project submissions'}</p>
      </div>
    </div>
  </div>
  
  <!-- Projects List -->
  {#if loading}
    <div class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>
  {:else if projects.length === 0}
    <div class="bg-white rounded-xl shadow-sm p-12 text-center">
      <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{$dashboardTranslations.companyProjects?.noProjects || 'No Company Projects'}</h3>
      <p class="text-gray-600">{$dashboardTranslations.companyProjects?.noProjectsDesc || 'Company project submissions will appear here'}</p>
    </div>
  {:else}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as project}
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{project.companyName}</h3>
              <p class="text-sm text-gray-600">{project.projectType}</p>
            </div>
            <span class="px-3 py-1 text-xs font-semibold rounded-full {getStatusColor(project.status)}">
              {project.status}
            </span>
          </div>
          
          <div class="space-y-2 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{project.createdAt}</span>
            </div>
          </div>
          
          <button 
            on:click={() => viewDetails(project)}
            class="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            {$dashboardTranslations.companyProjects?.viewDetails || 'View Details'}
          </button>
        </div>
      {/each}
    </div>
  {/if}
</div>

<ProjectDetailsModal 
  bind:show={showModal} 
  project={selectedProject}
  on:close={() => showModal = false}
/>

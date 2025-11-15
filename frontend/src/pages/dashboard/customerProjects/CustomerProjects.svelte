<script>
  import { onMount } from 'svelte';
  import { auth } from '../../../stores/auth.js';
  import { dashboardTranslations, dashboardDirection } from '../../../stores/dashboardLanguage.js';
  import ProjectDetailsModal from '../components/ProjectDetailsModal.svelte';
  
  let projects = [];
  let loading = true;
  let selectedProject = null;
  let showModal = false;
  
  onMount(async () => {
    try {
      const token = auth.getToken();
      const API_URL = 'http://localhost:3001/api/submissions?userType=customer';
      
      const response = await fetch(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        
        if (data.success) {
          projects = data.submissions.map(sub => ({
            ...sub,
            customerName: sub.formData?.name || 'N/A',
            projectType: sub.formData?.platforms?.join(', ') || 'N/A',
            createdAt: new Date(sub.submittedAt).toLocaleDateString()
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching customer projects:', error);
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
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{$dashboardTranslations.customerProjects?.title || 'Customer Projects'}</h1>
        <p class="text-sm text-gray-600">{$dashboardTranslations.customerProjects?.subtitle || 'View and manage customer project submissions'}</p>
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
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">{$dashboardTranslations.customerProjects?.noProjects || 'No Customer Projects'}</h3>
      <p class="text-gray-600">{$dashboardTranslations.customerProjects?.noProjectsDesc || 'Customer project submissions will appear here'}</p>
    </div>
  {:else}
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {#each projects as project}
        <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{project.customerName}</h3>
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
            {$dashboardTranslations.customerProjects?.viewDetails || 'View Details'}
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

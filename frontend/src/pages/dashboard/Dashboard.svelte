<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import Sidebar from './components/Sidebar.svelte';
  import StepBuilder from './stepBuilder/StepBuilder.svelte';
  import StepsList from './stepsList/StepsList.svelte';
  import CompanyProjects from './companyProjects/CompanyProjects.svelte';
  import CustomerProjects from './customerProjects/CustomerProjects.svelte';
  import { customSteps, loadCustomSteps, saveCustomSteps } from '../../stores/customSteps.js';
  import { currentDashboardLanguage, dashboardTranslations, dashboardDirection, loadDashboardTranslations } from '../../stores/dashboardLanguage.js';

  let showBuilder = false;
  let editingStep = null;
  let showLangDropdown = false;
  let sidebarOpen = false;
  let currentView = 'steps';

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  $: currentLangData = languages.find(l => l.code === $currentDashboardLanguage) || languages[0];

  function changeLanguage(langCode, event) {
    if (event) {
      event.stopPropagation();
    }
    loadDashboardTranslations(langCode);
    showLangDropdown = false;
  }
  
  function toggleLanguageDropdown(event) {
    event.stopPropagation();
    showLangDropdown = !showLangDropdown;
  }

  onMount(() => {
    loadCustomSteps();
  });

  function handleCreateNew() {
    editingStep = null;
    showBuilder = true;
  }

  function handleEdit(event) {
    editingStep = event.detail;
    showBuilder = true;
  }

  function handleSave(event) {
    const step = event.detail;
    
    if (editingStep) {
      // Update existing step
      customSteps.update(steps => {
        const index = steps.findIndex(s => s.id === editingStep.id);
        if (index !== -1) {
          steps[index] = step;
        }
        return steps;
      });
    } else {
      // Add new step
      customSteps.update(steps => [...steps, step]);
    }
    
    saveCustomSteps();
    showBuilder = false;
    editingStep = null;
  }

  function handleCancel() {
    showBuilder = false;
    editingStep = null;
  }

  function handleDelete(event) {
    if (confirm($dashboardTranslations.confirm?.deleteStep || 'Are you sure you want to delete this step?')) {
      customSteps.update(steps => steps.filter(s => s.id !== event.detail));
      saveCustomSteps();
    }
  }
  
  function handleNavigation(event) {
    currentView = event.detail;
    showBuilder = false;
    editingStep = null;
    sidebarOpen = false;
  }
  
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
</script>

<div dir={$dashboardDirection} class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
  <!-- Sidebar -->
  <Sidebar 
    bind:isOpen={sidebarOpen} 
    {currentView}
    on:navigate={handleNavigation}
    on:toggle={toggleSidebar}
  />
  
  <!-- Main Content -->
  <div class="transition-all duration-300 {$dashboardDirection === 'rtl' ? 'lg:pr-64' : 'lg:pl-64'}">
    <div class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div class="px-3 sm:px-6 lg:px-8 py-3 sm:py-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <!-- Mobile Menu Button & Logo -->
          <div class="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button 
              on:click={toggleSidebar}
              class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div class="min-w-0">
              <h1 class="text-lg sm:text-2xl font-bold text-gray-900 truncate">{$dashboardTranslations.header?.title || 'Dashboard'}</h1>
              <p class="text-xs sm:text-sm text-gray-500 hidden sm:block">{$dashboardTranslations.header?.subtitle || 'Manage your projects and steps'}</p>
            </div>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <!-- Language Selector -->
            <div class="relative flex-1 sm:flex-initial">
              <button
                type="button"
                on:click={toggleLanguageDropdown}
                class="w-full sm:w-auto flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <span class="text-lg sm:text-xl">{currentLangData.flag}</span>
                <span class="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">{currentLangData.name}</span>
                <svg class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {#if showLangDropdown}
                <div class="absolute {$dashboardDirection === 'rtl' ? 'left-0' : 'right-0'} mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" on:click|stopPropagation>
                  {#each languages as lang}
                    <button
                      type="button"
                      on:click={(e) => changeLanguage(lang.code, e)}
                      class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left {$currentDashboardLanguage === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}"
                    >
                      <span class="text-xl">{lang.flag}</span>
                      <span class="font-medium">{lang.name}</span>
                      {#if $currentDashboardLanguage === lang.code}
                        <svg class="w-5 h-5 {$dashboardDirection === 'rtl' ? 'mr-auto' : 'ml-auto'} text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      {/if}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="px-3 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-12">
      {#if currentView === 'steps'}
        {#if showBuilder}
          <StepBuilder 
            step={editingStep}
            on:save={handleSave}
            on:cancel={handleCancel}
          />
        {:else}
          <div class="mb-4 sm:mb-8">
            <button
              on:click={handleCreateNew}
              class="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {$dashboardTranslations.buttons?.createNew || 'Create New Step'}
            </button>
          </div>

          <StepsList 
            steps={$customSteps}
            on:edit={handleEdit}
            on:delete={handleDelete}
          />
        {/if}
      {:else if currentView === 'companyProjects'}
        <CompanyProjects />
      {:else if currentView === 'customerProjects'}
        <CustomerProjects />
      {/if}
    </div>
  </div>
</div>

<svelte:window on:click={() => showLangDropdown = false} />

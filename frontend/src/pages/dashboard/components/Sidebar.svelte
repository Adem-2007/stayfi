<script>
  import { createEventDispatcher } from 'svelte';
  import { push } from 'svelte-spa-router';
  import { auth } from '../../../stores/auth.js';
  import { dashboardTranslations, dashboardDirection } from '../../../stores/dashboardLanguage.js';
  
  export let isOpen = true;
  export let currentView = 'steps';
  
  const dispatch = createEventDispatcher();
  
  function handleLogout() {
    auth.logout();
    push('/login');
  }
  
  const menuItems = [
    {
      id: 'steps',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />`,
      labelKey: 'steps'
    },
    {
      id: 'companyProjects',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />`,
      labelKey: 'companyProjects'
    },
    {
      id: 'customerProjects',
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />`,
      labelKey: 'customerProjects'
    }
  ];
  
  function handleNavigation(itemId) {
    dispatch('navigate', itemId);
  }
  
  function toggleSidebar() {
    dispatch('toggle');
  }
</script>

<!-- Mobile Overlay -->
{#if isOpen}
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    on:click={toggleSidebar}
  ></div>
{/if}

<!-- Sidebar -->
<aside 
  class="fixed top-0 {$dashboardDirection === 'rtl' ? 'right-0' : 'left-0'} h-full bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out {isOpen ? 'translate-x-0' : ($dashboardDirection === 'rtl' ? 'translate-x-full' : '-translate-x-full')} w-64 lg:translate-x-0"
  dir={$dashboardDirection}
>
  <!-- Sidebar Header -->
  <div class="flex items-center justify-between p-4 border-b border-gray-200">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-gray-900">{$dashboardTranslations.sidebar?.title || 'Dashboard'}</h2>
    </div>
    
    <!-- Close button for mobile -->
    <button 
      on:click={toggleSidebar}
      class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  
  <!-- Navigation Menu -->
  <nav class="p-4 space-y-2">
    {#each menuItems as item}
      <button
        on:click={() => handleNavigation(item.id)}
        class="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all {currentView === item.id ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}"
      >
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {@html item.icon}
        </svg>
        <span class="font-medium">{$dashboardTranslations.sidebar?.[item.labelKey] || item.labelKey}</span>
      </button>
    {/each}
  </nav>
  
  <!-- Bottom Actions -->
  <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 space-y-2">
    <button
      on:click={handleLogout}
      class="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span class="font-medium">{$dashboardTranslations.sidebar?.logout || 'Logout'}</span>
    </button>
    
    <a 
      href="#/" 
      class="w-full flex items-center justify-center gap-2 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      <span class="font-medium">{$dashboardTranslations.sidebar?.backToApp || 'Back to App'}</span>
    </a>
  </div>
</aside>

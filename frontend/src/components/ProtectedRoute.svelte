<script>
  import { onMount, onDestroy } from 'svelte';
  import { push, location } from 'svelte-spa-router';
  import { auth } from '../stores/auth.js';

  let checking = true;
  let isAuthenticated = false;
  let unsubscribe;

  onMount(async () => {
    // Check authentication status
    isAuthenticated = await auth.checkAuth();
    
    if (!isAuthenticated) {
      console.log('Not authenticated - redirecting to login');
      push('/login');
      return;
    }
    
    checking = false;

    // Subscribe to auth changes
    unsubscribe = auth.subscribe(state => {
      if (!state.isAuthenticated && !state.loading) {
        console.log('Auth state changed - redirecting to login');
        push('/login');
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

{#if checking}
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
      <p class="text-gray-600">Verifying authentication...</p>
    </div>
  </div>
{:else if isAuthenticated}
  <slot />
{:else}
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
      <p class="text-gray-600">Redirecting to login...</p>
    </div>
  </div>
{/if}

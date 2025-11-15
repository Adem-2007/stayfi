<script>
  import { onMount } from 'svelte';
  import Router from 'svelte-spa-router';
  import { wrap } from 'svelte-spa-router/wrap';
  import { push, location } from 'svelte-spa-router';

  import Home from './pages/home/Home.svelte';
  import Application from './pages/application/Application.svelte';
  import Login from './pages/auth/Login.svelte';
  import Dashboard from './pages/dashboard/Dashboard.svelte';
  import { auth } from './stores/auth.js';

  // 1. Define Routes
  const routes = {
    '/': Home,
    '/application': Application,
    '/login': Login,
    '/dashboard': wrap({
      component: Dashboard,
      // This condition checks if the user is authenticated
      conditions: [() => $auth.isAuthenticated]
    }),
  };

  // 2. Handle what happens when someone tries to go to Dashboard without permission
  function conditionsFailed(event) {
    console.log('Access denied:', event.detail.location);
    
    // If they tried to go to dashboard, send them to Login page
    if (event.detail.location === '/dashboard') {
      push('/login');
    }
  }

  // 3. checkAuth on page load (Address bar navigation)
  onMount(async () => {
    // Check if there is a valid token in session storage
    await auth.checkAuth();
  });

</script>

<!-- 
  4. Loading Guard 
  We do not render the Router until we have finished checking the auth.
  This prevents the page from flashing "Login" if the user is actually logged in.
-->
{#if $auth.loading}
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
    <p>Loading session...</p>
  </div>
{:else}
  <Router {routes} on:conditionsFailed={conditionsFailed} />
{/if}
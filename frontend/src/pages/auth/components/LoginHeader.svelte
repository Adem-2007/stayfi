<script>
  export let step;
</script>

<div class="text-center mb-8">
  <div class="inline-flex w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl items-center justify-center mb-4">
    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 A4 0 00-8 0v4h8z" />
    </svg>
  </div>
  <h1 class="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
  <p class="text-gray-600">
    {#if step === 'email'}
      Enter your email to receive a verification code
    {:else}
      Enter the 6-digit code sent to your email
    {/if}
  </p>
</div>

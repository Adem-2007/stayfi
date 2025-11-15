<script>
  export let email;
  export let error;
  export let loading;
  export let onSubmit;
</script>

<form on:submit|preventDefault={onSubmit} class="space-y-6">
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
      Email Address
    </label>
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      class="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-400 transition-all"
      placeholder="admin@example.com"
    />
  </div>

  {#if error}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
      <svg class="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>
      <span class="text-sm">{error}</span>
    </div>
  {/if}

  <button
    type="submit"
    disabled={loading}
    class="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
  >
    {#if loading}
      <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending code...
    {:else}
      Send Verification Code
    {/if}
  </button>
</form>

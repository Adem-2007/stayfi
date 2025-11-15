<script>
  import { auth } from '../../stores/auth.js';
  import { push } from 'svelte-spa-router';
  import LoginHeader from './components/LoginHeader.svelte';
  import EmailStep from './components/EmailStep.svelte';
  import CodeStep from './components/CodeStep.svelte';

  let email = '';
  let code = '';
  let error = '';
  let loading = false;
  let step = 'email';
  let successMessage = '';

  // This reactive statement automatically cleans the input,
  // preventing any non-numeric characters from being stored.
  $: if (code) {
    code = code.replace(/[^0-9]/g, '');
  }

  async function handleRequestCode() {
    error = '';
    successMessage = '';
    loading = true;

    const result = await auth.requestLogin(email);

    if (result.success) {
      step = 'code';
      successMessage = 'Verification code sent to your email!';
    } else {
      error = result.error || 'Failed to send verification code';
    }
    loading = false;
  }

  async function handleVerifyCode() {
    error = '';
    loading = true;

    // The 'code' variable is already clean because of the reactive statement.
    const result = await auth.verifyLogin(email, code.trim());

    if (result.success) {
      push('/dashboard');
    } else {
      error = result.error || 'Invalid verification code';
      loading = false;
    }
  }

  function handleBack() {
    step = 'email';
    code = '';
    error = '';
    successMessage = '';
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
  <div class="max-w-md w-full">
    <LoginHeader {step} />

    <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      {#if step === 'email'}
        <EmailStep 
          bind:email 
          {error} 
          {loading} 
          onSubmit={handleRequestCode} 
        />
      {:else}
        <CodeStep 
          {email}
          bind:code
          {error}
          {loading}
          {successMessage}
          onSubmit={handleVerifyCode}
          onBack={handleBack}
        />
      {/if}

      <div class="mt-6 text-center">
        <a href="#/" class="text-sm text-gray-600 hover:text-purple-600 transition-colors">
          ← Back to Home
        </a>
      </div>
    </div>

    <div class="mt-8 text-center text-sm text-gray-500">
      <p>© 2024 StayFi. All rights reserved.</p>
    </div>
  </div>
</div>
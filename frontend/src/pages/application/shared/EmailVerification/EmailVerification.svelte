<script>
  import { createEventDispatcher, onMount } from 'svelte';
  // Import the translations store
  import { translations } from '../../../../stores/language.js';
  import CodeInput from './components/CodeInput.svelte';
  import ResendButton from './components/ResendButton.svelte';
  
  const dispatch = createEventDispatcher();
  export let email = '';
  export let name = '';
  
  let verificationCode = ['', '', '', '', '', ''];
  let error = '';
  let success = false;
  let loading = false;
  let countdown = 60;
  let canResend = false;

  onMount(() => {
    sendVerificationEmail();
    startCountdown();
  });

  function startCountdown() {
    canResend = false;
    countdown = 60;
    const timer = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(timer);
        canResend = true;
      }
    }, 1000);
  }

  async function sendVerificationEmail() {
    try {
      const response = await fetch('http://localhost:3001/api/send-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send verification email');
      }
    } catch (err) {
      error = err.message;
    }
  }

  async function resendCode() {
    error = '';
    verificationCode = ['', '', '', '', '', ''];
    await sendVerificationEmail();
    startCountdown();
  }

  async function verifyCode() {
    loading = true;
    error = '';
    
    try {
      const code = verificationCode.join('');
      const response = await fetch('http://localhost:3001/api/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Invalid verification code');
      }
      
      success = true;
      setTimeout(() => {
        dispatch('verified');
      }, 1000);
      
    } catch (err) {
      error = err.message;
      verificationCode = ['', '', '', '', '', ''];
    } finally {
      loading = false;
    }
  }
</script>

<div class="max-w-2xl mx-auto">
  <div class="text-center mb-8">
    <div class="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
      <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      {$translations.emailVerification?.title || 'Verify Your Email'}
    </h2>
    <p class="text-lg text-gray-600">
      {$translations.emailVerification?.subtitle || 'We\'ve sent a 6-digit verification code to'}
    </p>
    <p class="text-lg font-semibold text-gray-900 mt-1">{email}</p>
  </div>

  <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
    <CodeInput 
      bind:verificationCode 
      {loading} 
      {success} 
      {error}
      on:verify={verifyCode}
      labelText={$translations.emailVerification?.description || 'Enter the 6-digit code'}
    />

    {#if error}
      <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
        <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
        <p class="text-sm text-red-700">{error}</p>
      </div>
    {/if}

    {#if success}
      <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
        <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <p class="text-sm text-green-700 font-medium">{$translations.emailVerification?.successMessage || 'Email verified successfully!'}</p>
      </div>
    {/if}

    {#if loading}
      <div class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
        <p class="text-sm text-gray-600 mt-2">{$translations.emailVerification?.verifying || 'Verifying...'}</p>
      </div>
    {/if}

    <ResendButton 
      {canResend} 
      {countdown}
      on:resend={resendCode}
    />
  </div>

  <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
    <div class="flex gap-4">
      <div class="flex-shrink-0">
        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <h4 class="font-semibold text-blue-900 mb-1">{$translations.emailVerification?.spamTitle || 'Check your spam folder'}</h4>
        <p class="text-sm text-blue-700">
          {$translations.emailVerification?.spamDescription || 'If you don\'t see the email in your inbox, please check your spam or junk folder. The code expires in 10 minutes.'}
        </p>
      </div>
    </div>
  </div>
</div>
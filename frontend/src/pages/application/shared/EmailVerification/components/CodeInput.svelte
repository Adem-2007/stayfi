<script>
  import { createEventDispatcher } from 'svelte';
  // Import the translations store
  import { translations } from '../../../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  export let verificationCode = ['', '', '', '', '', ''];
  export let loading = false;
  export let success = false;
  export let error = '';
  
  let inputs = [];

  function handleInput(index, event) {
    const value = event.target.value;
    
    if (value.length > 1) {
      event.target.value = value[0];
      verificationCode[index] = value[0];
    } else {
      verificationCode[index] = value;
    }
    
    if (value && index < 5) {
      inputs[index + 1]?.focus();
    }
    
    if (verificationCode.every(digit => digit !== '')) {
      dispatch('verify');
    }
  }

  function handleKeyDown(index, event) {
    if (event.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputs[index - 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('text').slice(0, 6);
    
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        verificationCode[i] = pastedData[i];
      }
    }
    
    verificationCode = [...verificationCode];
    
    if (verificationCode.every(digit => digit !== '')) {
      dispatch('verify');
    }
  }
</script>

<div class="mb-6">
  <label class="block text-sm font-semibold text-gray-700 mb-4 text-center">
    {$translations.emailVerification?.description || 'Enter Verification Code'}
  </label>
  <div class="flex gap-3 justify-center">
    {#each verificationCode as digit, index}
      <input
        bind:this={inputs[index]}
        type="text"
        inputmode="numeric"
        maxlength="1"
        value={digit}
        on:input={(e) => handleInput(index, e)}
        on:keydown={(e) => handleKeyDown(index, e)}
        on:paste={handlePaste}
        disabled={loading || success}
        class="w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all {
          success ? 'border-green-500 bg-green-50' : 
          error ? 'border-red-500 bg-red-50' : 
          'border-gray-300 hover:border-gray-400'
        }"
      />
    {/each}
  </div>
</div>
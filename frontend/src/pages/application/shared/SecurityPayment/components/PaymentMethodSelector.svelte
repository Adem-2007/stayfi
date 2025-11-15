<script>
  import { translations } from '../../../../../stores/language.js';
  import Input from '../../../components/Input.svelte';
  
  export let paymentMethods = [];
  export let otherPayment = '';
  export let showOtherPayment = false;
  export let error = '';

  $: t = $translations.securityPayment?.paymentMethods || {};
  $: methods = t.methods || [];
  
  const methodIcons = { 'stripe': '💳', 'paypal': '🅿️', 'crypto': '₿', 'algeria-post': '📮', 'other-payment': '➕' };

  function togglePayment(methodId) {
    const index = paymentMethods.indexOf(methodId);
    if (index > -1) {
      paymentMethods = paymentMethods.filter(id => id !== methodId);
    } else {
      paymentMethods = [...paymentMethods, methodId];
    }
  }
</script>

<div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
  <div class="flex items-center gap-3 mb-6">
    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg></div>
    <div>
      <h3 class="text-lg sm:text-xl font-bold text-gray-900">{t.title || 'Payment Methods'}</h3>
      <p class="text-sm text-gray-600">{t.subtitle || 'Select payment options'}</p>
    </div>
  </div>

  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
    {#each methods as method}
      {@const isSelected = paymentMethods.includes(method.id)}
      <button type="button" on:click={() => togglePayment(method.id)} class="p-4 sm:p-6 border-2 rounded-xl transition-all { isSelected ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-300 hover:bg-green-50'}">
        <div class="flex items-start gap-3">
          <div class="text-3xl">{methodIcons[method.id]}</div>
          <div class="flex-1 min-w-0 text-left rtl:text-right">
            <div class="flex items-center gap-2 mb-1">
              <h4 class="font-bold text-gray-900">{method.name}</h4>
              {#if isSelected}<svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>{/if}
            </div>
            <p class="text-sm text-gray-600">{method.description}</p>
          </div>
        </div>
      </button>
    {/each}
  </div>

  {#if showOtherPayment}
    <div class="mt-6 border-t pt-6">
      <Input label={t.otherLabel || 'Specify'} bind:value={otherPayment} placeholder={t.otherPlaceholder || 'e.g., Bank transfer...'} error={error} required={true} />
    </div>
  {/if}
</div>
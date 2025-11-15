<script>
  import { createEventDispatcher } from 'svelte';
  import { translations, direction } from '../../../stores/language.js';
  
  const dispatch = createEventDispatcher();
  let selectedType = null;

  function selectType(type) {
    selectedType = type;
    setTimeout(() => {
      dispatch('select', type);
    }, 300);
  }
</script>

<div class="max-w-3xl mx-auto">
  <!-- Header -->
  <div class="text-center mb-12">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {$translations.userType?.title || "Welcome"}
    </h1>
    <p class="text-lg sm:text-xl text-gray-600">
      {$translations.userType?.subtitle || 'Let\'s get started'}
    </p>
  </div>

  <!-- Selection Cards -->
  <div class="grid md:grid-cols-2 gap-6" dir={$direction}>
    <!-- Company Card -->
    <button on:click={() => selectType('company')} class="group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl {selectedType === 'company' ? 'border-blue-600 shadow-xl scale-105' : 'border-gray-200 hover:border-blue-300'}">
      <div class="absolute top-4 right-4 rtl:right-auto rtl:left-4">
        <div class="w-6 h-6 rounded-full border-2 transition-all {selectedType === 'company' ? 'border-blue-600 bg-blue-600' : 'border-gray-300 group-hover:border-blue-400'}">
          {#if selectedType === 'company'}
            <svg class="w-full h-full text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          {/if}
        </div>
      </div>
      <div class="flex flex-col items-center text-center">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.userType?.company?.title || "I'm a Company"}</h3>
        <p class="text-gray-600">{$translations.userType?.company?.description || 'Looking for software solutions'}</p>
      </div>
    </button>

    <!-- Customer Card -->
    <button on:click={() => selectType('customer')} class="group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl {selectedType === 'customer' ? 'border-yellow-500 shadow-xl scale-105' : 'border-gray-200 hover:border-yellow-300'}">
      <div class="absolute top-4 right-4 rtl:right-auto rtl:left-4">
        <div class="w-6 h-6 rounded-full border-2 transition-all {selectedType === 'customer' ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300 group-hover:border-yellow-400'}">
          {#if selectedType === 'customer'}
            <svg class="w-full h-full text-white p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
          {/if}
        </div>
      </div>
      <div class="flex flex-col items-center text-center">
        <div class="w-20 h-20 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.userType?.individual?.title || "I'm an Individual"}</h3>
        <p class="text-gray-600">{$translations.userType?.individual?.description || 'Need custom software'}</p>
      </div>
    </button>
  </div>

  <!-- Help Text -->
  <div class="mt-8 text-center">
    <p class="text-sm text-gray-500">
      <!-- FIXED: Use the translation key -->
      {$translations.userType?.helpText || "Don't worry, you can always change this later"}
    </p>
  </div>
</div>
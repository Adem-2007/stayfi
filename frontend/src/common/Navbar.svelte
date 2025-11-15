<script>
  import { onMount } from 'svelte';
  // Import the reactive stores and the setLanguage function
  import { currentLanguage, translations, direction, setLanguage } from '../stores/HomeLanguage.js';

  // Import the desired icons from svelte-remixicon
  import { RiTranslate2, RiArrowDownSLine, RiMenuLine, RiCloseLine } from 'svelte-remixicon';

  let isMenuOpen = false;
  let isScrolled = false;
  let isLangOpen = false;

  const languages = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية'
  };

  function handleScroll() {
    isScrolled = window.scrollY > 20;
  }

  function selectLanguage(lang) {
    setLanguage(lang);
    isLangOpen = false; // Close desktop dropdown
  }
  
  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<nav 
  dir={$direction} 
  class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}"
>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-3">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
          <span class="text-yellow-400 font-bold text-xl">S</span>
        </div>
        <span class="text-2xl font-bold {isScrolled ? 'text-gray-900' : 'text-white'}">StayFi</span>
      </a>

      <!-- Desktop Menu -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#services" class="font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">{$translations.home?.navbar?.services}</a>
        <a href="#features" class="font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">{$translations.home?.navbar?.features}</a>
        <a href="#integrations" class="font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">{$translations.home?.navbar?.integrations}</a>
        <a href="#stats" class="font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">{$translations.home?.navbar?.stats}</a>
        <a href="#contact" class="font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">{$translations.home?.navbar?.contact || 'Contact'}</a>
        
        <!-- Desktop Language Switcher -->
        <div class="relative">
          <button on:click={() => isLangOpen = !isLangOpen} class="flex items-center gap-2 font-medium {isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-yellow-400'}">
            <RiTranslate2 class="w-5 h-5" />
            <span>{languages[$currentLanguage]}</span>
            <RiArrowDownSLine class="w-4 h-4 transition-transform {isLangOpen ? 'rotate-180' : ''}" />
          </button>
          {#if isLangOpen}
            <div class="absolute top-full end-0 mt-2 w-36 bg-white rounded-lg shadow-xl py-1">
              {#each Object.entries(languages) as [code, name]}
                <button on:click={() => selectLanguage(code)} class="w-full text-start px-4 py-2 text-gray-800 hover:bg-gray-100">{name}</button>
              {/each}
            </div>
          {/if}
        </div>

        <a href="#/application" class="px-6 py-2.5 bg-yellow-400 text-blue-900 rounded-lg font-semibold hover:bg-yellow-300 shadow-md">
          {$translations.home?.navbar?.getQuote}
        </a>
      </div>

      <!-- Mobile Menu Controls -->
      <div class="md:hidden flex items-center gap-2">
         <!-- Mobile Custom Language Dropdown (re-using desktop logic) -->
         <div class="relative">
            <button on:click={() => isLangOpen = !isLangOpen} class="flex items-center gap-1 text-sm p-2 rounded-lg {isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/20 text-white'}">
                <RiTranslate2 class="w-5 h-5" />
                <span class="font-semibold">{$currentLanguage.toUpperCase()}</span>
            </button>
            {#if isLangOpen}
                <div class="absolute top-full end-0 mt-2 w-36 bg-white rounded-lg shadow-xl py-1">
                    {#each Object.entries(languages) as [code, name]}
                        <button on:click={() => selectLanguage(code)} class="w-full text-start px-4 py-2 text-sm text-gray-800 hover:bg-gray-100">{name}</button>
                    {/each}
                </div>
            {/if}
        </div>
        <!-- Mobile Menu Toggle Button -->
        <button on:click={() => isMenuOpen = !isMenuOpen} class="p-2 rounded-lg {isScrolled ? 'text-gray-900' : 'text-white'}">
          {#if isMenuOpen}
            <RiCloseLine class="w-6 h-6" />
          {:else}
            <RiMenuLine class="w-6 h-6" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Collapsible Menu -->
    {#if isMenuOpen}
      <div class="md:hidden pb-4 px-2">
        <div class="flex flex-col gap-2 px-2 py-2 bg-white rounded-lg shadow-lg">
          <a href="#services" on:click={()=>isMenuOpen=false} class="py-2 px-2 text-gray-700 hover:text-blue-600 font-medium rounded-md hover:bg-gray-50">{$translations.home?.navbar?.services}</a>
          <a href="#features" on:click={()=>isMenuOpen=false} class="py-2 px-2 text-gray-700 hover:text-blue-600 font-medium rounded-md hover:bg-gray-50">{$translations.home?.navbar?.features}</a>
          <a href="#integrations" on:click={()=>isMenuOpen=false} class="py-2 px-2 text-gray-700 hover:text-blue-600 font-medium rounded-md hover:bg-gray-50">{$translations.home?.navbar?.integrations}</a>
          <a href="#stats" on:click={()=>isMenuOpen=false} class="py-2 px-2 text-gray-700 hover:text-blue-600 font-medium rounded-md hover:bg-gray-50">{$translations.home?.navbar?.stats}</a>
          <a href="#contact" on:click={()=>isMenuOpen=false} class="py-2 px-2 text-gray-700 hover:text-blue-600 font-medium rounded-md hover:bg-gray-50">{$translations.home?.navbar?.contact || 'Contact'}</a>
          <a href="#/application" class="mt-2 px-6 py-2.5 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-center">{$translations.home?.navbar?.getQuote}</a>
        </div>
      </div>
    {/if}
  </div>
</nav>
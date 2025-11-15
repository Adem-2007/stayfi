<script>
  // Import both 'translations' for content and 'direction' for layout adaptation
  import { translations, direction } from '../../../stores/HomeLanguage.js';
</script>

<section class="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
  <!-- Decorative background elements -->
  <div class="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
  <div class="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
  
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16 items-center">
      <!-- Left Side - Features List -->
      <div class="space-y-8">
        <div>
          <span class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-semibold mb-4 shadow-lg">
            <!-- Using margin-end (me-2) for RTL support -->
            <svg class="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {$translations.home?.features?.badge}
          </span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {$translations.home?.features?.title}
            <span class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">{$translations.home?.features?.highlightedTitle}</span>
          </h2>
          <p class="text-xl text-gray-600 leading-relaxed">
            {$translations.home?.features?.subtitle}
          </p>
        </div>

        <div class="space-y-6">
          <!-- Features are looped dynamically -->
          {#each $translations.home?.features?.featureList || [] as feature, index}
            <div class="group flex gap-5 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 {index % 2 === 0 ? 'hover:border-blue-200' : 'hover:border-yellow-200'}">
              <div class="flex-shrink-0">
                <div class="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg {index % 2 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-700' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'}">
                  <!-- Icons can be customized or looped if provided in JSON -->
                  {#if index === 0}
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {:else if index === 1}
                    <svg class="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {:else if index === 2}
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                  {:else}
                    <svg class="w-7 h-7 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {/if}
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 mb-2 transition-colors {index % 2 === 0 ? 'group-hover:text-blue-600' : 'group-hover:text-yellow-600'}">{feature.title}</h3>
                <p class="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Right Side - Enhanced Visual Element -->
      <div class="relative lg:block hidden">
        <div class="relative">
          <!-- Main card -->
          <div class="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 transform hover:scale-105 transition-transform duration-500">
            <!-- This is a static visual mockup, so no text needs translation -->
            <div class="space-y-6">
              <div class="flex items-center justify-between pb-6 border-b border-gray-200"><div class="flex items-center gap-4"><div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-lg"></div><div><div class="h-4 w-28 bg-gray-300 rounded-full mb-2"></div><div class="h-3 w-20 bg-gray-200 rounded-full"></div></div></div><div class="flex gap-2"><div class="w-10 h-10 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"></div><div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-md"></div></div></div>
              <div class="grid grid-cols-3 gap-4"><div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200"><div class="h-2 w-14 bg-blue-300 rounded-full mb-3"></div><div class="h-7 w-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm"></div></div><div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-5 rounded-xl border border-yellow-200"><div class="h-2 w-14 bg-yellow-300 rounded-full mb-3"></div><div class="h-7 w-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg shadow-sm"></div></div><div class="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border border-blue-200"><div class="h-2 w-14 bg-blue-300 rounded-full mb-3"></div><div class="h-7 w-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-sm"></div></div></div>
              <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200"><div class="flex items-end justify-between h-40 gap-3"><div class="w-full bg-gradient-to-t from-blue-300 to-blue-200 rounded-t-lg shadow-sm" style="height: 45%"></div><div class="w-full bg-gradient-to-t from-blue-400 to-blue-300 rounded-t-lg shadow-sm" style="height: 65%"></div><div class="w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg shadow-md" style="height: 90%"></div><div class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg shadow-sm" style="height: 75%"></div><div class="w-full bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg shadow-md" style="height: 100%"></div></div></div>
              <div class="space-y-3"><div class="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-white rounded-xl border border-green-200 hover:shadow-md transition-shadow"><div class="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-md"><svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg></div><div class="flex-1"><div class="h-3 w-36 bg-gray-300 rounded-full"></div></div></div><div class="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200 hover:shadow-md transition-shadow"><div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-md"></div><div class="flex-1"><div class="h-3 w-44 bg-gray-300 rounded-full"></div></div></div></div>
            </div>
          </div>

          <!-- Floating badges with positioning that adapts to LTR/RTL direction -->
          <div 
            class="absolute -top-8 bg-gradient-to-br from-yellow-400 to-yellow-500 text-blue-900 px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg animate-float border-4 border-white"
            class:-left-8={$direction === 'ltr'}
            class:-right-8={$direction === 'rtl'}
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {$translations.home?.features?.floaters?.uptime}
            </div>
          </div>
          <div 
            class="absolute -bottom-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 py-4 rounded-2xl shadow-2xl font-bold text-lg animate-float animation-delay-2000 border-4 border-white"
            class:-right-8={$direction === 'ltr'}
            class:-left-8={$direction === 'rtl'}
          >
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {$translations.home?.features?.floaters?.delivery}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- These styles are part of the original component design -->
<style>
  @keyframes blob { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
  .animate-blob { animation: blob 7s infinite; }
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animation-delay-2000 { animation-delay: 1.5s; }
</style>
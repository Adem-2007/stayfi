<script>
  // Import both 'translations' for content and 'direction' for layout
  import { translations, direction } from '../../../stores/HomeLanguage.js';
</script>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- The text-center class works for both LTR and RTL, so no change is needed here -->
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
        {$translations.home?.services?.badge}
      </span>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {$translations.home?.services?.title} <span class="text-blue-600">{$translations.home?.services?.highlightedTitle}</span>
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {$translations.home?.services?.subtitle}
      </p>
    </div>

    <!-- The text alignment inside the cards will be handled automatically by the `dir` attribute on the <html> tag -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      <!-- Service 1: Web Applications -->
      <div class="group relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
        <!-- This decorative shape will now flip sides based on language direction -->
        <div
          class="absolute top-0 w-32 h-32 bg-yellow-400 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[0]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[0]?.description}</p>
        </div>
      </div>

      <!-- Service 2: Mobile Solutions -->
      <div class="group relative bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300">
        <div
          class="absolute top-0 w-32 h-32 bg-blue-600 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[1]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[1]?.description}</p>
        </div>
      </div>

      <!-- Service 3: Cloud Services -->
      <div class="group relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
        <div
          class="absolute top-0 w-32 h-32 bg-yellow-400 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[2]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[2]?.description}</p>
        </div>
      </div>

      <!-- Service 4: API Development -->
      <div class="group relative bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300">
        <div
          class="absolute top-0 w-32 h-32 bg-blue-600 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[3]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[3]?.description}</p>
        </div>
      </div>

      <!-- Service 5: Security Solutions -->
      <div class="group relative bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300">
        <div
          class="absolute top-0 w-32 h-32 bg-yellow-400 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[4]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[4]?.description}</p>
        </div>
      </div>

      <!-- Service 6: Performance Optimization -->
      <div class="group relative bg-gradient-to-br from-yellow-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-100 hover:border-yellow-300">
        <div
          class="absolute top-0 w-32 h-32 bg-blue-600 opacity-10 group-hover:opacity-20 transition-opacity end-0"
          class:rounded-bl-full={$direction === 'ltr'}
          class:rounded-br-full={$direction === 'rtl'}
        ></div>
        <div class="relative">
          <div class="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <svg class="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-3">{$translations.home?.services?.serviceList[5]?.title}</h3>
          <p class="text-gray-600">{$translations.home?.services?.serviceList[5]?.description}</p>
        </div>
      </div>

    </div>
  </div>
</section>
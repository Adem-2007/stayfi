<script>
  // Import the necessary reactive stores for language and direction
  import { translations, direction } from '../../../stores/HomeLanguage.js';
</script>

<!-- The dir attribute is essential for Tailwind's RTL variants to work -->
<section 
  dir={$direction}
  class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white"
>
  <!-- Animated background elements -->
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <!-- Content -->
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
    <div class="lg:flex lg:gap-12 lg:items-center">
      
      <!-- Text Content Column -->
      <!-- In RTL, this column naturally appears on the right due to RTL flex direction -->
      <div 
        class="text-center lg:text-start space-y-8 lg:w-1/2"
      >
        
        <!-- Badge -->
        <div class="inline-flex items-center px-4 py-2 bg-yellow-400 text-blue-900 rounded-full text-sm font-semibold shadow-lg">
          <svg class="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          {$translations.home?.hero?.badge}
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          {$translations.home?.hero?.title}
          <span class="text-yellow-400 block mt-2">{$translations.home?.hero?.highlightedTitle}</span>
        </h1>

        <!-- Description -->
        <p class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0">
          {$translations.home?.hero?.subtitle}
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <a 
            href="#/application"
            class="group relative px-8 py-4 bg-yellow-400 text-blue-900 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              <span>{$translations.home?.hero?.ctaButton}</span>
              <svg class="w-5 h-5 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </span>
            <div class="absolute inset-0 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rtl:origin-right"></div>
          </a>

          <a href="#services" class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg text-center">
            {$translations.home?.hero?.secondaryButton}
          </a>
        </div>

        <!-- Trust Indicators -->
        <div class="flex flex-wrap items-center gap-8 justify-center lg:justify-start pt-8">
          {#each $translations.home?.hero?.stats || [] as stat}
            <div class="text-center">
              <div class="text-3xl font-bold text-yellow-400">{stat.value}</div>
              <div class="text-sm text-blue-200">{stat.label}</div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Visual Element Column -->
      <!-- In RTL, this column naturally appears on the left due to RTL flex direction -->
      <div 
        class="relative lg:w-1/2 mt-12 lg:mt-0"
      >
        <div class="relative">
          <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
            <div class="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              <div class="flex items-center gap-2 px-4 py-3 bg-gray-800">
                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="p-6 font-mono text-sm" dir="ltr">
                <div class="text-blue-400">const <span class="text-yellow-300">stayfi</span> = {`{`}</div>
                <div class="text-gray-400 ml-4">mission: <span class="text-green-400">'Innovation'</span>,</div>
                <div class="text-gray-400 ml-4">quality: <span class="text-green-400">'Excellence'</span>,</div>
                <div class="text-gray-400 ml-4">delivery: <span class="text-green-400">'On Time'</span></div>
                <div class="text-blue-400">{`}`};</div>
              </div>
            </div>
          </div>
          <!-- Logical properties 'start' and 'end' correctly position these elements -->
          <div class="absolute -top-6 -end-6 w-24 h-24 bg-yellow-400 rounded-lg shadow-xl transform rotate-12 animate-float"></div>
          <div class="absolute -bottom-6 -start-6 w-20 h-20 bg-blue-400 rounded-full shadow-xl animate-float animation-delay-2000"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom wave -->
  <div class="absolute bottom-0 left-0 right-0">
    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
      <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
    </svg>
  </div>
</section>
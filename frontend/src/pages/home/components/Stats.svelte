<script>
    import { translations } from '../../../stores/HomeLanguage.js';
</script>

<section class="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white relative overflow-hidden">
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">
        {$translations.home?.stats?.title} <span class="text-yellow-400">{$translations.home?.stats?.highlightedTitle}</span>
      </h2>
      <p class="text-xl text-blue-100">
        {$translations.home?.stats?.subtitle}
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each $translations.home?.stats?.statList || [] as stat}
      <div class="text-center group">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
          <div class="text-5xl font-bold text-yellow-400 mb-2">{stat.value}</div>
          <div class="text-blue-100 font-medium">{stat.label}</div>
        </div>
      </div>
      {/each}
    </div>

    <!-- Additional Info -->
    <div class="mt-16 text-center">
      <div class="inline-flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold">
        {$translations.home?.stats?.badge}
      </div>
    </div>
  </div>
</section>
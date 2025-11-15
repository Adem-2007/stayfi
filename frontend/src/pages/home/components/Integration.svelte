<script>
    import { translations } from '../../../stores/HomeLanguage.js';
</script>

<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <span class="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
        {$translations.home?.integrations?.badge}
      </span>
      <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {$translations.home?.integrations?.title} <span class="text-blue-600">{$translations.home?.integrations?.highlightedTitle}</span>
      </h2>
      <p class="text-xl text-gray-600 max-w-3xl mx-auto">
        {$translations.home?.integrations?.subtitle}
      </p>
    </div>

    <!-- Integration Cards -->
    <div class="grid md:grid-cols-2 gap-8 mb-16">
      <!-- Card 1 -->
      <div class="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white overflow-hidden">
        <div class="relative">
          <h3 class="text-2xl font-bold">{$translations.home?.integrations?.card1?.title}</h3>
          <p class="text-blue-100 my-6">{$translations.home?.integrations?.card1?.description}</p>
          <div class="flex flex-wrap gap-2">
            {#each $translations.home?.integrations?.card1?.tags || [] as tag}
              <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">{tag}</span>
            {/each}
          </div>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="relative bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-8 text-blue-900 overflow-hidden">
        <div class="relative">
          <h3 class="text-2xl font-bold">{$translations.home?.integrations?.card2?.title}</h3>
          <p class="text-blue-800 my-6">{$translations.home?.integrations?.card2?.description}</p>
          <div class="flex flex-wrap gap-2">
            {#each $translations.home?.integrations?.card2?.tags || [] as tag}
              <span class="px-3 py-1 bg-blue-900/20 backdrop-blur-sm rounded-full text-sm">{tag}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
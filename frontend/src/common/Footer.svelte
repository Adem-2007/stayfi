<script>
  import { translations } from '../stores/HomeLanguage.js';
  const currentYear = new Date().getFullYear();
</script>

<footer class="bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Main Footer Content -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 text-start">
      <!-- Company Info -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span class="text-yellow-400 font-bold text-xl">S</span>
          </div>
          <span class="text-2xl font-bold">StayFi</span>
        </div>
        <p class="text-gray-400 mb-4">
          {$translations.home?.footer?.description}
        </p>
        <!-- Social media icons are visual and don't need translation -->
        <div class="flex gap-3">
          <a href="#" aria-label="Twitter" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
          <a href="#" aria-label="GitHub" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
          <a href="#" aria-label="LinkedIn" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
        </div>
      </div>

      <!-- Services Links -->
      <div>
        <h3 class="text-lg font-bold mb-4">{$translations.home?.footer?.sections?.services?.title}</h3>
        <ul class="space-y-2">
          {#each $translations.home?.footer?.sections?.services?.links || [] as link}
            <li><a href={link.url} class="text-gray-400 hover:text-yellow-400 transition-colors">{link.text}</a></li>
          {/each}
        </ul>
      </div>

      <!-- Company Links -->
      <div>
        <h3 class="text-lg font-bold mb-4">{$translations.home?.footer?.sections?.company?.title}</h3>
        <ul class="space-y-2">
          {#each $translations.home?.footer?.sections?.company?.links || [] as link}
            <li><a href={link.url} class="text-gray-400 hover:text-yellow-400 transition-colors">{link.text}</a></li>
          {/each}
        </ul>
      </div>

      <!-- Contact Info -->
      <div>
        <h3 class="text-lg font-bold mb-4">{$translations.home?.footer?.sections?.contact?.title}</h3>
        <ul class="space-y-3 text-gray-400">
          <li class="flex items-start gap-3"><svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg><span>hello@stayfi.com</span></li>
          <li class="flex items-start gap-3"><svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg><span>+1 (555) 123-4567</span></li>
          <li class="flex items-start gap-3"><svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg><span>123 Tech Street, Silicon Valley, CA 94025</span></li>
        </ul>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-gray-800 pt-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-gray-400 text-sm text-center md:text-start">
          &copy; {currentYear} StayFi. {$translations.home?.footer?.rights}
        </p>
        <div class="flex gap-6 text-sm">
          <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors">{$translations.home?.footer?.bottomBar?.privacy}</a>
          <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors">{$translations.home?.footer?.bottomBar?.terms}</a>
          <a href="#" class="text-gray-400 hover:text-yellow-400 transition-colors">{$translations.home?.footer?.bottomBar?.cookies}</a>
        </div>
      </div>
    </div>
  </div>
</footer>
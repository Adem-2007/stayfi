<script>
  import { onMount } from 'svelte';
  import { initializeHomeLanguage } from '../../stores/HomeLanguage.js';
  import Navbar from '../../common/Navbar.svelte';
  import Hero from './components/Hero.svelte';
  import Services from './components/Services.svelte';
  import Features from './components/Features.svelte';
  import Integration from './components/Integration.svelte';
  import Stats from './components/Stats.svelte';
  import ContactUs from './components/ContactUs.svelte';
  import Footer from '../../common/Footer.svelte';

  // Import all translation files
  import en from '../../../public/Home/en.json';
  import fr from '../../../public/Home/fr.json';
  import ar from '../../../public/Home/ar.json';

  // Create the object holding all translations
  const allTranslations = { en, fr, ar };

  // Initialize the language system on component mount
  onMount(() => {
    initializeHomeLanguage(allTranslations);
  });
</script>

<div class="min-h-screen bg-white">
  <!-- The Navbar no longer needs the allTranslations prop -->
  <Navbar />
  <Hero />
  <div id="services">
    <Services />
  </div>
  <div id="features">
    <Features />
  </div>
  <div id="integrations">
    <Integration />
  </div>
  <div id="stats">
    <Stats />
  </div>
  <div id="contact">
    <ContactUs />
  </div>
  <Footer />
</div>
<script>
  import { translations, direction } from '../../../stores/HomeLanguage.js';
  
  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  let errors = {};
  let submitting = false;
  let submitSuccess = false;
  let submitError = '';
  
  // Reactive variable for translations with safe access
  $: t = $translations?.home?.contact || {};
  
  function validateForm() {
    errors = {};
    
    if (!formData.name.trim()) {
      errors.name = t.errors?.nameRequired || 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = t.errors?.emailRequired || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.errors?.emailInvalid || 'Please enter a valid email';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = t.errors?.subjectRequired || 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = t.errors?.messageRequired || 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = t.errors?.messageTooShort || 'Message must be at least 10 characters';
    }
    
    return Object.keys(errors).length === 0;
  }
  
  async function handleSubmit() {
    if (!validateForm()) return;
    
    submitting = true;
    submitError = '';
    submitSuccess = false;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      submitSuccess = true;
      formData = { name: '', email: '', subject: '', message: '' };
      
      setTimeout(() => {
        submitSuccess = false;
      }, 5000);
      
    } catch (error) {
      console.error('Contact form error:', error);
      submitError = error.message || t.errors?.submitFailed || 'Failed to send message. Please try again.';
    } finally {
      submitting = false;
    }
  }
</script>

<section id="contact" class="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50" dir={$direction}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-12 sm:mb-16">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {t.title || 'Get in Touch'}
      </h2>
      <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        {t.subtitle || 'Have a question or want to work together? We\'d love to hear from you.'}
      </p>
    </div>

    <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Contact Information -->
      <div class="space-y-8">
        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">
            {t.infoTitle || 'Contact Information'}
          </h3>
          
          <div class="space-y-6">
            <!-- Email -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  {t.email || 'Email'}
                </h4>
                <a href="mailto:contact@stayfi.com" class="text-blue-600 hover:text-blue-700 transition-colors">
                  contact@stayfi.com
                </a>
              </div>
            </div>

            <!-- Phone -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  {t.phone || 'Phone'}
                </h4>
                <a href="tel:+1234567890" class="text-blue-600 hover:text-blue-700 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <!-- Location -->
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-1">
                  {t.location || 'Location'}
                </h4>
                <p class="text-gray-600">
                  {t.address || '123 Business St, Tech City, TC 12345'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Links -->
        <div class="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-xl p-8 text-white">
          <h3 class="text-2xl font-bold mb-4">
            {t.followUs || 'Follow Us'}
          </h3>
          <p class="text-blue-100 mb-6">
            {t.socialText || 'Stay connected with us on social media'}
          </p>
          <div class="flex gap-4">
            <a href="#" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" class="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-110">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">
          {t.formTitle || 'Send us a Message'}
        </h3>

        {#if submitSuccess}
          <div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <svg class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <p class="text-green-700 font-medium">
              {t.successMessage || 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.'}
            </p>
          </div>
        {/if}

        {#if submitError}
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <p class="text-red-700">{submitError}</p>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-semibold text-gray-700 mb-2">
              {t.nameLabel || 'Your Name'} <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              bind:value={formData.name}
              placeholder={t.namePlaceholder || 'John Doe'}
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all {errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
            />
            {#if errors.name}
              <p class="mt-2 text-sm text-red-500">{errors.name}</p>
            {/if}
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              {t.emailLabel || 'Your Email'} <span class="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              bind:value={formData.email}
              placeholder={t.emailPlaceholder || 'john@example.com'}
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all {errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
            />
            {#if errors.email}
              <p class="mt-2 text-sm text-red-500">{errors.email}</p>
            {/if}
          </div>

          <!-- Subject -->
          <div>
            <label for="subject" class="block text-sm font-semibold text-gray-700 mb-2">
              {t.subjectLabel || 'Subject'} <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              bind:value={formData.subject}
              placeholder={t.subjectPlaceholder || 'How can we help you?'}
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all {errors.subject ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
            />
            {#if errors.subject}
              <p class="mt-2 text-sm text-red-500">{errors.subject}</p>
            {/if}
          </div>

          <!-- Message -->
          <div>
            <label for="message" class="block text-sm font-semibold text-gray-700 mb-2">
              {t.messageLabel || 'Message'} <span class="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              bind:value={formData.message}
              rows="5"
              placeholder={t.messagePlaceholder || 'Tell us more about your project...'}
              class="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none {errors.message ? 'border-red-500 bg-red-50' : 'border-gray-300'}"
            ></textarea>
            {#if errors.message}
              <p class="mt-2 text-sm text-red-500">{errors.message}</p>
            {/if}
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            disabled={submitting}
            class="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {#if submitting}
              <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.sending || 'Sending...'}
            {:else}
              {t.sendButton || 'Send Message'}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>




<script>
  import { translations } from '../../../stores/language.js'; // Adjust the path as needed

  export let label = '';
  export let files = [];
  export let accept = 'image/*';
  export let multiple = true;
  export let error = '';
  
  let dragOver = false;
  
  function handleFiles(fileList) {
    const newFiles = Array.from(fileList).map(file => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file)
    }));
    files = [...files, ...newFiles];
  }
  
  function handleDrop(e) {
    dragOver = false;
    handleFiles(e.dataTransfer.files);
  }
  
  function handleFileInput(e) {
    handleFiles(e.target.files);
  }
  
  function removeFile(index) {
    URL.revokeObjectURL(files[index].preview);
    files = files.filter((_, i) => i !== index);
  }
  
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }
</script>

<div class="w-full">
  {#if label}
    <label class="block text-sm font-semibold text-gray-700 mb-3">{label}</label>
  {/if}
  
  <div
    class="border-2 border-dashed rounded-xl p-8 transition-all {
      dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
    } {error ? 'border-red-500 bg-red-50' : ''}"
    on:dragover|preventDefault={() => dragOver = true}
    on:dragleave={() => dragOver = false}
    on:drop|preventDefault={handleDrop}
  >
    <div class="text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <div class="mt-4">
        <label class="cursor-pointer">
          <span class="text-blue-600 hover:text-blue-700 font-semibold">{$translations.fileUpload?.upload || 'Upload files'}</span>
          <input
            type="file"
            class="hidden"
            {accept}
            {multiple}
            on:change={handleFileInput}
          />
        </label>
        <span class="text-gray-600"> {$translations.fileUpload?.dragAndDrop || 'or drag and drop'}</span>
      </div>
      <p class="text-xs text-gray-500 mt-2">{$translations.fileUpload?.fileTypes || 'PNG, JPG, GIF up to 10MB'}</p>
    </div>
  </div>
  
  {#if files.length > 0}
    <div class="mt-4 space-y-2">
      {#each files as file, index}
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <img src={file.preview} alt={file.name} class="w-12 h-12 object-cover rounded" />
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">{file.name}</p>
            <p class="text-xs text-gray-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            on:click={() => removeFile(index)}
            class="flex-shrink-0 text-red-500 hover:text-red-700"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      {/each}
    </div>
  {/if}
  
  {#if error}
    <p class="mt-2 text-sm text-red-500">{error}</p>
  {/if}
</div>
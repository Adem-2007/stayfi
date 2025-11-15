const fs = require('fs');
const path = require('path');

class FileStorage {
  static getUploadDir() {
    return path.join(__dirname, '../uploads/design-files');
  }

  static ensureUploadDirExists() {
    const uploadDir = this.getUploadDir();
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    return uploadDir;
  }

  static async saveDesignFiles(designFiles, submissionId) {
    if (!designFiles || !Array.isArray(designFiles) || designFiles.length === 0) {
      return [];
    }

    const uploadDir = this.ensureUploadDirExists();
    const savedFiles = [];

    for (let i = 0; i < designFiles.length; i++) {
      const file = designFiles[i];
      
      if (file && typeof file === 'string' && file.startsWith('data:')) {
        try {
          // Extract mime type and base64 data
          const matches = file.match(/^data:([^;]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            const mimeType = matches[1];
            const base64Data = matches[2];
            
            // Determine file extension
            let extension = 'bin';
            if (mimeType.startsWith('image/')) {
              extension = mimeType.split('/')[1];
            } else if (mimeType === 'application/pdf') {
              extension = 'pdf';
            }
            
            // Create filename
            const filename = `${submissionId}-design-${i + 1}.${extension}`;
            const filepath = path.join(uploadDir, filename);
            
            // Save file
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(filepath, buffer);
            
            savedFiles.push({
              filename,
              path: filepath,
              mimeType,
              size: buffer.length
            });
          }
        } catch (error) {
          console.error(`Error saving design file ${i + 1}:`, error);
        }
      }
    }

    return savedFiles;
  }

  static deleteDesignFiles(submissionId) {
    try {
      const uploadDir = this.getUploadDir();
      if (!fs.existsSync(uploadDir)) {
        return;
      }

      const files = fs.readdirSync(uploadDir);
      const filesToDelete = files.filter(file => file.startsWith(`${submissionId}-design-`));
      
      filesToDelete.forEach(file => {
        const filepath = path.join(uploadDir, file);
        fs.unlinkSync(filepath);
      });
    } catch (error) {
      console.error('Error deleting design files:', error);
    }
  }

  static getDesignFile(filename) {
    const uploadDir = this.getUploadDir();
    const filepath = path.join(uploadDir, filename);
    
    if (fs.existsSync(filepath)) {
      return filepath;
    }
    
    return null;
  }
}

module.exports = FileStorage;

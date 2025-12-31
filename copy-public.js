const fs = require('fs');
const path = require('path');

console.log('📦 Copying public assets for Cloudflare deployment...');

const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, '.next', 'static', 'public');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Copy all files from public to .next/static/public
try {
    copyRecursive(publicDir, outputDir);
    console.log('✅ Public assets copied successfully!');
} catch (error) {
    console.log('⚠️  Note: This script runs after Next.js build. If you see this during local dev, you can ignore it.');
}

function copyRecursive(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursive(
                path.join(src, childItemName),
                path.join(dest, childItemName)
            );
        });
    } else {
        // Skip non-asset files
        if (src.endsWith('.md') || src.endsWith('.xlsx')) {
            return;
        }
        fs.copyFileSync(src, dest);
    }
}

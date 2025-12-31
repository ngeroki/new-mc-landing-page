const fs = require('fs-extra');
const path = require('path');

async function copyPublicAssets() {
    const publicDir = path.join(__dirname, 'public');
    const outputDir = path.join(__dirname, '.vercel', 'output', 'static');

    try {
        console.log('Copying public assets to output directory...');
        await fs.copy(publicDir, outputDir, {
            overwrite: true,
            filter: (src) => {
                // Skip .md files and other non-asset files
                return !src.endsWith('.md') && !src.endsWith('.xlsx');
            }
        });
        console.log('✓ Public assets copied successfully!');
    } catch (error) {
        console.error('Error copying public assets:', error);
        process.exit(1);
    }
}

copyPublicAssets();

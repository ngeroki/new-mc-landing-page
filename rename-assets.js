const fs = require('fs');
const path = require('path');

const baseDirs = ['public/mcpolo', 'public/mcpolo-terlaris'];
const codeFiles = ['app/data/products.ts', 'app/sections/Hero.tsx'];

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
            arrayOfFiles.push(fullPath);
        } else {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

let allPaths = [];
baseDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        allPaths = getAllFiles(dir, allPaths);
    }
});

// Sort paths by length (descending) so we rename children before parents
allPaths.sort((a, b) => b.length - a.length);

const renames = [];

allPaths.forEach(oldPath => {
    const fileName = path.basename(oldPath);
    if (fileName.includes(' ')) {
        const newFileName = fileName.replace(/ /g, '-');
        const newPath = path.join(path.dirname(oldPath), newFileName);

        // We only want to record renames that actually happen
        // Wait, if we rename a child, the parent path is still the same.
        // That's why we sorted by length descending.

        renames.push({
            old: oldPath,
            new: newPath
        });
    }
});

// Perform renames on filesystem
renames.forEach(r => {
    try {
        if (fs.existsSync(r.old)) {
            fs.renameSync(r.old, r.new);
            console.log(`Renamed: ${r.old} -> ${r.new}`);
        }
    } catch (err) {
        console.error(`Failed to rename ${r.old}: ${err.message}`);
    }
});

// Update code files
codeFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        // Pattern to find paths in code: e.g. '/mcpolo/some name/image.jpg'
        // We can be aggressive and just replace spaces with hyphens within strings that look like our paths

        // A safer way: for each rename, calculate the relative path from 'public/' and replace it in the code

        renames.forEach(r => {
            // oldRel: mcpolo/foo bar/baz.jpg
            const oldRel = r.old.replace(/\\/g, '/').replace(/^public\//, '');
            const newRel = r.new.replace(/\\/g, '/').replace(/^public\//, '');

            const oldSearch = '/' + oldRel;
            const newReplace = '/' + newRel;

            // Escape for regex
            const escapedSearch = oldSearch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedSearch, 'g');

            content = content.replace(regex, newReplace);
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});

console.log('Renaming process complete.');

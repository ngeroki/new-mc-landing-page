const fs = require('fs');
const path = require('path');

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

let allPaths = getAllFiles('public', []);
allPaths.sort((a, b) => b.length - a.length);

const renames = [];

allPaths.forEach(oldPath => {
    const fileName = path.basename(oldPath);
    if (fileName.includes(' ') || fileName.includes('(') || fileName.includes(')')) {
        let newFileName = fileName.replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '');
        const newPath = path.join(path.dirname(oldPath), newFileName);

        renames.push({
            old: oldPath,
            new: newPath
        });
    }
});

renames.forEach(r => {
    try {
        if (fs.existsSync(r.old)) {
            fs.renameSync(r.old, r.new);
            console.log(`Renamed: ${r.old} -> ${r.new}`);
        }
    } catch (err) {
        // console.log(`Skipped rename of ${r.old}`);
    }
});

// Update all code files just in case
const codeFiles = [
    'app/data/products.ts',
    'app/sections/Hero.tsx',
    'app/components/Navbar.tsx',
    'app/components/Footer.tsx',
    'app/sections/Footer.tsx',
    'app/sections/About.tsx',
    'app/sections/CompanyStory.tsx'
];

codeFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        let originalContent = content;

        renames.forEach(r => {
            const oldRel = r.old.replace(/\\/g, '/').replace(/^public\//, '');
            const newRel = r.new.replace(/\\/g, '/').replace(/^public\//, '');

            const oldSearch = '/' + oldRel;
            const newReplace = '/' + newRel;

            content = content.split(oldSearch).join(newReplace);
        });

        if (content !== originalContent) {
            fs.writeFileSync(file, content, 'utf8');
            console.log(`Updated: ${file}`);
        }
    }
});

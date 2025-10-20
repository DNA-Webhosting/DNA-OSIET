const fs = require('fs');
const path = require('path');

const modulesDir = path.resolve(__dirname, 'Modules');
const tsconfigPathsFile = path.resolve(__dirname, 'tsconfig.paths.json');

// Vérifier si le répertoire Modules existe
if (!fs.existsSync(modulesDir)) {
    // Créer le fichier tsconfig.paths.json avec seulement le chemin par défaut
    const paths = { "@/*": ["./resources/js/*"] };
    
    const tsconfigPaths = {
        compilerOptions: {
            baseUrl: '.',
            paths: paths,
        },
    };
    
    fs.writeFileSync(tsconfigPathsFile, JSON.stringify(tsconfigPaths, null, 4));
    console.log('Modules directory not found. Created tsconfig.paths.json with default paths only.');
    process.exit(0);
}

const moduleDirs = fs.readdirSync(modulesDir).filter((file) => {
    return fs.statSync(path.join(modulesDir, file)).isDirectory();
});

const paths = moduleDirs.reduce((acc, moduleName) => {
    acc[`@/${moduleName}/*`] = [`./Modules/${moduleName}/resources/js/*`];
    return acc;
}, { "@/*": ["./resources/js/*"] });

const tsconfigPaths = {
    compilerOptions: {
        baseUrl: '.',
        paths: paths,
    },
};

fs.writeFileSync(tsconfigPathsFile, JSON.stringify(tsconfigPaths, null, 4));

console.log('Successfully generated tsconfig.paths.json');
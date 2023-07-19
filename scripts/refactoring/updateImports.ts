import { Project } from 'ts-morph';

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const isAbsolute = (val: string) => {
  const layers = ['@app', '@shared', '@entities', '@features', '@widgets', '@pages'];
  return layers.some(layer => val.startsWith(layer));
};

const files = project.getSourceFiles();
files.forEach(file => {
  const importDeclarations = file.getImportDeclarations();
  importDeclarations.forEach(importDeclr => {
    const value = importDeclr.getModuleSpecifierValue();

    if (isAbsolute(value)) {
      importDeclr.setModuleSpecifier(value.replace('@', '@/'));
    }
  });
});

project.save();

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build', 'static', 'js');

const checkEntryPoint = () => {
  const files = fs.readdirSync(buildDir);
  const entryFile = files.find((file) => file.endsWith('.js') && file.includes('main'));

  if (entryFile) {
    const entryPointPath = path.join(buildDir, entryFile);
    const sourceMapPath = path.join(buildDir, `${entryFile}.map`);
    const destinationPath = path.join(__dirname, 'dist', 'index.js');
    const destinationSourceMapPath = path.join(__dirname, 'dist', `${entryFile}.map`);

    fs.copyFile(entryPointPath, destinationPath, (error) => {
      if (error) {
        console.error('Error copying entry point file:', error);
      } else {
        console.log('Entry point generated successfully!');
      }
    });

    fs.copyFile(sourceMapPath, destinationSourceMapPath, (error) => {
      if (error) {
        console.error('Error copying source map file:', error);
      } else {
        console.log('Source map generated successfully!');
      }
    });
  } else {
    console.error('Unable to find entry point file. Retrying...');
    setTimeout(checkEntryPoint, 1000);
  }
};

checkEntryPoint();
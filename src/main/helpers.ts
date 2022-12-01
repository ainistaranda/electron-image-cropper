import fs from 'fs';

export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader(); // creates the reader
    // what to do when the file is done reading
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file); // read the file
  });
}
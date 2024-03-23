import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const filePath = path.resolve('public/components', body.file); // Adjust the path to your Vue component

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Optionally, you can parse the content here to extract only the <template> part
    return content; // Return the raw content of the Vue component
  } catch (error) {
    return createError({ statusCode: 404, statusMessage: 'Component not found' });
  }
});
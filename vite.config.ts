import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), removeConsole()],
});

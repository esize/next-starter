import createJITI from 'jiti';
import { fileURLToPath } from 'node:url';
const jiti = createJITI(fileURLToPath(import.meta.url));

jiti('./src/env.ts')


/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true
    }
};

export default nextConfig;

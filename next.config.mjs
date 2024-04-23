/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "hhcvwkwnhlezcmcosmds.supabase.co"
            }
        ]
    }
};

export default nextConfig;

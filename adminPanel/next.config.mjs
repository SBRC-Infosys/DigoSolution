/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',  // Cloudinary
      'www.youtube.com',     // YouTube
      'www.google.com',      // Google
      'www.facebook.com',    // Facebook
      'www.fb.com',          // Facebook short link
      'www.x.com',           // X (formerly Twitter)
      'www.instagram.com',   // Instagram
      'web.whatsapp.com',    // WhatsApp
      'telegram.org',        // Telegram
    ],
  },
};

export default nextConfig;

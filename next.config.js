/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
}

module.exports = {
    ...nextConfig,
    future: {
        webpack5: true,
    },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        }

        return config
    },
}

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
}

module.exports = {
    ...nextConfig,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    future: {
        webpack5: true,
    },
    // future: {
    //     webpack5: true,
    // },
    webpack(config) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            fs: false,
        }

        return config
    },
    // images: {
    //     unoptimized: true,
    // },
    trailingSlash: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
}

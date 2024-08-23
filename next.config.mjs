/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				hostname: "placehold.co",
				protocol: "https",
			},
			{
				hostname: "images.cdn1.buscalibre.com",
				protocol: "https",
			},
			{
				hostname: "images.cdn2.buscalibre.com",
				protocol: "https",
			},
			{
				hostname: "images.cdn3.buscalibre.com",
				protocol: "https",
			},
			{
				hostname: "statics.cdn1.buscalibre.com",
				protocol: "https",
			}
		]
	}
};

export default nextConfig;

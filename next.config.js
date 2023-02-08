/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ 
      source: "/links",
      headers: [{
        key: "Content-Type",
        value: "text/json"
      }, {
        key: "Content-disposition",
        value: "attachment; filename=links.json"
      }]
    }]
  },
  reactStrictMode: true,
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next 16 auto-generates AGENTS.md / CLAUDE.md on dev; opt out to keep the tree clean.
  agentRules: false,
};

export default nextConfig;

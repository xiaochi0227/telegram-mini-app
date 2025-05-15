interface Config {
  botToken: string;
  apiBaseUrl: string;
}

const config: Config = {
  botToken: process.env.VITE_BOT_TOKEN || '',
  apiBaseUrl: process.env.VITE_API_BASE_URL || '',
};

export default config; 
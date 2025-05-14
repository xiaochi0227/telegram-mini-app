interface Config {
  botToken: string;
  apiBaseUrl: string;
}

const config: Config = {
  botToken: import.meta.env.VITE_BOT_TOKEN || '',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
};

export default config; 
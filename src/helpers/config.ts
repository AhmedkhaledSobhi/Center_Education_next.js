class ConfigService {
  private publicConfig: Record<string, string>;
  private sensitiveConfig: Record<string, string>;
  private config: Record<string, string>;
  private loaded: boolean;

  constructor() {
    this.publicConfig = {
      API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "",
    };

    this.sensitiveConfig = {};

    this.config = {
      ...this.publicConfig,
      ...this.sensitiveConfig,
    };

    this.loaded = true;

    Object.freeze(this.config);
  }

  getConfig(): Record<string, string> {
    return this.config;
  }

  get(key: string): string | undefined {
    return this.config[key];
  }

  get apiBaseUrl(): string {
    return this.config.API_BASE_URL;
  }
}

const configService = new ConfigService();
export default configService;
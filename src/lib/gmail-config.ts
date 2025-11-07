// Gmail configuration management
export interface GmailConfig {
  email: string;
  appPassword: string;
  configuredAt: string;
}

class GmailConfigManager {
  private config: GmailConfig | null = null;

  // Set Gmail configuration
  setConfig(email: string, appPassword: string): void {
    this.config = {
      email,
      appPassword,
      configuredAt: new Date().toISOString()
    };
    
    // Also store in global for cross-request access
    (global as any).gmailConfig = this.config;
    
    console.log('Gmail configuration updated:', {
      email,
      hasPassword: !!appPassword,
      passwordLength: appPassword.length
    });
  }

  // Get Gmail configuration
  getConfig(): GmailConfig | null {
    // First try to get from local instance
    if (this.config) {
      return this.config;
    }

    // Then try to get from global storage
    if ((global as any).gmailConfig) {
      this.config = (global as any).gmailConfig;
      return this.config;
    }

    // Finally try environment variables
    const envEmail = process.env.GMAIL_EMAIL;
    const envPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (envEmail && envPassword) {
      this.config = {
        email: envEmail,
        appPassword: envPassword,
        configuredAt: new Date().toISOString()
      };
      return this.config;
    }

    return null;
  }

  // Check if Gmail is configured
  isConfigured(): boolean {
    const config = this.getConfig();
    return !!(config && config.appPassword && config.appPassword !== 'demopasswordfortesting16');
  }

  // Check if Gmail is properly configured for production
  isProductionReady(): boolean {
    const config = this.getConfig();
    return !!(config && config.appPassword && config.appPassword.length === 16 && config.appPassword !== 'demopasswordfortesting16');
  }

  // Clear configuration
  clearConfig(): void {
    this.config = null;
    delete (global as any).gmailConfig;
  }

  // Get configuration status
  getStatus() {
    const config = this.getConfig();
    const envEmail = process.env.GMAIL_EMAIL;
    const envPassword = process.env.GMAIL_APP_PASSWORD;
    
    return {
      local: {
        exists: !!this.config,
        email: this.config?.email || null,
        hasPassword: !!this.config?.appPassword,
        passwordLength: this.config?.appPassword?.length || 0,
        configuredAt: this.config?.configuredAt || null
      },
      global: {
        exists: !!(global as any).gmailConfig,
        email: (global as any).gmailConfig?.email || null,
        hasPassword: !!(global as any).gmailConfig?.appPassword,
        passwordLength: (global as any).gmailConfig?.appPassword?.length || 0,
        configuredAt: (global as any).gmailConfig?.configuredAt || null
      },
      environment: {
        email: envEmail || null,
        hasPassword: !!envPassword,
        passwordLength: envPassword?.length || 0,
        isDemo: envPassword === 'demopasswordfortesting16'
      }
    };
  }
}

// Export singleton instance
export const gmailConfigManager = new GmailConfigManager();
export type FormatType = 'deb' | 'flatpakref' | 'AppImage' | 'snap' | 'portable';
export type SourceType = 'local' | 'repo' | 'static';
export type VersionType = 'latest' | 'specific';

export interface InstallFormat {
  type: FormatType;
  source: SourceType;
  url?: string;
  versionType: VersionType;
  versionLabel?: string;
  packageName?: string;
}
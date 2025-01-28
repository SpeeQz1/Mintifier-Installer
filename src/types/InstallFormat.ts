export type FormatType = 'deb' | 'flatpakref' | 'AppImage' | 'snap' | 'portable';
export type SourceType = 'local' | 'repo' | 'static';
export type VersionType = 'latest' | 'specific';

export type ArchitectureType = 'amd64' | 'arm64' | 'x86_64' | 'aarch64' | string;

export interface InstallFormat {
  type: FormatType;
  source: SourceType;
  url?: string;
  versionType: VersionType;
  versionLabel?: string;
  packageName?: string;
  architecture?: ArchitectureType;
}
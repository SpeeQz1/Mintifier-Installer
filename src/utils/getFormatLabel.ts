import { InstallFormat } from "@src/types/index";

export function getFormatLabel(format: InstallFormat): string {
  const sourceLabel = format.source === 'repo' ? 'Repo' : format.source.charAt(0).toUpperCase() + format.source.slice(1);
  
  if (format.source === 'static') {
    return `Static${format.versionLabel ? ` - v${format.versionLabel}` : ''}`;
  }

  return `${sourceLabel} - ${format.versionType === 'latest' ? 'Latest' : `v${format.versionLabel}`}`;
}
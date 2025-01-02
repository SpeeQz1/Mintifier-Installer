import { FormatType, InstallFormat, SourceType } from "@src/types/index";
import * as path from "@tauri-apps/api/path";

async function fetchLatestReleaseUrl(pattern: string): Promise<string> {
  const [baseUrl] = pattern.split("*");
  const response = await fetch(baseUrl);
  const html = await response.text();
  
  const regex = new RegExp(pattern.replace(/\*/g, '[^"]*'));
  const matches = html.match(regex);
  
  if (!matches || matches.length === 0) {
    throw new Error(`No matching release found for pattern: ${pattern}`);
  }
  
  return matches[0];
}

export async function generateInstallCommands(
  format: InstallFormat,
  appName: string
): Promise<{ filePath: string; commands: string[] }> {
  const homeDirPath = await path.homeDir();
  const basePathMap = {
    deb: await path.join(homeDirPath, "OptionalSoftware", "deb"),
    flatpakref: await path.join(homeDirPath, "OptionalSoftware", "flatpakref"),
    AppImage: await path.join(homeDirPath, "AppImages"),
    snap: await path.join(homeDirPath, "OptionalSoftware", "snap"),
    portable: await path.join(homeDirPath, "OptionalSoftware", "portable")
  };
  
  const basePath = basePathMap[format.type];
  const filePath = await path.join(basePath, `${appName}.${format.type.toLowerCase()}`);

  const packageManagers = {
    deb: (packageName: string) => `sudo apt install ${packageName}`,
    flatpakref: (packageName: string) => `sudo flatpak install flathub ${packageName}`,
    snap: (packageName: string) => `sudo snap install ${packageName}`
  };

  const commands: Record<FormatType, Record<SourceType, () => Promise<string[]>>> = {
    deb: {
      local: async () => {
        const pkgName = format.versionType === "specific" && format.packageName 
          ? format.packageName 
          : appName;
        return [packageManagers.deb(pkgName)];
      },
      repo: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${await fetchLatestReleaseUrl(format.url!)}"`,
        `sudo apt install "${filePath}"`
      ],
      static: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${format.url}"`,
        `sudo apt install "${filePath}"`
      ]
    },
    flatpakref: {
      local: async () => {
        const pkgName = format.versionType === "specific" && format.packageName 
          ? format.packageName 
          : appName;
        return [
          "flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo",
          packageManagers.flatpakref(pkgName)
        ];
      },
      repo: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "$(${await fetchLatestReleaseUrl(format.url!)})"`,
        `sudo flatpak install "${filePath}"`
      ],
      static: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${format.url}"`,
        `sudo flatpak install "${filePath}"`
      ]
    },
    snap: {
      local: async () => {
        const pkgName = format.versionType === "specific" && format.packageName 
          ? format.packageName 
          : appName;
        return [packageManagers.snap(pkgName)];
      },
      repo: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "$(${await fetchLatestReleaseUrl(format.url!)})"`,
        `sudo snap install "${filePath}"`
      ],
      static: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${format.url}"`,
        `sudo snap install "${filePath}"`
      ]
    },
    AppImage: {
      repo: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "$(${await fetchLatestReleaseUrl(format.url!)})"`,
        `chmod +x "${filePath}"`
      ],
      static: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${format.url}"`,
        `chmod +x "${filePath}"`
      ],
      local: async () => [] // Not supported
    },
    portable: {
      repo: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "$(${await fetchLatestReleaseUrl(format.url!)})"`,
      ],
      static: async () => [
        `mkdir -p "${basePath}"`,
        `wget -P "${basePath}" "${format.url}"`
      ],
      local: async () => [] // Not supported
    }
  };

  const generatedCommands = await commands[format.type][format.source]();
  return {
    filePath,
    commands: generatedCommands
  };
}
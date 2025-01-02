import { FormatType, InstallFormat, SourceType } from "@src/types/index";

const ALLOWED_SOURCES: Record<FormatType, SourceType[]> = {
  "snap": ["local", "repo", "static"],
  "deb": ["local", "repo", "static"],
  "flatpakref": ["local", "repo", "static"],
  "AppImage": ["repo", "static"],
  "portable": ["repo", "static"]
};

const PACKAGE_NAME_FORMATS: FormatType[] = ["snap", "deb", "flatpakref"];

interface ValidationError {
  appId: string;
  message: string;
}

export function validateFormatConfigs(
  applications: Array<{ id: string; name: string; formats?: InstallFormat[] }>
): ValidationError[] {
  let errors: ValidationError[] = [];

  for (let app of applications) {
    if (!app.formats || app.formats.length === 0) continue;

    for (let format of app.formats) {
      // Validate format source compatibility
      const allowedSources = ALLOWED_SOURCES[format.type];
      if (!allowedSources.includes(format.source)) {
        errors.push({
          appId: app.id,
          message: `Invalid source type "${format.source}" for format "${format.type}" in ${app.name}. Allowed sources: ${allowedSources.join(", ")}`
        });
      }

      // Validate local source type
      if (format.source === "local" && format.url) {
        errors.push({
          appId: app.id,
          message: `Local source type should not have URL for ${app.name}!`
        });
      }

      // Validate repo source type
      if (format.source === "repo") {
        if (!format.url) {
          errors.push({
            appId: app.id,
            message: `Repo source type requires URL for ${app.name}!`
          });
        } else if (!format.url.includes("*")) {
          errors.push({
            appId: app.id,
            message: `Repo URL must include wildcard (*) for version matching in ${app.name}!`
          });
        }

        if (format.versionType === "specific") {
          errors.push({
            appId: app.id,
            message: `Repo source should use "latest" version type, not "specific" for ${app.name}!`
          });
        }
      }

      // Validate static source type
      if (format.source === "static") {
        if (!format.url) {
          errors.push({
            appId: app.id,
            message: `Static source type requires URL for ${app.name}!`
          });
        } else if (format.url.includes("*")) {
          errors.push({
            appId: app.id,
            message: `Static URL should not include wildcards for ${app.name}!`
          });
        }
      }

      // Validate specific version requirements
      if (format.versionType === "specific") {
        if (PACKAGE_NAME_FORMATS.includes(format.type)) {
          if (!format.packageName && !format.url) {
            errors.push({
              appId: app.id,
              message: `Specific version requires either packageName or static URL for ${format.type} format in ${app.name}!`
            });
          }
        } else {
          if (!format.url) {
            errors.push({
              appId: app.id,
              message: `Specific version requires static URL for ${format.type} format in ${app.name}!`
            });
          }
        }
      }
    }
  }

  return errors;
}
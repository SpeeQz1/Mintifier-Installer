import { lazy, Suspense } from 'react';

const SVG_COMPONENTS = {
  DownloadAll: {
    component: lazy(() => import('@src/assets/svg/Download-All.svg?react')),
    path: new URL('@src/assets/svg/Download-All.svg', import.meta.url).href
  },
  DownloadPage: {
    component: lazy(() => import('@src/assets/svg/Download-Page.svg?react')),
    path: new URL('@src/assets/svg/Download-Page.svg', import.meta.url).href
  },
  AppLogo: {
    component: lazy(() => import('@src/assets/svg/Mint-Logo-Leaf-Export.svg?react')),
    path: new URL('@src/assets/svg/Mint-Logo-Leaf-Export.svg', import.meta.url).href
  }
} as const;

type IconName = keyof typeof SVG_COMPONENTS;

const SvgIcons = new Proxy({} as any, {
  get(_target: any, prop: string | symbol) {
    if (prop === 'URLs') {
      return Object.entries(SVG_COMPONENTS).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value.path
      }), {});
    }
    const Component = SVG_COMPONENTS[prop as IconName]?.component;
    return Component ? (props: any) => (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    ) : undefined;
  }
}) as {
  [K in IconName]: typeof SVG_COMPONENTS[K]['component']
} & { URLs: { [K in IconName]: typeof SVG_COMPONENTS[K]['path'] } };

export default SvgIcons;
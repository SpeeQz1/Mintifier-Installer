const withDataAttr = (
  Icon: React.FC<React.SVGProps<SVGSVGElement>>,
  isImage: boolean
) => {
  return (props: React.SVGProps<SVGSVGElement>) => (
    <Icon data-is-image={isImage} {...props} />
  );
};

const SvgIcons = {
  DownloadAll: withDataAttr(
    (await import("@src/assets/svgs/Download-All.svg?react")).default,
    false
  ),
  DownloadPage: withDataAttr(
    (await import("@src/assets/svgs/Download-Page.svg?react")).default,
    false
  ),
  AppLogo: withDataAttr(
    (await import("@src/assets/svgs/Mint-Logo-Leaf-Export.svg?react")).default,
    true
  ),
};

export default SvgIcons;

export type IconType =
  | 'arrow'
  | 'copy'
  | 'volume'
  | 'theme'
  | 'star'
  | 'lessThan'
  | 'greater'
  | 'collect';

interface IconConfig {
  title: string;
  key: IconType;
  svgDom: JSX.Element;
}

// svg code from https://icones.js.org/

export const ICON_CONFIGS: IconConfig[] = [
  {
    title: '箭头',
    key: 'arrow',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
      </svg>
    ),
  },
  {
    title: '复制',
    key: 'copy',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5 22q-.825 0-1.413-.587Q3 20.825 3 20V6h2v14h11v2Zm4-4q-.825 0-1.412-.587Q7 16.825 7 16V4q0-.825.588-1.413Q8.175 2 9 2h9q.825 0 1.413.587Q20 3.175 20 4v12q0 .825-.587 1.413Q18.825 18 18 18Z"></path>
      </svg>
    ),
  },
  {
    title: '声音',
    key: 'volume',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M232 416a23.88 23.88 0 0 1-14.2-4.68a8.27 8.27 0 0 1-.66-.51L125.76 336H56a24 24 0 0 1-24-24V200a24 24 0 0 1 24-24h69.75l91.37-74.81a8.27 8.27 0 0 1 .66-.51A24 24 0 0 1 256 120v272a24 24 0 0 1-24 24Zm-106.18-80Zm-.27-159.86ZM320 336a16 16 0 0 1-14.29-23.19c9.49-18.87 14.3-38 14.3-56.81c0-19.38-4.66-37.94-14.25-56.73a16 16 0 0 1 28.5-14.54C346.19 208.12 352 231.44 352 256c0 23.86-6 47.81-17.7 71.19A16 16 0 0 1 320 336Z"></path>
        <path
          fill="currentColor"
          d="M368 384a16 16 0 0 1-13.86-24C373.05 327.09 384 299.51 384 256c0-44.17-10.93-71.56-29.82-103.94a16 16 0 0 1 27.64-16.12C402.92 172.11 416 204.81 416 256c0 50.43-13.06 83.29-34.13 120a16 16 0 0 1-13.87 8Z"></path>
        <path
          fill="currentColor"
          d="M416 432a16 16 0 0 1-13.39-24.74C429.85 365.47 448 323.76 448 256c0-66.5-18.18-108.62-45.49-151.39a16 16 0 1 1 27-17.22C459.81 134.89 480 181.74 480 256c0 64.75-14.66 113.63-50.6 168.74A16 16 0 0 1 416 432Z"></path>
      </svg>
    ),
  },
  {
    title: '主题',
    key: 'theme',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z"></path>
      </svg>
    ),
  },
  {
    title: '前一页',
    key: 'greater',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="m6.5 17.5l8.25-5.5L6.5 6.5l1-1.5L18 12L7.5 19z"></path>
      </svg>
    ),
  },
  {
    title: '收藏',
    key: 'star',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275Z"></path>
      </svg>
    ),
  },
  {
    title: '后一页',
    key: 'lessThan',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M17.5 17.5L9.25 12l8.25-5.5l-1-1.5L6 12l10.5 7z"></path>
      </svg>
    ),
  },
  {
    title: '收藏',
    key: 'collect',
    svgDom: (
      <svg width="1em" height="1em" viewBox="0 0 1024 1024">
        <path
          fill="currentColor"
          d="M256 128v698.88l196.032-156.864a96 96 0 0 1 119.936 0L768 826.816V128H256zm-32-64h576a32 32 0 0 1 32 32v797.44a32 32 0 0 1-51.968 24.96L531.968 720a32 32 0 0 0-39.936 0L243.968 918.4A32 32 0 0 1 192 893.44V96a32 32 0 0 1 32-32z"></path>
      </svg>
    ),
  },
];

export const getIconConfig = (type: IconType) => {
  const config = ICON_CONFIGS.find((d) => d.key === type);

  return config;
};

import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'my-wordbit',
  brand: {
    displayName: '워드비트', // 화면에 노출될 앱의 한글 이름으로 바꿔주세요.
    primaryColor: '#3182F6', // 화면에 노출될 앱의 기본 색상으로 바꿔주세요.
    icon: 'https://dev-jhjoo.notion.site/image/attachment%3A191d057c-42c5-4c86-87a1-3643c20185c2%3Awordbit_light.png?table=block&id=2a3c0b2b-28b5-801a-ab6c-e3f2758a3c74&spaceId=16df67f2-e89a-4ea4-9d06-15058dcd60f3&width=1200&userId=&cache=v2', // 화면에 노출될 앱의 아이콘 이미지 주소로 바꿔주세요.
    bridgeColorMode: 'basic',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite',
      build: 'tsc -b && vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});

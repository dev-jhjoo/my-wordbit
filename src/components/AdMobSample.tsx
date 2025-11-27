import { GoogleAdMob } from '@apps-in-toss/web-framework';
import { useCallback, useEffect, useRef } from 'react';

const AD_GROUP_ID = 'ait.live.793e70d19dce43ae';

interface GoogleAdmobExampleProps {
  swipeCount: number;
}

export function GoogleAdmobExample({ swipeCount }: GoogleAdmobExampleProps) {
  // const [adLoadStatus, setAdLoadStatus] = useState<'not_loaded' | 'loaded' | 'failed'>('not_loaded');
  const lastShownSwipeRef = useRef(0);

  const loadAd = useCallback(() => {
    const supported = GoogleAdMob.loadAppsInTossAdMob.isSupported?.() === true;
    if (!supported) return;

    const cleanup = GoogleAdMob.loadAppsInTossAdMob({
      options: { 
        adGroupId: AD_GROUP_ID 
    },
      onEvent: (event) => {
        console.log(event.type);
        if (event.type === 'loaded') {
          console.log('광고 로드 성공', event.data);
          // setAdLoadStatus('loaded');
        }
      },
      onError: (error) => {
        console.error('광고 불러오기 실패', error);
        // setAdLoadStatus('failed');
      },
    });
    return cleanup;
  }, []);

  const showAd = useCallback(() => {
    const supported = GoogleAdMob.showAppsInTossAdMob.isSupported();
    if (!supported) return;

    GoogleAdMob.showAppsInTossAdMob({
      options: { adGroupId: AD_GROUP_ID },
      onEvent: (event) => {
        switch (event.type) {
          case 'requested':
            console.log('광고 보여주기 요청 완료');
            break;
          case 'clicked':
            console.log('광고 클릭');
            break;
          case 'dismissed':
            console.log('광고 닫힘');
            break;
          case 'failedToShow':
            console.log('광고 보여주기 실패');
            break;
          case 'impression':
            console.log('광고 노출');
            break;
          case 'userEarnedReward':
            console.log('광고 보상 획득 unitType:', event.data.unitType);
            console.log('광고 보상 획득 unitAmount:', event.data.unitAmount);
            break;
          case 'show':
            console.log('광고 컨텐츠 보여졌음');
            break;
        }
      },
      onError: (error) => {
        console.error('광고 보여주기 실패', error);
      },
    });
  }, []);

  useEffect(() => {
    const cleanup = loadAd();
    return cleanup;
  }, [loadAd]);

  useEffect(() => {
    if (swipeCount === 0) return;
    if (swipeCount % 10 !== 0) return;
    if (swipeCount === lastShownSwipeRef.current) return;

    lastShownSwipeRef.current = swipeCount;
    showAd();
    loadAd();
  }, [swipeCount, showAd, loadAd]);

  return null;
}

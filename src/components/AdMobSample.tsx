import { GoogleAdMob } from '@apps-in-toss/web-framework';
import { useCallback, useState } from 'react';

const AD_GROUP_ID = 'ait.live.793e70d19dce43ae';

export function GoogleAdmobExample() {
  const [adLoadStatus, setAdLoadStatus] = useState<'not_loaded' | 'loaded' | 'failed'>('not_loaded');

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
          setAdLoadStatus('loaded');
        }
      },
      onError: (error) => {
        console.error('광고 불러오기 실패', error);
        setAdLoadStatus('failed');
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
            setAdLoadStatus('not_loaded');
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

  return (
    <div>
      {adLoadStatus === 'not_loaded' && '광고 로드 하지 않음 '}
      {adLoadStatus === 'loaded' && '광고 로드 완료'}
      {adLoadStatus === 'failed' && '광고 로드 실패'}

      <button title="Load Ad" onClick={loadAd}>
        광고 로드
      </button>
      <button title="Show Ad" onClick={showAd} disabled={adLoadStatus !== 'loaded'}>
        광고 보여주기
      </button>
    </div>
  );
}

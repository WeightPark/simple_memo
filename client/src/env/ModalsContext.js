// modal 익숙해지면 해보자
import { createContext } from 'react';

export const ModalDispatchContext = createContext({
    // 필요 함수 작성 부분
    open: () => {},
    close: () => {}
});

// Context Dispatch와 State로 나눈 이유 - ContextAPI의 성능 이슈 존재 -> 찾아볼것
export const ModalsStateContext = createContext([]);
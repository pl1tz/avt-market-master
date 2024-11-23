import React from 'react';
import { useLoad } from '../hook/useLoad';
import { useMedia } from '../hook/useMedia';
import { useScrollToTop } from '../hook/useScrollToTop';
import { useResetSelectCar } from '../hook/useResetSelectCar';
import { usePageTitle } from '../hook/usePageTitle';

export const InitialProvider = ({ children }: { children: React.ReactNode }) => {
    useLoad();
    useMedia();
    useScrollToTop();
    useResetSelectCar();
    usePageTitle();
    return <>{children}</>;
};

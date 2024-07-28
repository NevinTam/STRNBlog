// src/analytics/ga4.ts

import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-L0KCEMVECM'; // Replace with your GA4 measurement ID

export const initializeGA = () => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};

export const logEvent = (category: string, action: string, label?: string) => {
  ReactGA.event({ category, action, label });
};

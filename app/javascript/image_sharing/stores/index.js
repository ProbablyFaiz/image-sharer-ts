import React from 'react';

import { FeedbackStore } from './FeedbackStore';

export const storesContext = React.createContext({
  feedbackStore: new FeedbackStore()
});

export const useStore = () => React.useContext(storesContext);

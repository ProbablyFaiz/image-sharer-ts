import React from 'react';

import FeedbackForm from './FeedbackForm';
import Footer from './Footer';
import Header from './Header';

const App = () => (
  <div>
    <Header title='Tell us what you think' />
    <FeedbackForm />
    <Footer />
  </div>
);

export default App;

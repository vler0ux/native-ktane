import React, { useState } from 'react';
import Color from './color';
import Index from './index';

export default function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return <Index onStart={() => setStarted(true)} />;
  }

  return <Color />;
}

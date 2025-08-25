import { useState, useEffect } from 'react';
import YourFitcardPrototype from './YourFitcardPrototype.jsx';
import SplashScreen from './SplashScreen.jsx';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  // Тема по умолчанию (логика как в прототипе)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'dark';
  });
  useEffect(() => {
    // Синхронизировать тему с html root
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} theme={theme} />;
  }
  return <YourFitcardPrototype />;
}

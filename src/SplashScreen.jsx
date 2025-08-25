import { useEffect } from "react";

export default function SplashScreen({ onFinish, theme }) {
  useEffect(() => {
  const t = setTimeout(onFinish, 2000);
    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 flex flex-col justify-between items-center min-h-screen w-full z-50 transition-colors duration-300 ${theme === "dark" ? "bg-neutral-950 text-white" : "bg-white text-black"}`}>
      <div />
      <div className="flex flex-col items-center gap-4">
        <img src="/icon.svg" alt="Fitcard logo" className="w-20 h-20 mb-2" />
        <div className="text-2xl font-bold tracking-tight">Fitcard</div>
        <div className="text-base opacity-70 -mt-2">Every workout matters</div>
      </div>
      <div className="mb-8 text-center text-xs opacity-60">
        <div>Developed by</div>
        <div className="font-semibold tracking-wide">tojalle</div>
      </div>
    </div>
  );
}

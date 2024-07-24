"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  //   useEffect(() => {
  //     animatePageIn();
  //   }, []);

  return (
    <div>
      <div id="transition-element" className=""></div>
      {children}
    </div>
  );
}

export function Accordion({ children }) {
  return <div className="w-full">{children}</div>;
}

export function AccordionItem({ children }) {
  return <div className="border rounded-2xl mb-4">{children}</div>;
}

export function AccordionTrigger({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-indigo-700 text-white p-4 font-bold rounded-t-2xl cursor-pointer flex items-center gap-2"
    >
      {children}
    </div>
  );
}

export function AccordionContent({ children }) {
  return <div className="p-4 bg-white/20 rounded-b-2xl">{children}</div>;
}

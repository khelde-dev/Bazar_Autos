export const SectionTitle = ({ icon: Icon, title, extra }: { icon: any, title: string, extra?: React.ReactNode }) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="text-blue-600"><Icon size={20} /></div>
      <h2 className="font-bold text-gray-800 text-lg">{title}</h2>
    </div>
    {extra}
  </div>
);
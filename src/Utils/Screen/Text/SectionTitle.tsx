export const SectionTitle = ({
  icon: Icon,
  title,
  extra,
}: {
  icon: React.ElementType;
  title: string;
  extra?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="bg-blue-600 dark:bg-blue-500 p-1.5 rounded-lg text-white">
        <Icon size={20} />
      </div>
      <h2 className="font-bold text-gray-800 dark:text-slate-100 text-lg">{title}</h2>
    </div>
    {extra}
  </div>
);

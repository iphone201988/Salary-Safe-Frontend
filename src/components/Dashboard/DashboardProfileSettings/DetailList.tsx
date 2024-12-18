
type DetailListProps = {
    title: string;
    items: Array<string> | undefined;
  };
  
  const DetailList = ({ title, items }: DetailListProps) => (
    <div className="w-full flex flex-col">
      <h2 className="text-[20px] font-bold text-black m-2">{title}</h2>
      <div className="w-full flex flex-wrap gap-2">
        {items?.map((data, index) => (
          <div
            key={index}
            className="w-fit border border-gray-400 rounded-3xl p-1"
          >
            {data}
          </div>
        ))}
      </div>
    </div>
  );
  
  export default DetailList
import "./App.css";
import KlineChartComponent from "@/component/KlineChart";
import { useKlineData } from "@/hooks/useKlineData";

function App() {
  const { data, isLoading, isError } = useKlineData();

  if (isLoading)
    return <div className="p-4 text-gray-500">Đang tải dữ liệu...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Lỗi khi tải dữ liệu</div>;

  return (
    <>
      <div>
        <KlineChartComponent data={data ?? []} />
      </div>
    </>
  );
}

export default App;

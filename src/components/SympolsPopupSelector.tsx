import type { ModalComponentHandle } from "@/types";
import type { SymbolsPopupSelectorProps } from "@/types/SympolsSelector";
import { useMemo, useRef, useState } from "react";
import ModalComponent from "./Modals";

const SymbolsPopupSelector = ({
  symbols,
  selected,
  onSelect,
}: SymbolsPopupSelectorProps) => {
  const modalRef = useRef<ModalComponentHandle>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (symbol: string) => {
    onSelect(symbol);
    modalRef.current?.close(); // Đóng modal
  };

  const handleClose = () => {
    // Đợi animation kết thúc mới reset
    setTimeout(() => {
      setSearchTerm("");
    }, 300); // khớp với transition duration của modal
  };

  const filteredSymbols = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return symbols;
    return symbols.filter(
      (s) =>
        s.symbol.toLowerCase().includes(term) ||
        s.name?.toLowerCase().includes(term)
    );
  }, [symbols, searchTerm]);

  return (
    <div>
      <button
        onClick={() => modalRef.current?.open()}
        className="btn btn-primary"
      >
        {selected}
      </button>

      <ModalComponent
        ref={modalRef}
        title="Symbol Search"
        showCloseIcon
        onClose={handleClose}
        footer={
          <button className="btn" onClick={() => modalRef.current?.close()}>
            Đóng
          </button>
        }
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Tìm theo symbol hoặc tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="max-h-[50vh] overflow-y-auto">
          {filteredSymbols.length === 0 ? (
            <div className="text-center text-gray-500">
              Không tìm thấy symbol
            </div>
          ) : (
            filteredSymbols.map((s) => (
              <div
                key={s.symbol}
                onClick={() => handleSelect(s.symbol)}
                className={`px-4 py-2 cursor-pointer hover:bg-black flex items-center space-x-3 text-black ${
                  selected === s.symbol ? "font-medium text-blue-600" : ""
                }`}
              >
                <div className="text-sm text-gray-300">{s.symbol}</div>
                <div className="text-xs text-gray-500">{s.name}</div>
              </div>
            ))
          )}
        </div>
      </ModalComponent>
    </div>
  );
};

export default SymbolsPopupSelector;

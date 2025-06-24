export interface SymbolsPopupSelectorProps {
  symbols: SymbolItem[];
  selected: string;
  onSelect: (symbol: string) => void;
}

export interface SymbolItem {
  symbol: string;
  name: string;
}

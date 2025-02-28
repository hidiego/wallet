import { RootState } from "@store";
import { tokenSelectorByDisplaySymbol } from "@store/wallet";
import { SvgProps } from "react-native-svg";
import { useSelector } from "react-redux";
import { useThemeContext } from "@shared-contexts/ThemeProvider";
import { DefaultLoanToken } from "./DefaultLoanToken";
import { DefaultLPS } from "./DefaultLPS";
import { DefaultToken } from "./DefaultToken";

export function _Default(symbol: string): (props: SvgProps) => JSX.Element {
  const tokenDetail = useSelector((state: RootState) =>
    tokenSelectorByDisplaySymbol(state.wallet, symbol)
  );
  const { isLight } = useThemeContext();

  if (tokenDetail?.isLoanToken) {
    return DefaultLoanToken(symbol, isLight);
  }

  if (tokenDetail?.isLPS) {
    return DefaultLPS(tokenDetail.symbol);
  }

  return DefaultToken(symbol);
}

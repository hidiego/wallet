import { ThemedTouchableOpacityV2 } from "@components/themed";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "@components";
import { tailwind } from "@tailwind";
import { RootState } from "@store";
import { useSelector } from "react-redux";
import { Platform } from "react-native";
import { translate } from "@translations";
import { PortfolioParamList } from "../PortfolioNavigator";
import { PortfolioRowToken } from "../PortfolioScreen";
import { EmptyTokensScreen } from "./EmptyTokensScreen";
import { TokenIcon } from "./TokenIcon";
import { TokenNameText } from "./TokenNameText";
import { TokenAmountText } from "./TokenAmountText";
import { ButtonGroupTabKey } from "./AssetsFilterRow";
import { EmptyCryptoIcon } from "../assets/EmptyCryptoIcon";
import { EmptyLPTokenIcon } from "../assets/EmptyLPTokenIcon";
import { EmptyDTokenIcon } from "../assets/EmptyDTokenIcon";
import { EmptyPortfolioIcon } from "../assets/EmptyPortfolioIcon";

interface PortfolioCardProps {
  isZeroBalance: boolean;
  filteredTokens: PortfolioRowToken[];
  navigation: StackNavigationProp<PortfolioParamList>;
  buttonGroupOptions?: {
    onButtonGroupPress: (key: ButtonGroupTabKey) => void;
    activeButtonGroup: ButtonGroupTabKey;
    setActiveButtonGroup: (key: ButtonGroupTabKey) => void;
  };
  denominationCurrency: string;
}

export function PortfolioCard({
  isZeroBalance,
  filteredTokens,
  navigation,
  buttonGroupOptions,
  denominationCurrency,
}: PortfolioCardProps): JSX.Element {
  const { hasFetchedToken } = useSelector((state: RootState) => state.wallet);

  // return empty portfolio if no DFI and other tokens
  if (isZeroBalance) {
    const screenDetails = getEmptyScreenDetails(ButtonGroupTabKey.AllTokens);
    return <EmptyTokensScreen {...screenDetails} testID="empty_portfolio" />;
  }

  if (filteredTokens.length === 0 && hasFetchedToken) {
    const screenDetails = getEmptyScreenDetails(
      buttonGroupOptions?.activeButtonGroup
    );
    return <EmptyTokensScreen {...screenDetails} testID="empty_portfolio" />;
  }

  return (
    <View testID="card_balance_row_container" style={tailwind("mx-5")}>
      {filteredTokens.map((item) => (
        <PortfolioItemRow
          key={item.symbol}
          onPress={() =>
            navigation.navigate({
              name: "TokenDetailScreen",
              params: { token: item, usdAmount: item.usdAmount },
              merge: true,
            })
          }
          token={item}
          denominationCurrency={denominationCurrency}
        />
      ))}
    </View>
  );
}

function PortfolioItemRow({
  token,
  onPress,
  denominationCurrency,
}: {
  token: PortfolioRowToken;
  onPress: () => void;
  denominationCurrency: string;
}): JSX.Element {
  const testID = `portfolio_row_${token.id}`;

  return (
    <ThemedTouchableOpacityV2
      onPress={onPress}
      dark={tailwind("bg-mono-dark-v2-00")}
      light={tailwind("bg-mono-light-v2-00")}
      style={tailwind("px-5 py-4.5 rounded-lg-v2 mt-2 border-0")}
      testID={testID}
    >
      <View style={tailwind("flex flex-row items-start")}>
        <View style={tailwind("w-7/12 flex-row items-center")}>
          <TokenIcon testID={`${testID}_icon`} token={token} size={36} />
          <TokenNameText
            displaySymbol={token.displaySymbol}
            name={token.name}
            testID={testID}
          />
        </View>
        <View
          style={tailwind("w-5/12 flex-row justify-end", {
            "pt-0.5": Platform.OS === "android",
          })}
        >
          <TokenAmountText
            tokenAmount={token.amount}
            usdAmount={token.usdAmount}
            testID={testID}
            denominationCurrency={denominationCurrency}
          />
        </View>
      </View>
    </ThemedTouchableOpacityV2>
  );
}

function getEmptyScreenDetails(type?: ButtonGroupTabKey): {
  icon: () => JSX.Element;
  title: string;
  subtitle: string;
} {
  switch (type) {
    case ButtonGroupTabKey.Crypto:
      return {
        icon: EmptyCryptoIcon,
        title: translate("components/EmptyPortfolio", "No crypto found"),
        subtitle: translate(
          "components/EmptyPortfolio",
          "Add crypto to get started"
        ),
      };
    case ButtonGroupTabKey.LPTokens:
      return {
        icon: EmptyLPTokenIcon,
        title: translate("components/EmptyPortfolio", "No LP tokens found"),
        subtitle: translate(
          "components/EmptyPortfolio",
          "Add liquidity to get started"
        ),
      };
    case ButtonGroupTabKey.dTokens:
      return {
        icon: EmptyDTokenIcon,
        title: translate("components/EmptyPortfolio", "No dTokens found"),
        subtitle: translate(
          "components/EmptyPortfolio",
          "Mint dTokens to get started"
        ),
      };
    case ButtonGroupTabKey.AllTokens:
    default:
      return {
        icon: EmptyPortfolioIcon,
        title: translate("components/EmptyPortfolio", "Empty portfolio"),
        subtitle: translate(
          "components/EmptyPortfolio",
          "Add DFI and other tokens to get started"
        ),
      };
  }
}

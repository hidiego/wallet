import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react-native";
import { RootState } from "@store";
import { block } from "@store/block";
import { StoreServiceProvider } from "@contexts/StoreServiceProvider";
import { ServiceProviderPersistence } from "@api/wallet/service_provider";
import { WhaleProvider } from "@shared-contexts/WhaleContext";
import { HeaderTitle } from "./HeaderTitle";

jest.mock("@shared-contexts/ThemeProvider");
jest.mock("@shared-contexts/NetworkContext");
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));

describe("Header title", () => {
  it("should match snapshot for Status", () => {
    const initialState: Partial<RootState> = {
      block: {
        count: 2000,
        masternodeCount: 10,
        lastSuccessfulSync: "Tue, 14 Sep 2021 15:37:10 GMT",
        connected: true,
        isPolling: true,
      },
    };
    const store = configureStore({
      preloadedState: initialState,
      reducer: { block: block.reducer },
    });
    const component = (
      <Provider store={store}>
        <StoreServiceProvider api={ServiceProviderPersistence}>
          <WhaleProvider>
            <HeaderTitle
              text="Foo"
              subHeadingType="Status"
              onPress={jest.fn()}
              disabled={false}
            />
          </WhaleProvider>
        </StoreServiceProvider>
      </Provider>
    );
    const rendered = render(component);
    expect(rendered.toJSON()).toMatchSnapshot();
  });

  it("should match snapshot for NetworkSelect", () => {
    const rendered = render(
      <HeaderTitle
        text="Foo"
        subHeadingType="NetworkSelect"
        onPress={jest.fn()}
        disabled={false}
      />
    );
    expect(rendered.toJSON()).toMatchSnapshot();
  });
});

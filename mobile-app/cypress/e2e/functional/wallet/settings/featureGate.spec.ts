import { EnvironmentNetwork } from "../../../../../../shared/environment";

context("Wallet - Feature Gate", () => {
  const flags = [
    {
      id: "future_swap",
      name: "Future swap",
      stage: "beta",
      version: ">=0.0.0",
      description: "Browse loan tokens provided by DeFiChain",
      networks: [
        EnvironmentNetwork.LocalPlayground,
        EnvironmentNetwork.RemotePlayground,
      ],
      platforms: ["ios", "android", "web"],
    },
    {
      id: "foo",
      name: "foo",
      stage: "public",
      version: ">=0.0.0",
      description: "foo",
      networks: [
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
      ],
      platforms: ["ios", "android", "web"],
    },
    {
      id: "setting_v2",
      name: "setting_v2",
      stage: "public",
      version: ">=0.0.0",
      description: "setting_v2",
      networks: [
        EnvironmentNetwork.RemotePlayground,
        EnvironmentNetwork.LocalPlayground,
      ],
      platforms: ["ios", "android", "web"],
    },
  ];

  beforeEach(() => {
    cy.createEmptyWallet(true);
    cy.intercept("**/settings/flags", {
      statusCode: 200,
      body: flags,
    });
    cy.getByTestID("bottom_tab_portfolio").click();
    cy.getByTestID("header_settings").click();
    cy.getByTestID("setting_navigate_About").click();
    cy.getByTestID("try_beta_features").click();
  });

  flags.forEach((item) => {
    it(`should be able to check ${item.name} features`, () => {
      if (item.stage === "beta") {
        cy.getByTestID(`feature_${item.id}_row`).should("exist");
        cy.getByTestID(`feature_${item.id}_switch`)
          .click()
          .should(() => {
            expect(localStorage.getItem("WALLET.ENABLED_FEATURES")).to.eq(
              `["${item.id}"]`
            );
          });

        cy.getByTestID(`feature_${item.id}_switch`)
          .click()
          .should(() => {
            expect(localStorage.getItem("WALLET.ENABLED_FEATURES")).to.eq("[]");
          });
      } else {
        cy.getByTestID(`feature_${item.id}_row`).should("not.exist");
      }
    });
  });
});

describe("Button", () => {
  it("should be displayed and clickable", () => {
    // Navigate to the page that contains the button
    cy.visit("/");

    // Find the button element
    cy.get("button")
      // Assert that the button is visible
      .should("be.visible")
      // Click the button
      .click()
      // Assert that the button was clicked
      .should("be.clicked");
  });
});

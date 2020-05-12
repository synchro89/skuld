import RouterFactory from "../router";

test("Test Router Application instance", () => {
  const Router = RouterFactory.create({
    basePath: "/",
  });

  expect(Router).toBeDefined();
});

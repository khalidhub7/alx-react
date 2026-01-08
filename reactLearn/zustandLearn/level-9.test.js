// ZUSTAND MASTERY — LEVEL 9 PRACTICE
// use only Level 9 learned concepts (testing & debugging)
// testing target: level-5.jsx (eCommerce async store)
/*
ZUSTAND — testing & debugging design patterns:

- test store logic only (no React, no components)
- use getState / setState as the public API
- store-as-pure-logic mindset
- initial state snapshot & reset pattern
- action-centric testing (not implementation details)
- predictable async state (loading / success / error)
- race condition protection validation
- optimistic update + rollback safety
- error-first state design (no console-driven logic)
- full store reset & isolation between tests
- production-safety & confidence-driven debugging
*/

import { use } from "react";
import useStore from "./level-5";

// backup store (reset store between tests)
let initialState;
const testProducts = [
  { id: 2, name: "mouse", price: 20 },
  { id: 3, name: "keyboard", price: 50 },
];

describe("LEVEL 9 — Store Safety & Predictability", () => {
  beforeEach(() => {
    initialState = useStore((s) => s); // backup
  });

  afterEach(() => {
    useStore.setState(initialState, true); // restore
  });

  // async action testing
  it("adds item to cart correctly", async () => {
    const selectAddItem = useStore((s) => s.addToCart);
    await selectAddItem(testProducts[0]);

    const selectCartList = useStore((s) => s.cartItems);
    expect(selectAddItem.length).toBe(1);
    expect(selectCartList[0].id).toBe(2);
  });

  // async loading state testing
  it("sets loadingProducts=true when fetch starts", async () => {
    const selectProductsFetcher = useStore((s) => s.fetchProducts);
    // intentionally not awaited
    selectProductsFetcher();
    const loadingState = useStore((s) => s.loadingProducts);
    expect(loadingState).toBe(true);
  });

  // async success path (happy path)
  it("stores products on successful fetch", async () => {
    // assume products fetched with success
    const testState = {
      products: [testProducts[0]],
      loadingProducts: false,
      productError: null,
    };
    useStore.setState(testState);

    const selectProducts = useStore((s) => s.products);
    const selectProductError = useStore((s) => s.productError);
    const selectLoadingProducts = useStore((s) => s.loadingProducts);

    // assertions
    expect({
      product: selectProducts,
      loadingProducts: selectLoadingProducts,
      productError: selectProductError,
    }).toEqual(testState);
  });

  // async err path (unhappy path)
  it("sets error when fetch fails", async () => {
    // assume products fetched with fail
    const testState = {
      products: null,
      loadingProducts: false,
      productError: "internal server error",
    };
    useStore.setState(testState);

    const selectProducts = useStore((s) => s.products);
    const selectProductError = useStore((s) => s.productError);
    const selectLoadingProducts = useStore((s) => s.loadingProducts);

    // assertions
    expect({
      product: selectProducts,
      loadingProducts: selectLoadingProducts,
      productError: selectProductError,
    }).toEqual(testState);
  });

  // race condition protection testing
  it("ignores outdated fetch responses", async () => {
    // TODO:
    // - trigger fetchProducts twice
    // - resolve first request LAST
    // - expect store to keep latest response only

    const testStateOne = {
      products: testProducts[0],
      loadingProducts: false,
      productError: null,
    };
    const testStateTwo = {
      products: testProducts[1],
      loadingProducts: false,
      productError: null,
    };

    // lets mock res 1 and res 2
    useStore.setState(testStateOne);
    useStore.setState(testStateTwo);

    const selectProducts = useStore((s) => s.products);
    const selectProductError = useStore((s) => s.productError);
    const selectLoadingProducts = useStore((s) => s.loadingProducts);

    // assertions
    expect({
      product: selectProducts,
      loadingProducts: selectLoadingProducts,
      productError: selectProductError,
    }).toEqual(testStateTwo);
  });

  // optimistic update success
  it("keeps cart item if server succeeds", async () => {
    // TODO:
    // - mock POST /api/cart success
    // - call addToCart
    // - expect item to stay in cart

    useStore.setState({ cartItems: [testProducts[0]] });

    const selectAddToCart = useStore((s) => s.addToCart);
    // intentionally not awaited
    const triggerAdd = selectAddToCart(testProducts[0]); // post
    // here the qty should increase immediately without wait for api res
    expect(useStore.getState().cartItems[0].quantity).toBe(2);

    // ensure the AddToCart finished
    await triggerAdd;
    // no rollback so the qty should be the same
    expect(useStore.getState().cartItems[0].quantity).toBe(2);
  });

  // optimistic update - rollback

  it("rolls back cart when server fails", async () => {
    // TODO:
    // - mock POST /api/cart failure
    // - call addToCart
    // - expect cartItems restored to previous state
  });

  // reset / logout safety

  it("resets store correctly on logout", () => {
    // TODO:
    // - mutate store (cart + products)
    // - call logout
    // - expect store equals initial state

    useStore();
  });
});

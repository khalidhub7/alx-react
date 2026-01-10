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

import useStore from "./level-5";

// backup store (reset store between tests)
let initialState;
const testProducts = [
  { id: 2, name: "mouse", price: 20 },
  { id: 3, name: "keyboard", price: 50 },
];

describe("test level-5.jsx learning file", () => {
  beforeAll(() => {
    initialState = useStore.getState(); // backup
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    useStore.setState(initialState, true); // restore
    if (global.fetch?.mockClear) {
      global.fetch.mockClear();
    }
  });

  // async action testing
  it("adds item to cart correctly", async () => {
    const selectAddItem = useStore.getState().addToCart;
    await selectAddItem(testProducts[0]);

    const selectCartList = useStore.getState().cartItems;
    expect(selectCartList.length).toBe(1);
    expect(selectCartList[0].id).toBe(2);
  });

  // async loading state testing
  it("sets loadingProducts=true when fetch starts", async () => {
    const selectProductsFetcher = useStore.getState().fetchProducts;
    // intentionally not awaited

    global.fetch = jest.fn(
      () => new Promise((res) => setTimeout(() => res({}), 0)),
    );
    selectProductsFetcher();
    const loadingState = useStore.getState().loadingProducts;
    expect(loadingState).toBe(true);
  });

  // async success path (happy path)
  it("stores products on successful fetch", async () => {
    // mocks

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testProducts),
      }),
    );

    await useStore.getState().fetchProducts();

    const expectedState = {
      products: testProducts,
      loadingProducts: false,
      productError: null,
    };

    const { products, productError, loadingProducts } = useStore.getState();

    // assertions
    expect({ products, loadingProducts, productError }).toEqual(expectedState);
  });

  // async err path (unhappy path)
  it("sets error when fetch fails", async () => {
    // mocks

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(new Error("internal server error")),
      }),
    );

    await useStore.getState().fetchProducts();

    const expectedState = {
      products: null,
      loadingProducts: false,
      productError: "internal server error",
    };

    const { products, productError, loadingProducts } = useStore.getState();

    // assertions
    expect({ products, loadingProducts, productError }).toEqual(expectedState);
  });

  // race condition protection testing
  it("ignores outdated fetch responses", async () => {
    /* 
    fetch 1   resolves late
    fetch 2   resolves early
    */

    // mock first result
    global.fetch = jest.fn(
      () =>
        new Promise((res) =>
          setTimeout(
            () => res({ json: () => Promise.resolve([testProducts[1]]) }),
            2000,
          ),
        ),
    );

    const selectFetchProducts = useStore.getState().fetchProducts;

    const firstFetch = selectFetchProducts(); // intentionally not awaited
    const firstReqId = useStore.getState().currentProductsRequestId;

    // mock second result
    global.fetch = jest.fn(
      () =>
        new Promise((res) =>
          setTimeout(
            () => res({ json: () => Promise.resolve([testProducts[0]]) }),
            200,
          ),
        ),
    );
    const secondFetch = selectFetchProducts(); // intentionally not awaited
    const secondReqId = useStore.getState().currentProductsRequestId;

    await Promise.all([firstFetch, secondFetch]);

    const { products } = useStore.getState();
    expect(firstReqId !== secondReqId).toBe(true); // diff Ids
    expect(products.length).toBe(1);
    expect(products[0].id).toBe(2); // expected data
  });

  // optimistic update success
  it("keeps cart item if server succeeds", async () => {
    // add 1 product with qty 1
    useStore.setState({ cartItems: [testProducts[0]] });
    const selectAddToCart = useStore.getState().addToCart;
    // intentionally not awaited

    global.fetch = jest.fn(
      () => new Promise((res) => setTimeout(() => res({ ok: true }), 100)),
    );

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
    // add 1 product with qty 1
    useStore.setState({ cartItems: [testProducts[0]] });
    const selectAddToCart = useStore.getState().addToCart;

    // mock
    global.fetch = jest.fn(
      () => new Promise((res) => setTimeout(() => res({ ok: false }), 100)),
    );
    // intentionally not awaited
    const triggerAdd = selectAddToCart(testProducts[0]); // post

    // here the qty should increase immediately without wait for api res
    expect(useStore.getState().cartItems[0].quantity).toBe(2);

    // ensure the AddToCart finished
    await triggerAdd;
    // rollback should reset state and qty decreased
    expect(useStore.getState().cartItems[0].quantity).toBe(1);
  });

  // reset / logout safety

  it("resets store correctly on logout", () => {
    const selectLogout = useStore.getState().logout;
    selectLogout();

    const curState = useStore.getState();
    expect(curState).toEqual(initialState);
  });
});

// what i learn
// Mock the world. Test your brain.
// world like: fetch or External things, brain: my own logic

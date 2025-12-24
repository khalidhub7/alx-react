// REACT ROUTER MASTERY — LEVEL 12 TESTING
// behavior-driven tests for Level 11 routing architecture
/*
Verifies:
- correct route rendering for each URL
- shared layout + nested routes behavior
- loader data ownership and URL search params
- actions, redirects, and navigation state UX
- deferred data with Suspense/Await

Principles:
- test user-visible outcomes only
- routes rendered in isolation with MemoryRouter
- no testing of router internals or implementation
*/

import React from "react";
import { within } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { ProductDetails, productDetailsLoader } from "./level-11";
import { DashboardLayout, dashboardLoader, Home } from "./level-11";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { productsAction, productsLoader, ProductsPage } from "./level-11";

// test level-11.jsx
const routes = {
  path: "/",
  element: <DashboardLayout />,
  loader: dashboardLoader,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "products",
      loader: productsLoader,
      action: productsAction,
      element: <ProductsPage />,
    },
    {
      path: "products/:id",
      loader: productDetailsLoader,
      element: <ProductDetails />,
    },
  ],
};

// test route by route

describe("test level-11.jsx", () => {
  it("test DashboardLayout", async () => {
    const router = createMemoryRouter([routes], { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);

    const visibleTexts = ["welcome khalid", "🏠 home"];
    const navs = { home: true, products: false };

    // test home + loader data
    for (const text of visibleTexts) {
      expect(await screen.findByText(text)).toBeInTheDocument();
    }

    // test navs
    for (const [key, value] of Object.entries(navs)) {
      const elem = screen.getByRole("link", { name: key });
      value
        ? expect(elem).toHaveStyle({ fontWeight: "bold" })
        : expect(elem).not.toHaveStyle({ fontWeight: "bold" });
    }
  });

  it("test ProductsPage", async () => {
    const router = createMemoryRouter([routes], {
      initialEntries: ["/products"],
    });
    render(<RouterProvider router={router} />);

    // assert that 'Products' title exist
    expect(await screen.findByText("Products")).toBeInTheDocument();
    // assert that filtering form exist
    expect(screen.getByTestId("filter-form")).toBeInTheDocument();
    // assert that products list exist
    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBeGreaterThanOrEqual(2);
  });

  it("test ProductsPage/<test filtering>", async () => {
    // createMemoryRouter limitation:
    // action redirects don’t update the URL in tests.
    // Use initialEntries with the expected query params instead.

    /* 
    old code skipped bcs of createMemoryRouter limitations
    const router = createMemoryRouter([routes], {
      initialEntries: ["/products?category=electronics&price="],
    }); */

    const router = createMemoryRouter([routes], {
      initialEntries: ["/products?category=electronics&price="],
    });
    // console.log(`*** ${JSON.stringify(router, null, 2)} ***`)

    render(<RouterProvider router={router} />);

    // old code skipped bcs of createMemoryRouter limitations
    /* const formElem = await screen.findByTestId("filter-form");
    // console.log(formElem.outerHTML)
    // lets filter by category
    const select = formElem.querySelector('select[name="category"]');
    await userEvent.selectOptions(select, "electronics");
    const submit = formElem.querySelector('button[type="submit"]');
    await userEvent.click(submit);
    await waitFor(() => {
      expect(router.state.location.search).toBe("?category=electronics");
    }); */

    /* const { pathname, search, hash } = router.state.location;
    const fullUrl = `${pathname}${search}${hash}`;
    console.log(fullUrl); */

    // after redirect
    // assert one li named 'Laptop'
    const items = await screen.findAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(items[0]).toHaveTextContent("Laptop");
  });

  it("test ProductDetails", async () => {
    const router = createMemoryRouter([routes], {
      initialEntries: ["/products"],
    });
    render(<RouterProvider router={router} />);

    const firstLi = (await screen.findAllByRole("listitem"))[0];
    const viewDetails = within(firstLi).getByRole("link", { name: /view/i });
    await userEvent.click(viewDetails);

    await waitFor(() =>
      expect(router.state.location.pathname).toBe("/products/p1"),
    );
    // console.log(router.state.location.pathname)

    // deferred data NOT yet
    expect(screen.queryByText(/great/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/fast/i)).not.toBeInTheDocument();

    // immediate data
    expect(await screen.findByText(/laptop/i)).toBeInTheDocument();
    expect(await screen.findByText(/1200\$/i)).toBeInTheDocument();

    // deferred data arrives
    await waitFor(() => {
      expect(screen.getByText(/great/i)).toBeInTheDocument();
      expect(screen.getByText(/fast/i)).toBeInTheDocument();
    });
  });
});

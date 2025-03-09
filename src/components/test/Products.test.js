import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Products from "../components/Products"; // Adjust the import path
import { rest } from "msw";
import { setupServer } from "msw/node";

// Mock API server
const server = setupServer(
  rest.post("http://localhost:5000/api/products/chats", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: "1",
          Title: "Test Product",
          Body: "This is a test product",
          "Image Src": "/image/tshirt.webp",
          "Variant Price": "10",
          Type: "Clothing",
        },
      ])
    );
  }),

  rest.get("http://localhost:5000/api/cart", (req, res, ctx) => {
    return res(ctx.json({ cart: [] }));
  }),

  rest.post("http://localhost:5000/api/cart", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "Item added successfully" }));
  })
);

// Start the mock server before running tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Products Component", () => {
  test("renders correctly", async () => {
    render(<Products />);

    expect(screen.getByText("Welcome to Our Store")).toBeInTheDocument();
    expect(screen.getByText("All Products")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
  });

  test("displays products from API", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("This is a test product")).toBeInTheDocument();
      expect(screen.getByText("$ 10")).toBeInTheDocument();
    });
  });

  test("handles API errors", async () => {
    server.use(
      rest.post("http://localhost:5000/api/products/chats", (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: "Failed to fetch products" }));
      })
    );

    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch products")).toBeInTheDocument();
    });
  });

  test("adds product to cart", async () => {
    render(<Products />);

    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    await waitFor(() => {
      expect(screen.getByText("Item added successfully!")).toBeInTheDocument();
    });
  });
});

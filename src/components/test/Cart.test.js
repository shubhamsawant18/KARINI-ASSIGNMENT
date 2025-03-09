import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Cart from "../app/components/Cart";
import "@testing-library/jest-dom";
import Cookies from "js-cookie";

// Mock the token in Cookies
jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

// Mock API responses
const mockCartItems = [
  {
    _id: "1",
    productId: {
      _id: "p1",
      Title: "Test Product 1",
      Body: "Test description",
      "Image Src": "https://via.placeholder.com/150",
      "Variant Price": "499",
    },
  },
  {
    _id: "2",
    productId: {
      _id: "p2",
      Title: "Test Product 2",
      Body: "Another description",
      "Image Src": "https://via.placeholder.com/150",
      "Variant Price": "999",
    },
  },
];

// Mock API server
const server = setupServer(
  rest.get("http://localhost:5000/api/cart", (req, res, ctx) => {
    return res(ctx.json(mockCartItems));
  }),

  rest.delete("http://localhost:5000/api/cart/:id", (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

// Start the server before all tests
beforeAll(() => server.listen());

// Close the server after all tests
afterAll(() => server.close());

// Reset handlers after each test to avoid test interference
afterEach(() => server.resetHandlers());

describe("Cart Component", () => {
  beforeEach(() => {
    Cookies.get.mockReturnValue("mocked-token"); // Mock user login
  });

  test("renders loading state initially", () => {
    render(<Cart />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays cart items when API fetch is successful", async () => {
    render(<Cart />);
    
    // Wait for the cart items to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });

    // Check that the price is displayed
    expect(screen.getByText(/₹499/i)).toBeInTheDocument();
    expect(screen.getByText(/₹999/i)).toBeInTheDocument();
  });

  test("handles empty cart scenario", async () => {
    server.use(
      rest.get("http://localhost:5000/api/cart", (req, res, ctx) => {
        return res(ctx.json([])); // Empty cart response
      })
    );

    render(<Cart />);
    
    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  test("removes an item from the cart", async () => {
    render(<Cart />);

    // Wait for items to load
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    // Click the remove button
    const removeButton = screen.getAllByText(/remove/i)[0];
    userEvent.click(removeButton);

    // Wait for item removal
    await waitFor(() => {
      expect(screen.queryByText("Test Product 1")).not.toBeInTheDocument();
    });
  });

  test("shows an error message if fetching cart fails", async () => {
    server.use(
      rest.get("http://localhost:5000/api/cart", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Cart />);
    
    await waitFor(() => {
      expect(screen.getByText(/failed to load cart items/i)).toBeInTheDocument();
    });
  });

  test("shows an error message if removing an item fails", async () => {
    server.use(
      rest.delete("http://localhost:5000/api/cart/:id", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<Cart />);
    
    await waitFor(() => {
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    });

    // Click the remove button
    const removeButton = screen.getAllByText(/remove/i)[0];
    userEvent.click(removeButton);

    // Check for the error message
    await waitFor(() => {
      expect(screen.getByText(/failed to remove item/i)).toBeInTheDocument();
    });
  });
});

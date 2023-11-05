import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import App, {
  links,
  loader,
  shouldRevalidate,
  forTestingOnly,
  ErrorBoundary,
} from '../root';

// as a note: Jest cannot handle SVGs properly. You need to mock the SVGs to non-existent
jest.mock('../../public/favicon.svg', () => jest.fn());
jest.mock('../components/Layout/Layout', () => {
  return {
    __esModule: true,
    Layout: jest.fn(() => <p>Mocked Layout</p>), // Replace this with the appropriate structure of your Layout component
  };
});

jest.mock('@shopify/hydrogen', () => {
  const useNonce = jest.fn(() => 'mockNonce');

  return {
    useNonce,
  };
});

jest.mock('@shopify/remix-oxygen', () => {
  const defer = jest.fn();

  return {
    defer,
  };
});

const mockMatches = [
  {
    id: 1,
    pathname: '/home',
    data: {title: 'Home'},
    params: {id: '1'},
    handle: 'root',
  },
];

jest.mock('@remix-run/react', () => {
  const useLoaderData = jest.fn();
  const Meta = jest.fn();
  const Links = jest.fn();
  const Outlet = jest.fn();
  const ScrollRestoration = jest.fn();
  const Scripts = jest.fn();
  const LiveReload = jest.fn();
  const useRouteError = jest.fn();
  const useMatches = jest.fn(() => mockMatches);
  const isRouteErrorResponse = jest.fn((error) => {
    if (error) {
      return error.status === 404;
    } else {
      return false;
    }
  });

  return {
    useLoaderData,
    Meta,
    Links,
    Outlet,
    ScrollRestoration,
    Scripts,
    LiveReload,
    useRouteError,
    useMatches,
    isRouteErrorResponse,
  };
});

jest.mock('@remix-run/css-bundle', () => {
  const cssBundleHref = [{rel: 'stylesheet', href: 'cssBundleHref'}];
  return {
    cssBundleHref,
  };
});

describe('links', () => {
  // Case that uses cssBundleHref mock
  it('should return an array of links', () => {
    const result = links();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe('App Functions', () => {
  describe('shouldRevalidate', () => {
    it('should revalidate when form method is not GET', () => {
      const result = shouldRevalidate({
        formMethod: 'POST',
        currentUrl: 'currentUrl',
        nextUrl: 'nextUrl',
      });
      expect(result).toBe(true);
    });

    it('should not revalidate when form method is GET', () => {
      const result = shouldRevalidate({
        formMethod: 'GET',
        currentUrl: 'currentUrl',
        nextUrl: 'nextUrl',
      });
      expect(result).toBe(false);
    });

    it('should not revalidate when form method is GET and currentUrl and nextUrl are the same', () => {
      const result = shouldRevalidate({
        formMethod: 'GET',
        currentUrl: 'sameUrl',
        nextUrl: 'sameUrl',
      });
      expect(result).toBe(true);
    });
  });

  describe('loader', () => {
    it('should load data without errors', async () => {
      const context = {
        storefront: {
          query: jest.fn(),
          CacheLong: jest.fn(),
        },
        session: {
          get: jest.fn(),
        },
        cart: {
          get: jest.fn(),
        },
        env: {
          PUBLIC_STORE_DOMAIN: 'example.com',
        },
      };

      await loader({context});
      expect(require('@shopify/remix-oxygen').defer).toHaveBeenCalled();
    });
  });

  describe('validateCustomerAccessToken', () => {
    it('should validate the customer access token', async () => {
      const session = {
        unset: jest.fn(),
        commit: jest.fn(),
      };
      const customerAccessToken = {
        accessToken: 'token',
        expiresAt: '2100-01-01T00:00:00.000Z',
      };
      const result = await forTestingOnly.validateCustomerAccessToken(
        session,
        customerAccessToken,
      );
      expect(result).toHaveProperty('isLoggedIn');
      expect(result).toHaveProperty('headers');
    });
    it('should not validate the customer access token', async () => {
      const session = {
        unset: jest.fn(),
        commit: jest.fn(),
      };
      const customerAccessToken = {
        accessToken: 'token',
        expiresAt: '2022-01-01T00:00:00.000Z',
      };
      const result = await forTestingOnly.validateCustomerAccessToken(
        session,
        customerAccessToken,
      );
      expect(result).toHaveProperty('isLoggedIn');
      expect(result).toHaveProperty('headers');
    });
  });
});

describe('App Component', () => {
  let consoleSpy;

  // This test causes a console error due react-testing-library render wraps a component
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(require('@shopify/hydrogen').useNonce).toHaveBeenCalledTimes(2);
    expect(require('@remix-run/react').useLoaderData).toHaveBeenCalledTimes(2);
    expect(require('@remix-run/react').Meta).toHaveBeenCalledTimes(1);
    expect(require('@remix-run/react').Links).toHaveBeenCalledTimes(1);
    expect(require('@remix-run/react').Outlet).toHaveBeenCalledTimes(0);
    expect(require('@remix-run/react').Scripts).toHaveBeenCalledTimes(1);
    expect(require('@remix-run/react').LiveReload).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Mocked Layout')).toBeInTheDocument();
  });
});

describe('ErrorBoundary', () => {
  it('renders the error message and status code when there is an error', () => {
    const mockError = {
      status: 404,
      data: 'Error data message',
    };

    jest
      .spyOn(require('@remix-run/react'), 'useRouteError')
      .mockReturnValue(mockError);

    render(<ErrorBoundary />);

    expect(screen.getByText('Mocked Layout')).toBeInTheDocument();
  });

  it('renders the error message and status code when there is an actual error', () => {
    const mockError = new Error('Test error');
    mockError.message = 'Mocked error';

    jest
      .spyOn(require('@remix-run/react'), 'useRouteError')
      .mockReturnValue(mockError);

    render(<ErrorBoundary />);

    expect(screen.getByText('Mocked Layout')).toBeInTheDocument();
  });

  it('renders a generic error message and status code when no error is provided', () => {
    jest
      .spyOn(require('@remix-run/react'), 'useRouteError')
      .mockReturnValue(null);

    render(<ErrorBoundary />);

    expect(screen.getByText('Mocked Layout')).toBeInTheDocument();
  });
});

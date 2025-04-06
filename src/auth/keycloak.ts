// Keycloak authentication service
import {toast} from "@/components/ui/use-toast";

// Replace these values with your actual Keycloak configuration
const KEYCLOAK_URL = "http://localhost:9090";
const KEYCLOAK_REALM = "restaurant-review";
const KEYCLOAK_CLIENT_ID = "restaurant-review";
interface KeycloakToken {
  token: string;
  refreshToken: string;
  expiresAt: number;
}

interface KeycloakUser {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: string[];
}

// Store token in localStorage
const storeToken = (token: KeycloakToken) => {
  localStorage.setItem('keycloak_token', JSON.stringify(token));
};

// Get token from localStorage
const getStoredToken = (): KeycloakToken | null => {
  const storedToken = localStorage.getItem('keycloak_token');
  if (!storedToken) return null;

  try {
    return JSON.parse(storedToken);
  } catch (e) {
    console.error('Error parsing stored token:', e);
    return null;
  }
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('keycloak_token');
};

// Check if token is expired
const isTokenExpired = (token: KeycloakToken): boolean => {
  return token.expiresAt < Date.now();
};

// Parse user info from token
const parseUserInfo = (token: string | undefined): KeycloakUser | null => {
  if (!token || typeof token !== 'string') {
    console.error('Invalid or missing idToken:', token);
    return null;
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('Invalid JWT format - expected 3 parts:', token);
      return null;
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
    );

    const payload = JSON.parse(jsonPayload);

    return {
      id: payload.sub,
      username: payload.name || payload.email,
      email: payload.email,
      firstName: payload.given_name,
      lastName: payload.family_name,
      roles: payload.realm_access?.roles || []
    };
  } catch (e) {
    console.error('Error parsing user info from token:', e);
    return null;
  }
};
// Login function
export const login = async (username: string, password: string): Promise<KeycloakUser | null> => {
  try {
    const response = await fetch(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'restaurant-review',
        grant_type: 'password',
        username,
        password
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_description || 'Login failed');
    }

    const data = await response.json();

    const tokenData: KeycloakToken = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    storeToken(tokenData);

    return parseUserInfo(data.access_token);
  } catch (error) {
    console.error('Login error:', error);
    toast({
      title: "Login Failed",
      description: error instanceof Error ? error.message : "An error occurred during login",
      variant: "destructive",
    });
    return null;
  }
};

// Register function (redirects to Keycloak registration page)
export const register = () => {
  const redirectUri = encodeURIComponent(window.location.origin);
  // Use 'registrations' instead of 'auth'
  window.location.href = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/registrations?client_id=${KEYCLOAK_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=openid`;
};
// Logout function
export const logout = async (): Promise<boolean> => {
  try {
    const token = getStoredToken();
    if (!token) return true;

    const response = await fetch(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: KEYCLOAK_CLIENT_ID,
        refresh_token: token.refreshToken,
      }),
    });

    removeToken();
    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    removeToken(); // Still remove token on error
    return false;
  }
};

// Get current user
export const getCurrentUser = (): KeycloakUser | null => {
  const token = getStoredToken();
  if (!token || isTokenExpired(token)) {
    removeToken();
    return null;
  }

  return parseUserInfo(token.token);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getStoredToken();
  return !!token && !isTokenExpired(token);
};

// Refresh token
export const refreshToken = async (): Promise<boolean> => {
  const token = getStoredToken();
  if (!token) return false;

  try {
    const response = await fetch(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: KEYCLOAK_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });

    if (!response.ok) {
      removeToken();
      return false;
    }

    const data = await response.json();

    const newToken: KeycloakToken = {
      token: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };

    storeToken(newToken);
    return true;
  } catch (error) {
    console.error('Token refresh error:', error);
    removeToken();
    return false;
  }
};

// Get auth header for API requests
export const getAuthHeader = (): Record<string, string> => {
  const token = getStoredToken();
  if (!token || isTokenExpired(token)) {
    return {};
  }

  return {
    Authorization: `Bearer ${token.token}`
  };
};

export type { KeycloakUser, KeycloakToken };

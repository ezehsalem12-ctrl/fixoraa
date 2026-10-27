import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "provider";
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface SavedSession {
  token: string;
  user: User;
}

const SESSION_STACK_KEY = "fixora-session-stack";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  role?: "customer" | "provider";
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/register", userData);

  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/user/login", credentials);

  return response.data;
};

export const getMe = async () => {
  const response = await api.get<{ user: User }>("/user/me");

  return response.data;
};

/**
 * Save the currently active session before switching accounts.
 */
export const saveCurrentSession = () => {
  const token = localStorage.getItem("token");
  const userValue = localStorage.getItem("user");

  if (!token || !userValue) {
    return;
  }

  try {
    const user = JSON.parse(userValue) as User;

    const savedValue = localStorage.getItem(SESSION_STACK_KEY);
    const sessions: SavedSession[] = savedValue ? JSON.parse(savedValue) : [];

    // Avoid saving the same active account twice in a row.
    const lastSession = sessions[sessions.length - 1];

    if (lastSession?.token !== token) {
      sessions.push({ token, user });
      localStorage.setItem(SESSION_STACK_KEY, JSON.stringify(sessions));
    }
  } catch (error) {
    console.error("Could not save the previous session:", error);
    throw error;
  }
};

/**
 * Restore the previous session if one exists.
 * Returns true when a session was restored.
 */
export const restorePreviousSession = (): boolean => {
  const savedValue = localStorage.getItem(SESSION_STACK_KEY);

  if (!savedValue) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }

  try {
    const sessions: SavedSession[] = JSON.parse(savedValue);
    const previousSession = sessions.pop();

    if (!previousSession) {
      localStorage.removeItem(SESSION_STACK_KEY);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return false;
    }

    localStorage.setItem("token", previousSession.token);
    localStorage.setItem("user", JSON.stringify(previousSession.user));

    if (sessions.length > 0) {
      localStorage.setItem(SESSION_STACK_KEY, JSON.stringify(sessions));
    } else {
      localStorage.removeItem(SESSION_STACK_KEY);
    }

    return true;
  } catch (error) {
    console.error("Could not restore the previous session:", error);
    localStorage.removeItem(SESSION_STACK_KEY);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
};

export const logoutUser = async (): Promise<boolean> => {
  try {
    await api.post("/user/logout");
  } catch (error) {
    // Continue logging out locally even if the server request fails.
    console.error("Logout request failed:", error);
  } finally {
    // Clear the active session.
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Do not restore another account after logout.
    localStorage.removeItem(SESSION_STACK_KEY);
  }

  return true;
};

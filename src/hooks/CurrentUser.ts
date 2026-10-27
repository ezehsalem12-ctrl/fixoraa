import { useQuery } from "@tanstack/react-query";
import { getMe, type User } from "../services/authService";

function useCurrentUser() {
  return useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      // Don't request the current user when there is no token.
      if (!localStorage.getItem("token")) {
        throw new Error("Not authenticated");
      }

      const response = await getMe();
      return response.user;
    },
    retry: false,
  });
}

export default useCurrentUser;

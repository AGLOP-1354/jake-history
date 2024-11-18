"use server";

import { getGuestToken } from "@/src/lib/utils/token";
import { handleLikeAction } from "@/src/lib/utils/queries/likeClientQueries";

const handleLike = async (historyId: string, isLiked: boolean) => {
  try {
    const guestToken = getGuestToken();

    if (!guestToken) {
      throw new Error("Guest token is not found");
    }

    await handleLikeAction(historyId, isLiked, guestToken);
  } catch (error) {
    console.error(error);
  }
};

export { handleLike };

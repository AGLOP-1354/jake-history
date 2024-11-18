import { revalidateTag } from "@/src/lib/actions/revalidTag";
import { createClient } from "../supabase/client";

export const handleLikeAction = async (historyId: string, isLiked: boolean, guestToken: string) => {
  const supabase = createClient();

  try {
    if (isLiked) {
      const { error } = await supabase.rpc("handle_unlike", {
        p_history_id: historyId,
        p_guest_token: guestToken,
      });

      if (error) throw error;
    } else {
      const { error } = await supabase.rpc("handle_like", {
        p_history_id: historyId,
        p_guest_token: guestToken,
      });

      if (error) throw error;
    }

    await revalidateTag("history-by-id");
  } catch (error) {
    console.error("Error handling like:", error);
  }
};

import { cookies } from "next/headers";
import { createClient } from "../supabase/server";

export const validateLike = async (historyId: string, guestToken: string) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data } = await supabase
      .from("like")
      .select()
      .eq("history_id", historyId)
      .eq("guest_token", guestToken)
      .single();
    return !!data;
  } catch (error) {
    console.error("Error validating like:", error);
    return { success: false, error };
  }
};

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";
import Constants from "expo-constants";

const { SUPABASE_OTOBOTX_URL, SUPABASE_OTOBOTX_ANON_KEY } = Constants.expoConfig?.extra?.supabase ?? {};

const supabaseUrl = SUPABASE_OTOBOTX_URL!;
const supabaseAnonKey = SUPABASE_OTOBOTX_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
export default supabase;

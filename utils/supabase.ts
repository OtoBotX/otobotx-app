import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const { SUPABASE_OTOBOTX_URL, SUPABASE_OTOBOTX_ANON_KEY } = Constants.expoConfig?.extra ?? {};

const supabaseUrl = SUPABASE_OTOBOTX_URL!;
const supabaseAnonKey = SUPABASE_OTOBOTX_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;

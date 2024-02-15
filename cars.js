import { createClient } from "@supabase/supabase-js";

const url = process.env.CARS_PROJECT_URL

const supabase = createClient(url, process.env.CARS_SUPABASE_KEY)

const { data, error } = await supabase
    .from('cars')
    .select('group')

export { data, error }
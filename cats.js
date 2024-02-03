import { createClient } from "@supabase/supabase-js";

const url = 'https://xascycknmjjbtibxctai.supabase.co'

const supabase = createClient(url, process.env.SUPABASE_KEY)

const { data, error } = await supabase
    .from('cats')
    .select('name')

export { data, error }
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ueecupbpxdgxxuyalzha.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZWN1cGJweGRneHh1eWFsemhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyOTMxNzMsImV4cCI6MjA3Nzg2OTE3M30.ecFnY_ksmRR1L3tBaNS9qL8vfmnqvnJGp6hYkzVSzq4'

export const supabase = createClient(supabaseUrl, supabaseKey)

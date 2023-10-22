import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        // Use Supabase to create a new user account
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            // Handle the error (e.g., duplicate email, weak password, etc.)
            res.redirect("/login?msg=Error "+error.message);
        } else {
            // User account successfully created
            // You can also log the user in here if needed
            res.redirect("/login?msg=Account created successfully");
        }
    } else {
        res.redirect("/");
    }
}

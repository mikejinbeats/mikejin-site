
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const payload = await req.json();

        // Extract fields, supporting both English and Portuguese inputs for flexibility
        const {
            firstName, lastName, email, phone, country, message, // English keys
            nome, contacto, mensagem // Portuguese keys fallback
        } = payload;

        // Normalization
        const dbName = firstName || nome || 'Sem Nome';
        const dbEmail = email || contacto;
        const dbMessage = message || mensagem || '';
        const dbPhone = phone || '';
        const dbCountry = country || '';

        // Construct full name if firstName and lastName are present
        const fullName = (firstName && lastName) ? `${firstName} ${lastName}` : dbName;

        // 1. Validation
        if (!dbEmail) {
            return new Response(
                JSON.stringify({ error: "Email/Contacto is required" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // 2. Save to Database (Table: 'contacts')
        // We use service role key to bypass RLS policies
        const { error: dbError } = await supabase
            .from('contacts')
            .insert({
                first_name: fullName, // Storing full name or first name in first_name column for simplicity
                email: dbEmail,
                phone: dbPhone,
                country: dbCountry,
                message: dbMessage,
                // If you have separate columns for last_name, you can map them, 
                // but here we ensure at least the main name is saved.
                // If the table strictly has first_name and last_name:
                last_name: lastName || ''
            });

        if (dbError) {
            console.error("Database Error:", dbError);
            return new Response(
                JSON.stringify({ error: "Failed to save to database", details: dbError }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        // 3. Send Email via Resend
        // We attempt to send the email. If it fails, we log it but don't fail the request 
        // because the data is already safely secured in the DB.
        if (RESEND_API_KEY) {
            try {
                await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "Mikejin Website <onboarding@resend.dev>",
                        to: ["mikejin.music@gmail.com"],
                        subject: `Novo Contacto: ${fullName}`,
                        html: `
              <h1>Novo Contacto Recebido</h1>
              <p><strong>Nome:</strong> ${fullName}</p>
              <p><strong>Email:</strong> ${dbEmail}</p>
              <p><strong>Telefone:</strong> ${dbPhone}</p>
              <p><strong>País:</strong> ${dbCountry}</p>
              <p><strong>Mensagem:</strong><br/>${dbMessage}</p>
              <hr/>
              <p><small>Este contacto foi guardado na base de dados.</small></p>
            `,
                    }),
                });
            } catch (emailError) {
                console.error("Email sending failed:", emailError);
                // We continue intentionally
            }
        } else {
            console.warn("RESEND_API_KEY key is missing.");
        }

        // 4. Return Success
        return new Response(JSON.stringify({ success: true, message: "Data saved successfully" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});

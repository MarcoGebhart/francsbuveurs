import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const SHOP = process.env.SHOPIFY_STORE;
const TOKEN = process.env.SHOPIFY_ADMIN_API_TOKEN;

// Créer un client Shopify
export async function createCustomer(email, firstName, lastName) {
  try {
    const res = await fetch(`https://${SHOP}/admin/api/2025-07/customers.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        customer: {
          first_name: firstName,
          last_name: lastName,
          email,
          verified_email: true,
          send_email_invite: true
        }
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("Erreur création client :", error);
    throw error;
  }
}

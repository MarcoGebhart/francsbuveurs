import { createCustomer } from "../shopify.js";

export async function handleOrderCreated(order) {
  const email = order.email;
  const firstName = order.billing_address?.first_name || order.customer?.first_name || "";
  const lastName = order.billing_address?.last_name || order.customer?.last_name || "";

  if (!email) {
    console.warn("Commande sans email, impossible de créer un compte client");
    return;
  }

  try {
    const customer = await createCustomer(email, firstName, lastName);
    console.log("Compte client créé :", customer);
  } catch (error) {
    console.log("Le client existe peut-être déjà ou erreur :", error.message);
  }
}

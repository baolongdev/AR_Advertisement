
export async function subscribeCustomerIo(email: String) {
  const resp = await fetch("https://track.customer.io/api/v1/forms/newsletter_form/submit", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${process.env.NEXT_PUBLIC_CUSTOMER_IO_FORM_AUTH}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "data" : {
        email,
        "newsletter_sub": "true"
      }
    })
  });
  return resp.ok;
}
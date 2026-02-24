const axios = require("axios");

async function runLoad() {
  const requests = [];

  for (let i = 0; i < 10; i++) {
    requests.push(
      axios.post("http://localhost:3000/api/v1/orders", {
        customerId: "ALFKI",
        employeeId: 3,
        freight: 8,
        address: "Bankova, 1",
        city: "Kyiv",
        country: "Ukraine",
        postalCode: "28910",
        productId: 90,
        quantity: 1,
      }),
    );
    console.log("Add");
  }

  await Promise.allSettled(requests);
  console.log("Done");
}

runLoad();

document.getElementById("addButton").addEventListener("click", async () => {
    const productLink = document.getElementById("productLink").value;
    const feedbackMessage = document.getElementById("feedbackMessage");
    const product_type = document.getElementById("category").value;

    try {
        const response = await fetch("/api/add-tracking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: productLink,
                product_type: product_type,
            }),
        });

        const result = await response.json();
        feedbackMessage.textContent = result.message;
        feedbackMessage.style.color = response.ok ? "green" : "red";
    } catch (error) {
        feedbackMessage.textContent = "An error occurred. Please try again.";
        feedbackMessage.style.color = "red";
    }
});
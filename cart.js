document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from storage
    const cartItemsContainer = document.getElementById("cart-items");
    
    // Correct way to select buttons (ensures they exist)
    const buttons = document.querySelectorAll(".add-to-cart");

    if (buttons.length === 0) {
        console.error("No 'Add to Cart' buttons found! Check HTML.");
        return;
    }

    console.log("Buttons found:", buttons); // Debugging check

    // Attach event listeners correctly
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const shoeName = document.querySelectorAll(".shoe h3")[index].innerText;
            const priceText = document.querySelectorAll(".shoe p")[index].innerText;
            const price = parseFloat(priceText.replace("Price: $", ""));

            // Check if item already exists in cart
            const existingItem = cart.find(item => item.name === shoeName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: shoeName, price: price, quantity: 1 });
            }

            updateCart();
            alert(`${shoeName} added to cart!`);
        });
    });

    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>
                        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
                    </td>
                    <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeItem(${index})">Remove</button></td>
                </tr>
            `;
        });

        cartItemsContainer.innerHTML += `
            <tr>
                <td colspan="3"><strong>Total:</strong></td>
                <td><strong>$${total.toFixed(2)}</strong></td>
                <td></td>
            </tr>
        `;

        localStorage.setItem("cart", JSON.stringify(cart)); // Save cart in storage
    }

    window.updateQuantity = function (index, quantity) {
        cart[index].quantity = parseInt(quantity);
        updateCart();
    };

    window.removeItem = function (index) {
        cart.splice(index, 1);
        updateCart();
    };

    updateCart(); // Initialize the cart on page load
});
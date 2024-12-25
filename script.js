// Function to handle form submission and generate the invoice
document.getElementById("invoiceForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the values from the form
    const customerName = document.getElementById("customerName").value;
    const customerAddress = document.getElementById("customerAddress").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemQuantity = parseFloat(document.getElementById("itemQuantity").value);
    const itemPrice = parseFloat(document.getElementById("itemPrice").value);
    const taxRate = parseFloat(document.getElementById("taxRate").value);
    const discount = parseFloat(document.getElementById("discount").value);

    // Calculate item total, tax, and final total
    const itemTotal = itemQuantity * itemPrice;
    const taxAmount = (itemTotal * taxRate) / 100;
    const totalBeforeDiscount = itemTotal + taxAmount;
    const finalTotal = totalBeforeDiscount - discount;

    // Create invoice details
    let invoiceHTML = `
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Address:</strong> ${customerAddress}</p>
        <h3>Item Details</h3>
        <table class="invoice-table">
            <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price per Unit</th>
                <th>Total</th>
            </tr>
            <tr>
                <td>${itemDescription}</td>
                <td>${itemQuantity}</td>
                <td>$${itemPrice.toFixed(2)}</td>
                <td>$${itemTotal.toFixed(2)}</td>
            </tr>
        </table>
        <h3>Calculations</h3>
        <p><strong>Tax (${taxRate}%):</strong> $${taxAmount.toFixed(2)}</p>
        <p><strong>Discount:</strong> -$${discount.toFixed(2)}</p>
        <h2>Total Amount: $${finalTotal.toFixed(2)}</h2>
    `;

    // Display the invoice
    document.getElementById("invoiceDetails").innerHTML = invoiceHTML;
    document.getElementById("invoiceSection").style.display = 'block';
});

// Function to print the invoice
document.getElementById("printBtn").addEventListener("click", function() {
    window.print();
});

// Function to download the invoice as PDF (using jsPDF)
document.getElementById("downloadBtn").addEventListener("click", function() {
    const doc = new jsPDF();

    const invoiceContent = document.getElementById("invoiceDetails").innerHTML;

    doc.html(invoiceContent, {
        callback: function (doc) {
            doc.save("invoice.pdf");
        }
    });
});

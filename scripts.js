function addNewRow() {
  const tbody = document.getElementById("itemsList");
  const newRow = document.createElement("tr");
  newRow.className = "item-row";
  const rowCount = tbody.children.length + 1;

  newRow.innerHTML = `
        <td>${rowCount}</td>
        <td><input type="text" class="item-description"></td>
        <td><input type="number" class="item-quantity" onchange="calculateTotal(this)"></td>
        <td><input type="number" class="item-price" onchange="calculateTotal(this)"></td>
        <td class="item-total">0.00</td>
        <td><button class="delete-item btn btn-danger" onclick="deleteRow(this)">ลบ</button></td>
    `;

  tbody.appendChild(newRow);
  updateRowNumbers(); // อัพเดตลำดับรายการใหม่
}

function deleteRow(button) {
  const row = button.closest("tr");
  row.remove();
  updateGrandTotal();
  updateRowNumbers(); // อัพเดตลำดับรายการใหม่
}

function updateRowNumbers() {
  const rows = document.querySelectorAll("#itemsList .item-row");
  rows.forEach((row, index) => {
    row.querySelector("td:first-child").textContent = index + 1; // อัพเดตลำดับ
  });
}
function updateRowNumbersorder() {
  const rows = document.querySelectorAll("#itemsListrecived .item-row-order");
  rows.forEach((row, index) => {
    row.querySelector("td:first-child").textContent = index + 1; // อัพเดตลำดับ
  });
}

function calculateTotal(input) {
  const row = input.closest("tr");
  const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
  const price = parseFloat(row.querySelector(".item-price").value) || 0;
  const total = quantity * price;

  // แปลงจำนวนเงินให้มี , คั่นทุก 3 หลัก
  row.querySelector(".item-total").textContent = total.toLocaleString("th-TH", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  updateGrandTotal();
}

function updateGrandTotal() {
  const totals = document.querySelectorAll(".item-total");
  let grandTotal = 0;
  totals.forEach((total) => {
    grandTotal += parseFloat(total.textContent.replace(/,/g, "")) || 0; // ลบ , ก่อนแปลงเป็นตัวเลข
  });

  // แปลงจำนวนเงินรวมให้มี , คั่นทุก 3 หลัก
  document.getElementById("grandTotal").textContent = grandTotal.toLocaleString(
    "th-TH",
    {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
}

// ฟังก์ชันสร้างใบเสร็จ
function generateReceipt() {
  const customerName = document.getElementById("customerName").value;
  const billDate = document.getElementById("billDate").value;
  const address = document.getElementById("address").value;
  const taxId = document.getElementById("taxId").value;
  let tableorder = document.querySelectorAll(".item-row");

  let tableordername = document.querySelectorAll(".item-description");
  const tableorderqty = document.querySelectorAll(".item-quantity");
  const tableorderprice = document.querySelectorAll(".item-price");
  const tableordertotal = document.querySelectorAll(".item-total");
  let tbodyrecived = document.getElementById("itemsListrecived");

  for (let index = 0; index < tableorder.length; index++) {
    if (tbodyrecived.children.length < tableorder.length) {
      if (tableordername[index].value != "") {
        tbodyrecived = document.getElementById("itemsListrecived");
        const newRow = document.createElement("tr");
        newRow.className = "item-row-order";
        const rowCount = index + 1;

        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td class="new-item-description"></td>
            <td class="new-item-quantity"></td>
            <td class="new-item-price"></td>
            <td class="new-item-total">0.00</td>`;

        tbodyrecived.appendChild(newRow);
        updateRowNumbersorder();
      } else if (tbodyrecived.children.length > tableorder.length) {
        let orderrow = document.querySelectorAll(".item-row-order");
        orderrow.pop();
      }
      {
      }
    } else {
    }

    tableorder = document.querySelectorAll(".item-row");

    tableorder.forEach((element) => {
      if (element.textContent === "") {
        element.remove();
      } else {
      }
      tableordername = document.querySelectorAll(".item-description");
    });
  }

  let neworder = document.querySelectorAll(".item-row-order");
  let newordername = document.querySelectorAll(".new-item-description");
  const neworderqty = document.querySelectorAll(".new-item-quantity");
  const neworderprice = document.querySelectorAll(".new-item-price");
  let newordertotal = document.querySelectorAll(".new-item-total");

  for (let i = 0; i < newordername.length; i++) {
    if (!tableordername[i]) {
      neworder[i].remove();
    } else {
      newordername[i].textContent = tableordername[i].value;
      neworderqty[i].textContent = tableorderqty[i].value;
      neworderprice[i].textContent = tableorderprice[i].value;
      newordertotal[i].textContent = tableordertotal[i].textContent;
    }

    if (newordername[i].textContent === "") {
      neworder[i].remove();
    }
  }

  neworder = document.querySelectorAll(".item-row-order");

  newordertotal = document.querySelectorAll(".new-item-total");

  // ใส่ค่าลงในใบเสร็จ
  document.getElementById("displayCustomerName").textContent = customerName;
  document.getElementById("displayBillDate").textContent = billDate;
  document.getElementById("displayAddress").textContent = address;
  document.getElementById("displayTaxId").textContent = taxId;

  //คำนวณtotal
  const totals = newordertotal;
  let grandTotal = 0;

  totals.forEach((total) => {
    grandTotal += parseFloat(total.textContent.replace(/,/g, "")) || 0; // ลบ , ก่อนแปลงเป็นตัวเลข
  });

  // แปลงจำนวนเงินรวมให้มี , คั่นทุก 3 หลัก
  document.getElementById("new-grandTotal").textContent =
    grandTotal.toLocaleString("th-TH", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  tableorder = document.querySelectorAll(".item-row");

  // แสดงใบเสร็จ
  document.getElementById("receipt").style.display = "block";
}

// ฟังก์ชันบันทึกเป็นรูปภาพ
async function saveAsImage() {
  document.getElementById("receipt").style.width = "500px";
  document.getElementById("itemsTable").style.width = "100%";
  document.getElementById("totall").style.width = "100%";
  const receipt = document.getElementById("receipt");
  const canvas = await html2canvas(receipt);
  const link = document.createElement("a");
  link.download = `receipt-${new Date().toISOString()}.png`;
  link.href = canvas.toDataURL();
  link.click();
  document.getElementById("receipt").style.width = "auto";
}

// ฟังก์ชันบันทึกเป็น PDF
function saveAsPDF() {
  document.getElementById("receipt").style.width = "500px";
  const receipt = document.getElementById("receipt");
  const { jsPDF } = window.jspdf;

  html2canvas(receipt).then((canvas) => {
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`receipt-${new Date().toISOString()}.pdf`);
    document.getElementById("receipt").style.width = "auto";
  });
}

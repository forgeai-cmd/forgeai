---
name: invoice-creator
description: Generate professional, formatted invoices for freelancers and businesses. Triggers when the user asks to create, generate, or make an invoice, bill, or receipt. Collects business details, line items, and tax info, then outputs a clean formatted invoice in text and optionally HTML for PDF conversion.
---

# Invoice Creator — Professional Invoice Generation

You are a professional billing assistant. When the user asks you to create an invoice, guide them through the process and generate a complete, formatted invoice ready for delivery.

## Execution Flow

### Step 1 — Collect Invoice Details

Gather the following information. Ask the user in a single organized prompt for anything missing. If some details are not provided, use sensible [PLACEHOLDER] markers — never guess business details.

#### Seller / Your Business
| Field | Required | Default |
|-------|----------|---------|
| Company name | Yes | — |
| Address | Recommended | [Your Address] |
| Email | Recommended | [Your Email] |
| Phone | Optional | — |
| Tax ID / VAT / CUI | Recommended | — |
| Bank name | Optional | — |
| IBAN / Account number | Optional | — |
| Logo URL | Optional | — |

#### Client / Bill To
| Field | Required | Default |
|-------|----------|---------|
| Client name / Company | Yes | — |
| Client address | Recommended | [Client Address] |
| Client email | Optional | — |
| Client Tax ID / VAT | Optional | — |

#### Invoice Details
| Field | Required | Default |
|-------|----------|---------|
| Invoice number | Yes | Auto-generate: INV-[YYYY]-[001] |
| Invoice date | Yes | Today's date |
| Due date | Yes | 30 days from invoice date |
| Currency | Yes | USD (or infer from context) |
| Payment terms | Optional | Net 30 |
| Tax rate (%) | Optional | 0% |
| Discount (% or flat) | Optional | None |
| Notes | Optional | — |

#### Line Items
For each item/service:
| Field | Required |
|-------|----------|
| Description | Yes |
| Quantity | Yes (default: 1) |
| Unit price | Yes |
| Tax applicable | Optional (default: yes) |

### Step 2 — Calculate Totals

Perform all calculations with precision:

```
For each line item:
  Line Total = Quantity x Unit Price

Subtotal = Sum of all Line Totals

Discount (if applicable):
  If percentage: Discount Amount = Subtotal x (Discount% / 100)
  If flat: Discount Amount = flat value

Subtotal After Discount = Subtotal - Discount Amount

Tax Amount = Subtotal After Discount x (Tax Rate / 100)

TOTAL DUE = Subtotal After Discount + Tax Amount
```

Double-check all math. Invoice errors destroy credibility.

### Step 3 — Generate the Text Invoice

Output a clean, professional text invoice:

```
================================================================
                        INVOICE
================================================================

From:                               Invoice #: [INV-2026-001]
[Company Name]                      Date: [March 22, 2026]
[Address Line 1]                    Due Date: [April 21, 2026]
[Address Line 2]                    Payment Terms: [Net 30]
[Email]
[Phone]
[Tax ID: XXXXXXXXX]

Bill To:
[Client Name / Company]
[Client Address Line 1]
[Client Address Line 2]
[Client Tax ID: XXXXXXXXX]

================================================================
ITEMS
================================================================

#   Description                    Qty    Unit Price     Total
--- ------------------------------ ------ ------------ ----------
1   [Service/product name]         [1]    [1,000.00]   [1,000.00]
    [Optional detail line]
2   [Service/product name]         [2]      [500.00]   [1,000.00]
3   [Service/product name]         [1]      [250.00]     [250.00]

================================================================
                                          Subtotal:   [2,250.00]
                                          Discount ([X]%): -[XXX.XX]
                                          Subtotal:   [X,XXX.XX]
                                          Tax ([X]%):   [XXX.XX]
                                          -----------------------
                                          TOTAL DUE:  [X,XXX.XX]
                                          =======================
                                          Currency: [USD]

================================================================
PAYMENT DETAILS
================================================================

Bank: [Bank Name]
IBAN: [XXXX XXXX XXXX XXXX XXXX]
BIC/SWIFT: [XXXXXXXX]
Reference: [Invoice Number]

Or pay via: [PayPal / Stripe / Wise — if applicable]

================================================================
NOTES
================================================================
[Any additional notes, late payment terms, thank you message]

================================================================
Thank you for your business.
================================================================
```

### Step 4 — Generate HTML Version (Always Include)

Generate a clean, print-ready HTML version that the user can save as PDF via browser print (Ctrl+P > Save as PDF). The HTML must:

- Use inline CSS only (no external stylesheets) for maximum portability
- Be a single self-contained HTML file
- Use a professional color scheme (dark header, clean body, accent color for totals)
- Include proper print media query (`@media print`) for clean PDF output
- Render well on A4 / Letter paper size
- Include all the same data as the text version

Write the HTML to a file using the Write tool. Name it `invoice_[NUMBER].html` in the current working directory. Tell the user the file path.

HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Invoice [NUMBER]</title>
    <style>
        /* Professional invoice styles with print support */
        @page { margin: 20mm; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 800px; margin: 0 auto; }
        /* Header with company branding */
        /* Clean table for line items */
        /* Bold totals section */
        /* Footer with payment details */
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <!-- Full invoice markup -->
</body>
</html>
```

Design specifications for the HTML:
- Header: company name in large bold text, invoice number and dates right-aligned
- Color scheme: `#2c3e50` for header/accents, `#ecf0f1` for table header row, white body
- Line items table: full width, alternating row colors for readability, right-aligned numbers
- Totals: right-aligned, final total in larger bold text with colored background
- Payment details: in a subtle bordered box
- Footer: centered "Thank you for your business" message
- All monetary values right-aligned and formatted with 2 decimal places

### Step 5 — Provide Invoice Summary

After generating both versions:

```
================================================================
INVOICE SUMMARY
================================================================
Invoice #: [Number]
Client: [Name]
Total: [Amount] [Currency]
Due: [Date]
Files generated: [invoice_XXX.html — open in browser, Ctrl+P to save as PDF]
================================================================
```

### Special Scenarios

**Recurring invoices:** If the user mentions monthly/recurring billing, note the pattern and offer to generate the next invoice with incremented number and dates.

**Multi-currency:** If the user specifies a non-USD currency, use the appropriate symbol and formatting:
- USD: $1,000.00
- EUR: 1.000,00 EUR or 1 000,00 EUR
- GBP: 1,000.00 GBP
- RON: 1.000,00 RON (Lei)
- Format numbers according to the currency's locale convention

**Credit notes:** If the user needs a credit note or refund invoice, generate it with negative amounts and label it "CREDIT NOTE" instead of "INVOICE".

**Proforma:** If requested, label as "PROFORMA INVOICE" and add a note: "This is not a tax invoice. A final invoice will be issued upon payment."

**Overdue invoices:** If the user mentions the invoice is overdue, include:
- "OVERDUE" stamp in the header
- Late payment fee calculation if specified
- Updated total including late fees

### Rules
- Never invent business details. Use [PLACEHOLDER] markers for anything not provided.
- Always double-check arithmetic. Show the calculation breakdown so the user can verify.
- Format all numbers consistently: thousand separators and 2 decimal places.
- Invoice numbers should be sequential and professional (INV-2026-001, not random strings).
- Default payment terms: Net 30. Mention the exact due date, not just "Net 30".
- If the user provides details in a non-English language, generate the invoice in that language (translate all labels: "Factura" instead of "Invoice" for Romanian, etc.).
- Always include the HTML version — this is the primary deliverable since it produces professional PDFs.
- Remind the user: "Open the HTML file in your browser and press Ctrl+P (or Cmd+P) to save as PDF."

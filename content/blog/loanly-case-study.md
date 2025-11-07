---
title: "Loanly: Building a Comprehensive Home-Loan Calculator for India"
date: "2024-11-06"
description: "A deep dive into creating an India-specific home-loan calculator that combines EMI calculations, tax benefits, PMAY subsidies, and affordability analysis - all in one unified, accessible platform."
tags: ["React", "TypeScript", "FinTech", "Case Study"]
---

> **"Because your mortgage shouldn't be a mystery."**

Buying a home in India is both exciting and intimidating. Aspiring homeowners face a maze of interest rates, tax deductions, government subsidies and ever-changing regulations. During my own research I realised that most **online home-loan calculators are overly simplistic** - they only compute a basic EMI and ignore factors like floating rates, prepayments, tax benefits or the Pradhan Mantri Awas Yojana (PMAY) subsidy. This gap inspired me to build **Loanly**, a complete, India-specific home-loan calculator.

## The Problem Space

### Why Loanly Was Needed

1. **Fragmented tools** - Users had to juggle separate calculators for EMI, tax benefits, stamp duty and subsidy. There was no unified experience that combined all the numbers.

2. **Lack of localisation** - Most calculators didn't understand the Indian number system (lakhs and crores) or regional charges such as stamp duty and registration fees, which vary by state and gender.

3. **No scenario analysis** - Home loans can be fixed, floating or hybrid. Borrowers should see how rate changes affect their monthly payment, but existing tools rarely model optimistic, realistic and pessimistic scenarios.

4. **Limited advice** - People need to know how much they can actually afford and what tax savings or government subsidies they qualify for. Simple calculators don't incorporate the latest tax slabs (FY 2024-25) or PMAY criteria.

Loanly fills these gaps by offering **all the above calculations in one place**. It delivers a rich, educational experience rather than a black-box number.

## Technology Stack

I wanted a modern, performant and accessible web app that could run on any device. The final stack is intentionally lean:

- **React 19 with TypeScript** ensures type safety and maintainability. The automatic JSX runtime reduces boilerplate.
- **Vite** provides instant builds and fast HMR during development.
- **TanStack Router** enables file-based routing with type inference. Each route corresponds to a page (`/emi`, `/pmay`, etc.), making navigation obvious and type-safe.
- **Tailwind CSS** keeps styling consistent and responsive without bloating the bundle. Utility classes scale well for a dashboard-style UI.
- **Recharts** and **Tremor** power the interactive charts, while **React Hook Form** and **Zod** handle complex forms and validation.
- **Strict TypeScript configuration** (`noEmit`, `verbatimModuleSyntax`, etc.) and `useMemo`/`React.memo` ensure performant, bug-free code.

## Architecture & Design

Loanly follows a modular architecture. All business logic lives in **pure calculation modules** under `src/lib/calculations`, while UI components reside in `src/components` and `src/routes`. This separation ensures that the formulas are testable and reusable across different calculators.

### Routing Structure

The app uses file-based routing through TanStack Router. Key routes include:

| Route | Purpose |
|-------|---------|
| `/` | Landing page with feature overview |
| `/emi` | Detailed EMI calculator (fixed/floating) |
| `/tax-benefits` | Tax benefit calculator |
| `/pmay` | PMAY subsidy eligibility and computation |
| `/prepayment` | Lump-sum and recurring prepayment models |
| `/affordability` | FOIR-based affordability analysis |
| `/comparison` | Side-by-side loan scenario comparison |

## Core Calculations

### EMI Calculation

The **Equated Monthly Installment (EMI)** formula is central to all calculators. Loanly implements it as a pure TypeScript function with proper input validation and edge-case handling:

```typescript
/**
 * Calculate monthly EMI
 * EMI = [P × R × (1+R)^N] / [(1+R)^N – 1]
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number
): number {
  if (!isFinite(principal) || !isFinite(annualRate) || !isFinite(tenureYears)) {
    throw new Error('Invalid input: All parameters must be finite numbers');
  }

  if (principal <= 0 || tenureYears <= 0) return 0;

  const monthlyRate = annualRate / 12 / 100;
  const numPayments = tenureYears * 12;

  if (monthlyRate === 0) {
    return principal / numPayments; // zero-interest case
  }

  const multiplier = Math.pow(1 + monthlyRate, numPayments);
  const emi = (principal * monthlyRate * multiplier) / (multiplier - 1);

  return Math.round(emi * 100) / 100;
}
```

Loanly also exposes helpers such as `calculateTotalInterest`, `calculateTotalAmount`, `calculateLoanAmount` and `calculateTenure` to solve inverse problems (e.g., **How much can I borrow given an EMI budget?**).

### Indian Number Formatting

Indian users are accustomed to lakhs (L) and crores (Cr). The utility module formats and parses numbers accordingly:

```typescript
// Format in Indian comma system (e.g., 1,00,000 instead of 100,000)
export function formatIndianNumber(num: number): string {
  if (num === 0) return '0';
  const isNegative = num < 0;
  const [integerPart, decimalPart] = Math.abs(num).toString().split('.');

  let formatted = '';
  if (integerPart.length > 3) {
    formatted = integerPart.slice(-3);
    let remaining = integerPart.slice(0, -3);
    while (remaining.length > 0) {
      formatted = `${remaining.slice(-2)},${formatted}`;
      remaining = remaining.slice(0, -2);
    }
  } else {
    formatted = integerPart;
  }

  const result = decimalPart ? `${formatted}.${decimalPart}` : formatted;
  return isNegative ? `-${result}` : result;
}

// Convert large numbers to Lakhs or Crores
export function formatToLakhsCrores(num: number, decimals = 1): string {
  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= CRORE) {
    return `${sign}${CURRENCY_SYMBOL}${(absNum / CRORE).toFixed(decimals)}Cr`;
  } else if (absNum >= LAKH) {
    return `${sign}${CURRENCY_SYMBOL}${(absNum / LAKH).toFixed(decimals)}L`;
  }

  return `${sign}${CURRENCY_SYMBOL}${absNum.toFixed(decimals)}`;
}
```

These helpers ensure amounts are always displayed as Indians expect.

### Stamp Duty and Property Costs

State-level stamp duty, registration fees and GST can add several lakhs to a purchase. Loanly encapsulates these rules in a dedicated module:

```typescript
/** Calculate stamp duty based on state and gender */
export function calculateStampDuty(
  propertyValue: number,
  state: string,
  gender: 'male' | 'female' | 'joint' = 'male'
): number {
  const stateRates = STAMP_DUTY_RATES[state];
  if (!stateRates) {
    console.warn(`Stamp duty rates not found for ${state}, using default 5%.`);
    return Math.round(propertyValue * 0.05);
  }

  let rate = stateRates.men;
  if (gender === 'female' && stateRates.women !== undefined) {
    rate = stateRates.women;
  }
  if (gender === 'joint' && stateRates.women !== undefined) {
    rate = stateRates.women;
  }

  return Math.round(propertyValue * rate);
}

/** Combine stamp duty, registration fee and GST */
export function calculateStampDutyBreakdown(
  inputs: StampDutyInputs
): StampDutyBreakdown {
  const stampDuty = calculateStampDuty(
    inputs.propertyValue,
    inputs.state,
    inputs.gender
  );
  const registrationFee = calculateRegistrationFee(
    inputs.propertyValue,
    inputs.state
  );
  const gst = calculateGST(
    inputs.propertyValue,
    inputs.isUnderConstruction || false,
    inputs.constructionRatio
  );

  const total = stampDuty + registrationFee + gst;

  return {
    stampDuty,
    registrationFee,
    gst,
    totalTransactionCost: total,
    effectiveRate: total / inputs.propertyValue,
  };
}
```

The module also provides helper functions to compare stamp duty across states or determine the maximum property value you can afford given a stamp-duty budget.

### PMAY Subsidy Calculations

The Pradhan Mantri Awas Yojana (PMAY) offers an interest subsidy based on income categories (EWS, LIG, MIG1, MIG2). Loanly evaluates eligibility and computes the net present value (NPV) of the subsidy:

```typescript
export function calculatePMAYSubsidy(inputs: PMAYInputs): PMAYResult {
  // Determine category from annual income
  let category: 'EWS' | 'LIG' | 'MIG1' | 'MIG2' | 'INELIGIBLE';

  if (inputs.annualIncome <= 300000) category = 'EWS';
  else if (inputs.annualIncome <= 600000) category = 'LIG';
  else if (inputs.annualIncome <= 1200000) category = 'MIG1';
  else if (inputs.annualIncome <= 1800000) category = 'MIG2';
  else {
    return {
      eligible: false,
      category: 'INELIGIBLE',
      reason: 'Income exceeds ₹18L',
      /* ... */
    };
  }

  const criteria = PMAY_CRITERIA[category];

  // Compute eligible loan amount and subsidy tenure
  const eligibleLoan = Math.min(inputs.loanAmount, criteria.maxLoanForSubsidy);
  const subsidyTenure = Math.min(inputs.tenureYears, PMAY_MAX_TENURE);

  // Calculate EMI at market rate vs subsidised rate
  const emiMarket = calculateEMI(eligibleLoan, inputs.interestRate, subsidyTenure);
  const emiSubsidised = calculateEMI(
    eligibleLoan,
    inputs.interestRate - criteria.subsidyRate,
    subsidyTenure
  );

  // Discount future savings using an 8% discount rate
  let subsidyNPV = 0;
  const monthlyDiscount = 0.08 / 12;

  for (let month = 1; month <= subsidyTenure * 12; month++) {
    const monthlyDiff = emiMarket - emiSubsidised;
    subsidyNPV += monthlyDiff / Math.pow(1 + monthlyDiscount, month);
  }

  return {
    eligible: true,
    category,
    subsidyNPV,
    effectiveRate:
      inputs.interestRate -
      (criteria.subsidyRate * (eligibleLoan / inputs.loanAmount)),
    savingsPerMonth: emiMarket - emiSubsidised,
    totalSavings: subsidyNPV * (subsidyTenure / inputs.tenureYears),
  };
}
```

### Affordability and FOIR

Understanding what you can realistically afford is more valuable than simply knowing a monthly EMI. The **affordability calculator** uses the Fixed Obligation to Income Ratio (FOIR) approach and RBI loan-to-value limits:

```typescript
export function calculateAffordability(
  inputs: AffordabilityInputs
): AffordabilityResult {
  const totalIncome = inputs.monthlyIncome + (inputs.coApplicantIncome ?? 0);
  const totalObligations =
    (inputs.existingEMIs ?? 0) + (inputs.otherObligations ?? 0);

  const maxAllowedEMI =
    totalIncome * (inputs.foirPercentage / 100) - totalObligations;

  // Solve reverse EMI formula to find max loan amount
  const monthlyRate = inputs.interestRate / 12 / 100;
  const months = inputs.tenureYears * 12;
  const factor = Math.pow(1 + monthlyRate, months);

  const maxLoanAmount =
    maxAllowedEMI * ((factor - 1) / (monthlyRate * factor));

  const maxPropertyValue = maxLoanAmount + inputs.downPaymentAvailable;
  const ltvRatio = (maxLoanAmount / maxPropertyValue) * 100;

  return {
    maxAffordableEMI: maxAllowedEMI,
    maxLoanAmount,
    maxPropertyValue,
    ltvRatio,
    /* ... recommendations based on RBI limits and FOIR ... */
  };
}
```

## User Experience & Accessibility

Loanly isn't just a collection of formulas. It delivers information through **dynamic charts**, **interactive sliders** and **clear breakdowns**. The UI is fully responsive, keyboard navigable and WCAG 2.1 compliant:

- **Real-time updates** - changing any input recalculates results instantly
- **Charting** - EMI vs interest, outstanding balance, radar comparisons for multiple scenarios
- **CSV export** - users can download amortisation schedules or summaries for their records
- **Error handling** - forms use Zod schemas to display meaningful validation errors; the app has error boundaries to prevent the entire UI from crashing

## Impact & Takeaways

Building Loanly highlighted how underserved the Indian housing market is by existing tools. By focusing on **localisation**, **educational insights** and **transparent formulas**, the project offers users clarity during one of the biggest financial decisions of their lives.

Loanly demonstrates that a well-architected React/TypeScript application can achieve both **depth and usability**. Modular calculation modules, strict types and responsive charts make the tool powerful yet approachable.

### Key Learnings

1. **Pure functions are powerful** - Separating business logic from UI made testing trivial and code reusable
2. **TypeScript safety matters** - Strict types caught edge cases that would have been runtime bugs
3. **Localization goes beyond translation** - Understanding cultural expectations (lakhs/crores, state-specific rules) is crucial
4. **User education > black boxes** - Showing *how* numbers are calculated builds trust and empowers users

---

**Made with ❤️ for Indian home buyers**

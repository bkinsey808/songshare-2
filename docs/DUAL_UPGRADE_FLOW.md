# 📱 Dual Upgrade Flow: In-App Purchase + Server-Triggered Email Contribution

## Overview

This feature offers users two upgrade paths:

1. _In-App Purchase (IAP)_ — Seamless upgrade using platform-native billing.
2. _Email-Based Access_ — Server sends an email with a contribution link (lower rate), triggered by user consent.

Designed for spiritual or ceremonial apps, this flow maintains compliance with Google Play and Apple App Store policies.

---

## 🧭 User Flow Summary

| Path               | Trigger                            | Outcome                                          |
| ------------------ | ---------------------------------- | ------------------------------------------------ |
| In-App Purchase    | User taps "Upgrade Now"            | Full-price upgrade via IAP                       |
| Email Contribution | User taps "Learn More" and opts in | Server sends one-time email with lower-rate link |

---

## 🛠 Components

### 1. In-App UI Elements

plaintext
🌿 Deepen Your Experience

Upgrade within the app for instant access.  
Or tap below to receive more info about ceremonial access options.

[ Upgrade Now ] [ Learn More ]

### 2. Consent Capture Prompt

plaintext
We’ll send a one-time email with details about your ceremonial access.  
By continuing, you consent to receive this message.  
[Privacy Policy](your-privacy-url)

☑ I consent to receive an informational email  
📧 My Email Address: [_____________]

[ Confirm & Send Email ]

### 3. Backend: Email Trigger

- Endpoint: POST /api/sendContributionEmail
- Body:

json
{
"email": "user@example.com",
"name": "User Name",
"consented": true,
"source": "Ceremonial App"
}

- Server logic:
  - Validate consent
  - Log request securely
  - Send email via SMTP (SendGrid, SES, etc.)

#### Email Template

plaintext
Subject: Your Invitation to Join

Dear [Name],

Thank you for your interest in deepening your ceremonial experience.  
As part of our community, you're eligible for a special contribution rate through our site:

Explore offerings: [your-site-link]

With gratitude,  
[Your Team Name]

---

## ✅ Platform Compliance Checklist

### Google Play

- ☑ In-app billing for digital content
- ☑ No links to external payments in app
- ☑ Consent-based email flow for lower rates

### Apple App Store

- ☑ All content purchased via Apple IAP
- ☑ No pricing references or links in app
- ☑ Email initiated by user consent

---

## 🌿 Ceremonial Messaging Guide

| ✅ Allowed Terms            | 🚫 Avoid In-App              |
| --------------------------- | ---------------------------- |
| “Special contribution rate” | “Discount” or “Cheaper”      |
| “Ceremonial access”         | “Promo deal”                 |
| “Community invitation”      | “Best price outside the app” |
| “Explore offerings”         | “Click here to save money”   |

---

## 🔐 Privacy & Legal Considerations

- Provide clear consent flow in UI
- Link to Privacy Policy in-app
- Ensure emails are single-use and opt-in only
- Align with GDPR / CCPA if applicable
- Disclose purpose in Play Store Data Safety and App Store App Privacy sections

---

## 🧠 Developer Notes

Keep tone warm, ceremonial, and respectful. No promotional language inside the app. Let users choose their path — whether through platform billing or spiritually-aligned contribution by email.

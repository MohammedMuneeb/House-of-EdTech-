# Security Mitigation Strategies & Contingency Plans

This document outlines the security measures implemented in the "House of Edtech Curriculum AI" application, designed to safeguard data and prevent common vulnerabilities.

## 1. Authentication and Authorization
**Strategy:** We integrated **NextAuth.js (Auth.js)** implementing JSON Web Token (JWT) strategies. 
*   **Authentication:** The application supports standard OAuth (GitHub) to delegate password management effectively, as well as a fallback credential system. 
*   **Authorization:** Middleware strictly protects all application routes, immediately verifying the session token on the Edge before the page renders or server actions process. 
*   **Data Isolation:** All courses have a `userId` relationship. Future deployments will use Server Actions checking `if (session.user.id !== course.userId) throw new Error("Unauthorized");` to prevent indirect object reference (IDOR) attacks.

## 2. Cross-Site Scripting (XSS) Mitigation
**Strategy:** 
*   **React Context:** By default, React/Next.js automatically escapes string variables in views, protecting against standard DOM-based XSS attacks. 
*   **Sanitization:** AI-generated content or user-inputted rich text must be sanitized if rendered as HTML. Currently, we utilize plain `Textarea` rendering, avoiding `dangerouslySetInnerHTML`.

## 3. SQL Injection Prevention
**Strategy:**
*   **ORM Usage:** The application exclusively uses **Prisma ORM** for database interaction. Prisma strictly utilizes parameterized queries under the hood, meaning user input is never concatenated directly into raw SQL strings. This essentially neutralizes classic SQL injection vectors.

## 4. Cross-Site Request Forgery (CSRF)
**Strategy:**
*   **Built-in Protection:** NextAuth.js inherently implements double-submit cookie patterns out of the box for its authentication endpoints. Furthermore, Next.js Server Actions automatically include CSRF checks (host header validation and origin checks) natively in App Router.

## 5. Contingency Plans for the Real World
If this application were to scale into a production environment, the following contingencies would be deployed:
*   **AI Rate Limiting:** Generative AI endpoints are incredibly expensive and vulnerable to DDoS attacks. We would implement IP-based and User-based rate limiting (e.g., Upstash Redis or Vercel KV) allowing only X requests per minute.
*   **Content Moderation:** Using an AI text-moderation API (like OpenAI's moderation endpoint) before saving generated or user-edited course modules to prevent the database from housing illicit or dangerous content.
*   **Secrets Rotation:** If the `AUTH_SECRET` or GitHub OAuth secrets were compromised, they would be immediately rotated in the deployment platform (Vercel), forcing all users to seamlessly re-authenticate on their next request.

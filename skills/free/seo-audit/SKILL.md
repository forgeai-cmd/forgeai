---
name: seo-audit
description: Run a comprehensive 18-point SEO audit on any website URL. Triggers when the user asks to audit, review, analyze, or check the SEO health of a website, page, or URL. Produces a scored report with prioritized fixes and actionable recommendations.
---

# SEO Audit — 18-Point Comprehensive Analysis

You are an expert SEO auditor. When the user provides a URL (or asks you to audit a site), execute the full 18-point audit below. If no URL is provided, ask for one before proceeding.

## Execution Flow

### Step 1 — Fetch and Parse the Page

Use the WebFetch tool to retrieve the target URL. If the fetch fails, report the error and attempt diagnosis (DNS issue, SSL expired, server down, blocked by robots.txt, etc.). Parse the full HTML response for analysis.

### Step 2 — Run All 18 Audit Checks

For each check, assign a score: PASS (green), WARNING (yellow), or FAIL (red). Provide specific findings and a concrete fix.

#### CHECK 1: Title Tag
- Verify `<title>` exists and is unique
- Length: 50-60 characters is optimal
- Must contain primary keyword, ideally near the front
- FAIL if missing, empty, or over 70 characters
- WARNING if under 30 or between 60-70 characters

#### CHECK 2: Meta Description
- Verify `<meta name="description">` exists
- Length: 150-160 characters is optimal
- Must be compelling and contain primary keyword
- FAIL if missing or empty
- WARNING if under 70 or over 170 characters

#### CHECK 3: Heading Structure (H1-H6)
- Exactly one `<h1>` tag required
- H1 must contain primary keyword or close variant
- Headings must follow logical hierarchy (no skipping from H2 to H4)
- Count all heading levels and report structure
- FAIL if zero or multiple H1 tags
- WARNING if hierarchy is broken

#### CHECK 4: Image Alt Tags
- Count all `<img>` tags
- Count how many have non-empty `alt` attributes
- Calculate coverage percentage
- FAIL if coverage is below 50%
- WARNING if below 80%
- Flag images with generic alt text ("image", "photo", "img_001")

#### CHECK 5: Page Speed Indicators
- Check total HTML size (uncompressed)
- Count external CSS and JS files (render-blocking resources)
- Count total images and estimate weight from dimensions if available
- Check for lazy loading attributes (`loading="lazy"`)
- Check for minification indicators in CSS/JS filenames
- FAIL if HTML exceeds 150KB or more than 15 render-blocking resources
- WARNING if HTML exceeds 100KB or more than 8 render-blocking resources

#### CHECK 6: Mobile Responsiveness
- Check for `<meta name="viewport">` tag with proper content
- Look for responsive CSS indicators (media queries in inline styles)
- Check for fixed-width elements that break mobile
- FAIL if viewport meta is missing
- WARNING if viewport content is non-standard

#### CHECK 7: Internal Links
- Count all internal links (same domain)
- Check for broken anchor patterns (href="#", href="", javascript:void)
- Verify links use descriptive anchor text (not "click here", "read more")
- FAIL if fewer than 3 internal links
- WARNING if fewer than 5 or if poor anchor text detected

#### CHECK 8: External Links
- Count all external links
- Check for `rel="nofollow"` and `rel="noopener"` usage
- Verify external links open in new tab (`target="_blank"`)
- WARNING if external links lack noopener (security)
- Note any links to low-quality or suspicious domains

#### CHECK 9: Schema Markup (Structured Data)
- Search for JSON-LD (`<script type="application/ld+json">`)
- Search for Microdata (`itemscope`, `itemtype`)
- Search for RDFa attributes
- Parse and identify schema types present (Organization, LocalBusiness, Article, Product, FAQ, etc.)
- FAIL if no structured data found
- WARNING if schema exists but is minimal (only Organization, missing key types)

#### CHECK 10: Canonical Tags
- Check for `<link rel="canonical">`
- Verify canonical URL matches the current page URL (or is intentionally different)
- FAIL if missing entirely
- WARNING if canonical points to a different URL (potential issue or intentional)

#### CHECK 11: Robots.txt
- Fetch `/robots.txt` from the domain root
- Check if the audited page is blocked by Disallow rules
- Look for Sitemap directive
- FAIL if robots.txt blocks the page or blocks all crawlers
- WARNING if robots.txt is missing or empty

#### CHECK 12: XML Sitemap
- Check robots.txt for Sitemap directive
- Attempt to fetch `/sitemap.xml` and `/sitemap_index.xml`
- Verify sitemap is valid XML
- Check if the audited URL appears in the sitemap
- FAIL if no sitemap found
- WARNING if sitemap exists but audited URL is not included

#### CHECK 13: SSL / HTTPS
- Check if the URL uses HTTPS
- Look for mixed content indicators (HTTP resources on HTTPS page)
- FAIL if page is served over HTTP
- WARNING if mixed content detected

#### CHECK 14: Core Web Vitals Indicators
- Estimate LCP issues: find the largest above-fold element (hero image, large text block)
- Check for CLS risks: images without width/height attributes, dynamically injected content, ads
- Check for FID/INP risks: heavy JS bundles, inline event handlers, third-party scripts count
- Report risk level for each vital (Low / Medium / High)
- This is an estimate-based analysis; recommend Google PageSpeed Insights for exact metrics

#### CHECK 15: Content Quality
- Measure word count of main content (excluding nav, footer, sidebar)
- Check paragraph length and readability
- Look for thin content (under 300 words for articles)
- Check for duplicate content indicators (boilerplate ratio)
- FAIL if main content is under 100 words
- WARNING if under 300 words for a page that should be content-rich

#### CHECK 16: Keyword Density
- Ask the user for the target keyword if not obvious from the page
- Count occurrences in: title, H1, headings, body text, alt tags, meta description, URL
- Calculate density as percentage of total words
- Optimal range: 1-3%
- WARNING if under 0.5% (keyword barely present) or over 4% (keyword stuffing risk)

#### CHECK 17: URL Structure
- Check URL length (under 75 characters recommended)
- Verify URL uses hyphens (not underscores or spaces)
- Check for keyword presence in URL
- Flag query parameters, session IDs, or unnecessary complexity
- WARNING if URL exceeds 100 characters or uses poor separators

#### CHECK 18: Social Meta Tags (Open Graph + Twitter Cards)
- Check for `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- Check for `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- FAIL if no social meta tags exist
- WARNING if partial (missing image or description)

### Step 3 — Calculate Overall Score

Scoring:
- Each PASS = 1 point
- Each WARNING = 0.5 points
- Each FAIL = 0 points
- Overall score = (total points / 18) * 100, rounded to nearest integer

Grade scale:
- 90-100: A+ (Excellent)
- 80-89: A (Very Good)
- 70-79: B (Good, needs minor fixes)
- 60-69: C (Fair, needs attention)
- 50-59: D (Poor, significant issues)
- Below 50: F (Critical, major overhaul needed)

### Step 4 — Generate the Report

Output the report in this exact format:

```
================================================================
           SEO AUDIT REPORT — [Domain Name]
           Date: [Current Date]
           Overall Score: [XX]/100 — Grade: [X]
================================================================

URL Audited: [full URL]

SUMMARY
-------
Passed: [X]/18 | Warnings: [X]/18 | Failed: [X]/18

TOP 3 PRIORITY FIXES:
1. [Most critical FAIL with one-line fix]
2. [Second most critical issue]
3. [Third most critical issue]

DETAILED RESULTS
================

[For each of the 18 checks:]

[X] CHECK [N]: [Check Name] — [PASS/WARNING/FAIL]
    Finding: [What was found]
    Impact: [Why this matters for SEO]
    Fix: [Specific action to take]

================================================================
           RECOMMENDATIONS BY PRIORITY
================================================================

CRITICAL (Fix Immediately):
- [List all FAIL items with specific instructions]

IMPORTANT (Fix This Week):
- [List all WARNING items with specific instructions]

MONITORING (Maintain):
- [List all PASS items — what to keep doing]

================================================================
           NEXT STEPS
================================================================
1. Fix all CRITICAL items first — these are blocking SEO performance
2. Address IMPORTANT items within 7 days
3. Run this audit again after fixes to verify improvement
4. Consider a deeper technical crawl with Screaming Frog or Sitebulb
5. Set up Google Search Console monitoring for ongoing tracking
================================================================
```

### Rules
- Be specific in every finding. Never say "looks okay" without evidence.
- Every FAIL and WARNING must include a concrete, copy-paste-ready fix when possible.
- If you cannot fetch the URL, still provide guidance on what to check manually.
- Keep the tone professional but direct. The user needs actionable data, not fluff.
- If the user provides multiple URLs, audit each one separately with its own full report.

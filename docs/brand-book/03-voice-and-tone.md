# Chapter 03. Voice and tone

**Last touched:** 2026-05-15.

## Voice (what BUD always sounds like)

| Trait | Looks like | Does not look like |
|---|---|---|
| **Direct** | "Contains peanut. Skip this." | "Hmm, this might be something to think about." |
| **Specific** | "Cleared against your profile." | "Looks fine." |
| **Calm** | "Up to you." | "WARNING: POTENTIAL ALLERGEN DETECTED." |
| **Honest about confidence** | "I'm 78% sure." | "Probably safe!" |
| **Hand-on-shoulder warm** | "Got it. I'll watch for these." | "Profile saved successfully." |

## Tone (shifts by context)

| Context | Tone | Example |
|---|---|---|
| **Verdict: avoid** | Direct, factual, not alarming | "Contains peanut. Skip this." |
| **Verdict: compatible** | Direct, descriptive, not a safety claim | "Cleared against your profile." / "No declared allergens on your profile." |
| **Verdict: uncertain** | Honest, transparent about confidence | "May contain tree nuts. Your call." |
| **Onboarding** | Warm, conversational | "Tell me what to watch out for." |
| **Empty state** | Encouraging, never lecturing | "Scan your first product to get going." |
| **Error** | Apologetic, never blames the user | "We couldn't read that label. Try a closer angle?" |
| **Marketing copy** | Founder-authentic, no buzzwords | "The buddy you always needed." |
| **Push notification (compatible)** | Tiny, direct | "Cleared against your profile." |
| **Push notification (avoid)** | Tiny, direct | "Skip this. Contains peanut." |

## Words BUD uses

| Category | Examples |
|---|---|
| **Verdict words** | no matches, skip this, contains, may contain, watch out, your call, up to you |
| **Action words** | let's check, scan a product, point at it, retake, try again |
| **Trust words** | second opinion, the label says, contains, may contain, your profile, watching for, no surprises |
| **Founder words** | the buddy you always needed, hand-on-shoulder, real second opinion |

## Words BUD does NOT use (ban list)

| Banned | Why | Use instead |
|---|---|---|
| revolutionary | SV marketing speak | (delete or describe specifically) |
| AI-powered | meaningless adjective | (describe what AI does specifically) |
| intelligent / smart | tells, doesn't show | (show the result) |
| disruptive / disrupt | corporate jargon | (delete) |
| leverage (as verb) | jargon | use / build on / draw from |
| ecosystem / platform | overreach for pre-launch | app / product |
| transform | weak | rewrite the sentence |
| empower | corporate empathy theater | (delete or describe what user gets) |
| optimize | jargon | improve / tune / make better |
| journey (in marketing) | corporate empathy | (rewrite) |
| unlock | gamified marketing | use / open up |
| magical | hand-wavy | describe what it does |
| seamless | meaningless | (delete) |
| em-dash (—) | AI tell | period, comma, parens, or restructure |
| "We believe" / "we think" / "we hope" | weak | concrete fact instead |

## The voice ladder (full surface map)

This is the canonical reference. Anyone writing copy for BUD checks here first.

### App copy (in-product)

```
EYEBROW: BUD                          [always all-caps, brand-600, letterspaced]
HEADLINE: Hi. I'm Bud.                [Inter Bold, tight tracking, sentence case]
SUBHEAD: Point your phone at a        [Inter Regular, ink-soft]
         grocery product. I'll tell
         you if it's safe for you.
BODY: First, let me know what         [Inter Regular, ink-muted]
      to watch out for.
CTA:  Let's start                     [Inter Medium, ink button, surface text]
```

### Verdict copy patterns

```
COMPATIBLE
  Tone pill: COMPATIBLE (status-ok)
  Headline: No declared allergens on your profile.
  Reason: Nothing on your profile detected.

AVOID
  Tone pill: AVOID (status-danger)
  Headline: Skip this.
  Reason: Contains peanut.   [be specific]

UNCERTAIN
  Tone pill: UNCERTAIN (status-warn)
  Headline: Your call.
  Reason: May contain tree nuts.

UNKNOWN
  Tone pill: UNKNOWN (ink-muted)
  Headline: Couldn't tell.
  Reason: I couldn't read the label clearly. Try a different angle?
```

### Marketing copy patterns

```
LANDING HERO
  Eyebrow: For the people who actually read every label
  Headline: The buddy you always needed.
  Subhead: Point. Scan. Done. Bud reads the actual package text and tells
           you what's safe for you, in seconds.
  CTA: Get early access

SOCIAL POST (educational)
  Hook: Yuka couldn't catch this. BUD did.
  Story: 3-second clip showing a "may contain peanut" warning that
         barcode apps miss because the label was updated last week.
  CTA: bud.quest (link in bio)

EMAIL (waitlist update)
  Subject: Your BUD update . week 3
  Greeting: Hey Alex,
  Body: 3 sentences. What we shipped this week. One sentence on what's next.
        One question to the reader.
  Sign-off: . Alex + Amir
```

## The em-dash rule (most important ban)

**Never. Em. Dashes.**

Em dashes ( — ) are the highest-frequency AI tell in 2026 copy. If you see one, replace it.

| Bad | Good |
|---|---|
| "BUD scans products — fast and accurate." | "BUD scans products. Fast and accurate." |
| "X — a Y" | "X, a Y" or "X. A Y." |
| "X — Y." | "X. Y." |
| "X (Y) — Z" | "X (Y). Z." |

If a dash was load-bearing for the meaning, restructure the entire sentence. En dashes (–) and hyphens (-) are fine. Only the em dash (—) is banned.

## The "no AI tells" full audit list

Before any external copy ships, check for:

- [ ] Zero em-dashes
- [ ] Zero "we believe / we think / we hope"
- [ ] Zero "revolutionary / disrupt / transform / leverage / unlock / magical"
- [ ] Zero "ecosystem / platform" (in pre-launch context)
- [ ] No three-sentence run-ons separated by semicolons
- [ ] No "let's dive in" / "let's explore" / "without further ado"
- [ ] No "It's important to note that..." / "It's worth mentioning..."
- [ ] No "Whether you're X or Y" parallel constructions
- [ ] Specific allergens > generic warnings
- [ ] First-person ("I'll watch for these") OK in app voice; third-person ("BUD will") OK in marketing

## Founder voice (Alex specifically)

When writing AS Alex (Riipen, YC, Futurpreneur, partner emails):

- Lead with sensory specificity, then framework
- Confident, specific, grounded
- Personal where appropriate ("the moment I knew Amir was different")
- No buzzword soup
- Words Alex uses: locked in, A+ setup, sauce, naruhodo, fax, o7, my model, founding-team-level experience, take my piece of the pie
- Words Alex does NOT use: "fire ass trade" / "bum ass trade" (those are Richard's)
- Sign Chinese-language outbound as 何蒙昂, never 孟和

## Iteration log

### v4 (2026-05-15) — full chapter split off + ban-list expanded

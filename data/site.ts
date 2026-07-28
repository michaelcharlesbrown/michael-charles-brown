/**
 * Single source of truth for site identity.
 *
 * Every title, meta description, visible role line, and JSON-LD field derives
 * from these constants. Do not hardcode the name, roles, or positioning copy
 * anywhere else — that is how the site ended up describing Michael three
 * different ways on the same page.
 *
 * Note the deliberate split: what the page SHOWS is short and understated,
 * what the metadata DECLARES is thorough. Both are accurate; the second is an
 * expansion of the first, not a contradiction of it.
 */

export const SITE_URL = "https://michaelcharlesbrown.com";

export const SITE_NAME = "Michael Charles Brown";

/**
 * Visible role line on /about and /links. Matches TAGLINE below — what the
 * page shows and what search results show say the same three things.
 * Deliberately narrower than JOB_TITLES; that breadth is for structured data.
 */
export const ROLES = ["MUSICIAN", "PRODUCER", "FILM COMPOSER"] as const;

/** Prose form used in <title> and the hidden homepage h1. Keep near 60 chars. */
export const TAGLINE = "Musician, Producer & Film Composer";

/** `<title>` default and og/twitter title. */
export const SITE_TITLE = `${SITE_NAME} — ${TAGLINE}`;

/**
 * Full role set for structured data. Broader than ROLES on purpose — these are
 * all accurate, and breadth here is what makes him findable.
 */
export const JOB_TITLES = [
  "Musician",
  "Record Producer",
  "Film Composer",
  "Songwriter",
  "Visual Artist",
];

/** Schema.org Person.knowsAbout. */
export const KNOWS_ABOUT = [
  "Film Scoring",
  "Music Composition",
  "Record Production",
  "Songwriting",
  "Analog Recording",
  "Electronic Music",
  "Experimental Music",
  "Visual Art",
];

/**
 * Homepage meta description. Other pages write their own sentence, but every
 * one of them opens with this same identity framing.
 */
// Keep under ~155 chars or Google truncates the tail in search results.
export const SITE_DESCRIPTION =
  "Michael Charles Brown — musician, record producer, songwriter, film composer. Original film scores, analog tape recordings, and genre-defying music projects.";

/** Schema.org Person.description — the fullest form, no length pressure. */
export const PERSON_DESCRIPTION =
  "Musician, record producer, songwriter, film composer, and visual artist. Original scores for film, experimental electronic music, analog tape recordings, and genre-defying recording projects.";

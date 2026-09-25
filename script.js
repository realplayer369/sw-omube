/* ============================================================
   Always With You — script.js (Final Clean)
   ============================================================ */
'use strict';

// ════════════════════════════════════════════════════════════
//  CONFIGURATION — edit to personalise
// ════════════════════════════════════════════════════════════

const TOGETHER_SINCE = '2024-08-25';

const MILESTONES = [
  { emoji:'💍', name:'Our Anniversary',  date:'2025-09-14', color:'linear-gradient(90deg,#ffc8e8,#ff90c8)' },
  { emoji:'🎂', name:'Your Birthday',    date:'2025-07-22', color:'linear-gradient(90deg,#7ec8f7,#45a8e8)' },
  { emoji:'🎉', name:'My Birthday',      date:'2025-11-03', color:'linear-gradient(90deg,#b8e3ff,#7ec8f7)' },
  { emoji:'🎄', name:'Christmas',        date:'2025-12-25', color:'linear-gradient(90deg,#a8e8a8,#60c860)' },
  { emoji:'🎆', name:"New Year's Eve",  date:'2025-12-31', color:'linear-gradient(90deg,#f0c060,#e8a030)' },
  { emoji:'✈️', name:'Next Visit',       date:'2025-08-10', color:'linear-gradient(90deg,#c8b8ff,#a090e8)' },
];

const VOICE_NOTE_SRC = 'voice/placeholder.mp3';

// ── YOUR PHOTOS ──────────────────────────────────────────────
// Drop your 7 photo files into the "photos" folder using the
// exact filenames below (see photos/README.txt for details),
// or edit the captions here to whatever you'd like.
const DEFAULT_SLIDES = [
  { url:'1.jpg', caption:'' },
  { url:'2.jpg', caption:'' },
  { url:'3.jpg', caption:'' },
  { url:'4.jpg', caption:'' },
  { url:'5.jpg', caption:'' },
  { url:'6.jpg', caption:'' },
  { url:'7.jpg', caption:'' },
  { url:'8.jpg', caption:'' },
  { url:'9.jpg', caption:'' },
];

// ── CURSOR TRAIL SPRITES ─────────────────────────────────────
// Add / remove entries to match your cursors/ folder.
// Use { img: 'cursors/cursor1.png' } for image files,
// or { emoji: '💗' } for emoji sprites.
// The button cycles: OFF → sprite 1 → sprite 2 → … → OFF → …
const CURSOR_SPRITES = [
  { img:   'cursors/cursor1.png' },   // pengy
  { emoji: '💗'                  },   // heart emoji
  { img:   'cursors/cursor2.png' },   // butterfly
  { img:   'cursors/cursor3.png' },   // dolphin
];

const PLAYLIST_TRACKS = [
  '1is8gU4RVcN4J8xItxWoOY',
  '1Y3LN4zO1Edc2EluIoSPJN',
  '6BEP2k75mE8u8gHdvxV3mn',
  '76OGwb5RA9h4FxQPT33ekc',
  '51ZQ1vr10ffzbwIjDCwqm4',
  '1EYqDZG3dgbecqv9JS2lUd',
  '5mjYQaktjmjcMKcUIcqz4s',
  '55h7vJchibLdUkxdlX3fK7',
  '6dOtVTDdiauQNBQEDOtlAB',
  '22PMfvdz35fFKYnJyMn077',
  '78ZGO8OXHHBYg2ZhMNaywU',
  '54TAOgQWiq0jBDZ1D5F8vC',
  '5ozaEo4KGNnJgdzChs7FQi',
  '2dPT9UxyHm71quNyj3C4YE',
  '3hRV0jL3vUpRrcy398teAU',
  '4HcARAxzsbIB3MqiEkejM6',
  '4ewazQLXFTDC8XvCbhvtXs',
  '3TfDUStpnEVIlsNlgcKQgJ',
  '0WHi11uzahqpEtPGYCW6oQ',
  '0GVuLQtPXFaL18ijEOqoAa',
  '5asAkK2OiCuCdLCjqAXemz',
  '0nJW01T7XtvILxQgC5J7Wh',
  '2KnLkZ3z7PO3kgVGHGqDpD',
  '1ZMiCix7XSAbfAJlEZWMCp',
  '2qxmye6gAegTMjLKEBoR3d',
  '6eI8B3QW20P68MCYMb4Etd',
  '4nyF5lmSziBAt7ESAUjpbx',
  '5WtfUKzXircvW8l5aaVZWT',
  '5vjLSffimiIP26QG5WcN2K',
  '1ei3hzQmrgealgRKFxIcWn',
  '3i9UVldZOE0aD0JnyfAZZ0',
  '2m6Ko3CY1qXNNja8AlugNc',
  '58qX77t2VWMWcycsh9zKLc',
  '0qvzXomUDJVaUboy2wMfiS',
  '77MdvMx9L4ZQuLhhn3o21h',
  '5O2P9iiztwhomNh8xkR9lJ',
  '04S1pkp1VaIqjg8zZqknR5',
  '7jtQIBanIiJOMS6RyCx6jZ',
  '2eAvDnpXP5W0cVtiI0PUxV',
  '0tgVpDi06FyKpA1z0VMD4v',
  '1bhUWB0zJMIKr9yVPrkEuI',
  '3vkCueOmm7xQDoJ17W1Pm3',
  '630sXRhIcfwr2e4RdNtjKN',
  '69vToJ9BMbbLlFZo7k7A7B',
  '7FKkswFflI5Txc3Y4gH0IB',
  '6Z165JvPnS8PYvGW8oLGLc',
  '3yMC1KsTwh0ceXdIe4QQAQ',
  '2E9viCx0hJKNKNThd2MdGQ',
  '3F7bhRhNpY4YKrwa4kGeUz',
  '1OU4E4HiVjdak0mL4blVWT',
  '6yIHGmQLJxWAUZ1ZkENemN',
  '0UauNGiFTVXTsgvVz6LBMf',
  '0GMs3jq70wmCo12pavj4st',
  '0bZFa5DZcx9HWx25m2Nd19',
  '6VhuP99TE6gYNQRJIlAWFD',
  '39fD0qvjgk8RarJnoBiDTx',
  '3bNv3VuUOKgrf5hu3YcuRo',
  '3di5hcvxxciiqwMH1jarhY',
  '4OSBTYWVwsQhGLF9NHvIbR',
  '0gplL1WMoJ6iYaPgMCL0gX',
  '6VObnIkLVruX4UVyxWhlqm',
  '6EIMUjQ7Q8Zr2VtIUik4He',
  '0QzuaeCEEOV40Pn7IvKEny',
  '3U4isOIWM3VvDubwSI3y7a',
  '2bl81llf715VEEbAx03yvB',
  '53QF56cjZA9RTuuMZDrSA6',
  '0yc6Gst2xkRu0eMLeRMGCX',
  '1TQXIltqoZ5XXyfCbAeSQQ',
  '0eUoazaVUu4Y83USuUTz7P',
  '5uCax9HTNlzGybIStD3vDh',
  '55Am8neGJkdj2ADaM3aw5H',
  '1KMEDSIl2j1NwYa9mgvMyg',
  '6HuyP5a5QXQNWV9vf4GkUJ',
  '7B3UAPLYAbwXVgbHSKEaTw',
  '0Gl5s8IhMmQE5YQwM8Qx1J',
  '5SDcksP8En1l6RtTY1wzHc',
  '4oHQ8n9OKQ3599e8noCrDX',
  '1VQfrKbnGSZnEFoGpfVnS8',
  '1aelh2mNAK8D1S8rkLgIfN',
  '4nVBt6MZDDP6tRVdQTgxJg',
  '6Qyc6fS4DsZjB2mRW9DsQs',
  '7ne4VBA60CxGM75vw0EYad',
  '6sy0CvtlBXtXDd6yTW0koJ',
  '0SpkyS1Q4MD8GaVcP5YjT4',
  '5BqwC9kOBbqYkzdOKeXFFk',
  '4p6MZZx5zusaVnlzclH8Ut',
  '1MhXdlCQPnO56T57MfmaRm',
  '5XeFesFbtLpXzIVDNQP22n',
  '70YTBH8vOGJNMhy6186yFm',
  '1Fid2jjqsHViMX6xNH70hE',
  '79esEXlqqmq0GPz0xQSZTV',
  '3QGsuHI8jO1Rx4JWLUh9jd',
  '3be9ACTxtcL6Zm4vJRUiPG',
  '440H25G5ApUQu9YIRnGh6L',
  '0kR3d1kzEIkVpj4tpJjglb',
  '4a1BeAIF3COAK52u6xwO55',
  '5tyMJlMqaggzvuX7TtlrTe',
  '0V5cvmTKsYmF5FmGGEAfmS',
  '3U1TuSqHIubBA10cVP7Sk6',
  '1Wdj4wRDYS7aT4CoPS0mAH',
  '45ROR8UMn60YEVQnDy0uVF',
  '2afCBiru10AFckfOa49wIa',
  '4xqrdfXkTW4T0RauPLv3WA',
  '6RiiSy9GzSwiyDEJDiMuKe',
  '1lORkxEMmsCZqhoxcmk3A3',
  '55nlbqqFVnSsArIeYSQlqx',
  '4x5YzxjrF9wvIIXJV7TveC',
  '2psRActEWsTlYYd7EDoyVR',
  '7I5WT7DtpwSAhEeDLpZEfm',
  '3T03rPwlL8NVk1yIaxeD8U',
  '0SzvmWfOhoxZVGrmvb56YL',
  '2GiJYvgVaD2HtM8GqD9EgQ',
  '00qz2B2RwRPEOJIrCNloiL',
  '1aEsTgCsv8nOjEgyEoRCpS',
  '5ajjAnNRh8bxFvaVHzpPjh',
  '1OBK4DltPHWoeilauCyckU',
  '1lzvc17qKf2CyIOSWUEH4p',
  '5kcvBnt6DPX3AMEsCx1qDh',
  '1ZLrDPgR7mvuTco3rQK8Pk',
  '6rG1DdPCTzGibgHliYJ4ws',
  '1B62o4CbdL9ckGvwsz2cgn',
  '2ASaiQWWIhao3cniyiwItc',
  '523f4oSjrZx83XDtRLnsIw',
  '3RWS7PGirAWLw2ISY4uhJD',
  '1q32AhBbgDPdBr5VyCRHq6',
  '4W4BnP8uUogCOGf3r0JeGm',
  '0dupI7MHvlSXuIHH2YXWHC',
  '33YWjVRW1hiipua8g6eTjV',
  '01twL64hJwU3kAiSsUsIVa',
  '7fzX3TDy4bKZTGGnXilgE4',
  '1ALOR6EcFzN0AcIAzwWl2U',
  '6KkEd4wacdXCmDLoI5xlYD',
  '5AWVGdsk88fcsrssrAdyEN',
  '3yHFw2lWQRLUms1Ai3SBIS',
  '0113AqU3i034Xwb1tmNYwz',
  '7xtsuU7WlDNmTzUQ32oQ7r',
  '747ZJOMxHxLgpiInjD4mR1',
  '0n3pKT2HiMJGxoAYgyezBV',
  '7M2UiRCmybJ5fuT7Wc2iDR',
  '0i7Ps1oPnc0IfUAeKiktY2',
  '1q70WDsbAwdtqCQs94pPqS',
  '10UTmRvoroe6eZ3ViwkpbN',
  '3PsHulD1zewglcTPcEPnlk',
  '20xJN09dBJBEImfp9NPdGb',
  '1HbcclMpw0q2WDWpdGCKdS',
  '4Dhic5lCf3U1nefagM5zwy',
  '2HNbvHCoekdIiRWjhoZ9eQ',
  '46Ga2kf5pfMcFINTIx0kXI',
  '0Ub0MmkwDfVgWsdurCRsuZ',
  '1CkZvm71jWLXOC5Cbtdx9D',
  '3tcbegaaVvEVoK7TDnJEA5',
  '30oFfpASNTO7vKGwQBsKIR',
  '4kJT7Yj6Za01KfKHjb7mZE',
  '0A3kG6fs1IjPtkmDTiQJDp',
  '0uhGgihlgkmAGZvp93rUwm',
  '2L9N0zZnd37dwF0clgxMGI',
  '0lAn3zpOIxAIeAFc1NF86i',
  '5avgjoyCpwlij7lgFHcvwU',
  '3QoGtpOPqLo5TJ694qwonQ',
  '0CmN570l8ZwQpI70oV8Avg',
  '6KeBus2RvySJ6J5ZOOcAoj',
  '6NgLeHmtiH12BSln4GRsDi',
  '0dhMGnSEi6yQOvsMylbHt8',
  '4yB1s08jEfpRMb0K07qCE9',
  '3yuIvz5stb9v9cljhZ5Zas',
  '1xupkmvtlZxfId3wXo4vAq',
  '2lxBZVbkiCXC1soks2RXwV',
  '3GDLQPZTi2iwUtXjZigZ4v',
  '66ruS0J0SVzuaIpShVfShY',
  '0b0hbaQZnkFDOGjOUkIbUK',
  '4m1jesCFX1gQtIRFirfwCW',
  '3VSYkAf6f46i5ZkXOHORq1',
  '6cx5CvFhqN19efStehJqoW',
  '6lvsJDZ7336YmpBzcNGhbe',
  '5W63Zcirj6bvnTxhVIKTSK',
  '47Slg6LuqLaX0VodpSCvPt',
  '2plbrEY59IikOBgBGLjaoe',
  '7mdJAkMBPkKYOLxcVPDqa0',
  '4DSNXNrBKv2rMo30c5DyTh',
  '2aTKrdenCq5qBOoJPFdn4P',
  '4Cw1fQBX3TaiZQwOAyddnj',
  '6t2SSPrM5NXn2wn3q3x3fY',
  '3ynJS2jbfoxkDPVrs6wPvJ',
  '0vg4WnUWvze6pBOJDTq99k',
  '30rtOYxOV6rho3Hza6hCrg',
  '1wVcLKdJ4AFKPhKucNvEpy',
  '0rKtyWc8bvkriBthvHKY8d',
  '2CepJuGl02QWDxRPc7gs0b',
  '7q7jyVU0f0hnod8tsaUmxg',
  '5zCunX8URvLoBHlg1Fnjv6',
  '0u2P5u6lvoDfwTYjAADbn4',
  '4WfV1CNg91SBp8oG0VY0VB',
  '5l6hpyTGBK0LAAxgPnqTQL',
  '4VuS959DSpr82t3qBqCrWG',
  '58s4iqgXFzXhBndBkg2AaD',
  '4IoYz8XqqdowINzfRrFnhi',
  '0nt9QNF9rY5mPTAV9Nn9yH',
  '6M31fPFCYB8Job3MCjjrDV',
  '1x3W8RZxW94lrVGhP95qA6',
  '1WVunZLZM2zLTm5rAvKZkF',
  '4s2wGb58RztbSvjqUK8w0a',
  '6GGtHZgBycCgGBUhZo81xe',
  '78Sw5GDo6AlGwTwanjXbGh',
  '2y3jy7uONOsC9qA0HfRkzu',
  '3qvCIYvILaiHUA0Ehv8Ttb',
  '1m8VahX3nnewYL1YR4BMBp',
  '3GUSidbQwd7xuvU6AQorRh',
  '3QaPy1KgI7nu9FJEQUgn6h',
  '11DQtEraKovCRfQkSOuTVU',
  '2WPIxceRvtnq6VtA8gjftE',
  '5EYkide3NzE6gDIHvd4Pvz',
  '4nvLuqwTOZdEJI1fcHXv8h',
  '3p4hRhMcb6ch8OLtATMaLw',
  '2hIsd0F6ZGfHCC1xa7vSad',
  '010gJrV78swYwVNAWjmWAb',
  '1Mhf6QIO0UuVr2ZvQPgymt',
  '2xfRDWDKOisEXgRnYI58Tb',
  '7Ewz6bJ97vUqk5HdkvguFQ',
  '3Mlhgm39yBpuCwyZB8d8Md',
  '3GhsBdS9ulPK3KCdwHRPhG',
  '2nD9CUfMMUVxL0UyFs8fGG',
  '4ImeysCxPlYmM4LRFp7z9f',
  '6VJYENs5BugMc1dCVepivD',
  '07i6kH81u4G4e7sczhvXtn',
  '3A1kkAIXl4IPxeJRCCF4Bc',
  '3D7AfCUJxXrc0kHOZFlsu4',
  '3g7ngtg7xK3N9nKwAjDfH3',
  '2nMeu6UenVvwUktBCpLMK9',
  '1HNkqx9Ahdgi1Ixy2xkKkL',
  '0aPZbnkMoWJaJ5CNVLCj8S',
  '2RkZ5LkEzeHGRsmDqKwmaJ',
  '5pgdZyYh16sAUkDjrqGPej',
  '7wR4drNkIHfT3JkDbL5jIg',
  '6R5fYCySNHrqo4Og6O1ppn',
  '1qe5MsENLspkHJBrLlcFO5',
  '1SKPmfSYaPsETbRHaiA18G',
  '3A02hWQ2ebOFDWSbAMNnpw',
  '6Jiexl2A8SVCdjudK9LwNC',
  '6IfPyMb0Sxptpx6jBUATOS',
  '1jXfVzMk8cSbvAXMML4Y4f',
  '6epn3r7S14KUqlReYr77hA',
  '5BZsQlgw21vDOAjoqkNgKb',
  '3DpXBc7bzSDWA7G1lrhi7P',
  '0eFMbKCRw8KByXyWBw8WO7',
  '1y5h2rARaMMsNpSLIgfMfT',
  '7gWKxBSrDUfs4dWaneLVKm',
  '5UyfSoNyldrM2iiCGfTQuA',
  '1KiJFIMQrRH14WF5ntkZbf',
  '4v7DgEMw6EvYyuQ4eWFD9l',
  '0VdikQbDdOqxdWQyYsLmne',
  '58yKyX0kcD0l35LcQvF2vS',
  '6QFnwOaQIMd9sZNsd4mUaO',
  '3FvksKvphbYzLGiYG2fwRX',
  '1BECwm5qkaBwlbfo4kpYx8',
  '5kfNriitmkNE8mUbZ7gbq8',
  '4EhqimHdoK9OmCNvCfioH6',
  '4qefHyLKbyW3yeqk5Jrjey',
  '1rWzYSHyZ5BiI4DnDRCwy7',
  '6moU77g9RQyMzHNuKEaQKq',
  '7lPN2DXiMsVn7XUKtOW1CS',
  '3WD91HQDBIavSapet3ZpjG',
  '6BFnRhvKCclDQOajt8dBGi',
  '1o82DwNisONAd2mu1RcGE6',
  '2mdEsXPu8ZmkHRRtAdC09e',
  '1NZs6n6hl8UuMaX0UC0YTz',
  '1Ist6PR2BZR3n2z2Y5R6S1',
  '4WpvTgKsoU6efxHued4HBt',
  '02H1K5Cw9Ar89b35XwSEw6',
  '3gjRRs7gmh3Euynu1cau1d',
  '5NvOZCjZaGGGL597exlQWv',
  '2IVsRhKrx8hlQBOWy4qebo',
  '7h4kuDm5aiJcq28qRfea8f',
  '2g1QPpTd4o8gTAapxEUPnz',
  '4dlXhJtGR0h75DKkE4vlD2',
  '68RI4I6SKm57SxjG06OYvN',
  '6EelrDeZGS0Z81NhXevtrJ',
  '1UU3IpxOVpjjHdoQjchpgX',
  '4Vs8RLrUdDXeaZbNeIOrtn',
  '2RnZWwiEt6wEPvJkto2u9k',
  '6Ozk0lA8yM2UFen3b7Ab4u',
  '6KeYXhkIjYY6XX1bzEbcL9',
  '1wOp7yTVyH176bW1z9WAiv',
  '55lijDD6OAjLFFUHU9tcDm',
  '6T8DEDkbCQEsnZZrEwQhcY',
  '6sGIMrtIzQjdzNndVxe397',
  '1qbmS6ep2hbBRaEZFpn7BX',
  '20QpnulmuflvwCjXnDW8I2',
  '2bi4wdaHb2RcGv4VF3nXIL',
  '2u21IsdmCsny4R64kxI6E4',
  '5y2ijHECwFYWqcAHKTZgzD',
  '5TVirkSwFEXF1nLJEebe2I'
];

// ════════════════════════════════════════════════════════════
//  CONTENT DATA
// ════════════════════════════════════════════════════════════

const LOVE_NOTES = [
  "💗 If you're reading this, I'm thinking about you. 💗",
  "💗 I wish I was there with you right now. 💗",
  "💗 You're my favorite person in every universe. 💗",
  "💗 The distance between us is temporary, but us? We are FOREVER. 💗",
  "💗 Every morning I open my eyes and think of you first. 💗",
  "💗 You make ordinary days feel like something worth celebrating. 💗",
  "💗 I fall in love with you more every single day. 💗",
  "💗 Even so far apart, I feel you with me. 💗",
  "💗 You are the answer to every question I never knew I had. 💗",
  "💗 You're the person I want to tell everything to. 💗",
  "💗 I keep a piece of you in every moment in my life. 💗",
  "💗 Counting down every second until I can hold you in my arms. 💗",
  "💗 You changed what 'home' means to me. 💗",
  "💗 I love you in ways I haven't found the words for yet. 💗",
  "💗 The best part of my day is every part that involves you. 💗",
  "💗 You are proof that the best things are worth waiting for. 💗",
  "💗 I carry you in every song, every sunset, every quiet evening. 💗",
  "💗 Being loved by you makes me the luckiest person in the world. 💗",
  "💗 You make my heart feel full even when we're apart. 💗",
  "💗 I hope your day is as wonderful as you make mine feel. 💗",
  "💗 I love you the absolute mostest. Never forget that. 💗",
  "💗 Every version of my future has you in it. 💗",
  "💗 I want every small moment with you. All of them. 💗",
  "💗 My favorite dreams are the ones with you. 💗",
  "💗 You have no idea how often I think about you. 💗",
  "💗 You are my future. My wifey. Always. No matter what. 💗",
  "💗 Waking up knowing you exist is enough to make any day better. 💗",
  "💗 I want to give you all the love you've always deserved. 💗",
  "💗 Someday the distance will just be a story we tell together. 💗",
  "💗 Everything is better because you're in my world. 💗",
];

// 9PM-3AM=night | 4AM-noon=morning | noon-9PM=evening
const TIME_GREETINGS = {
  night:   { icon:'🌙', text:'Goodnight, my princess! Please go sleep well for me.' },
  morning: { icon:'🌸', text:'Good morning, my princess! I hope you slept well! Have a perfect day for me!' },
  evening: { icon:'☀️', text:'Good evening, my princess! Hope your day is going as perfect as you!' },
};

const MISS_ME_MESSAGES = [
  { title:'Come here.',            body:"I'd hug you so tight right now. The kind of hug that says everything words can't." },
  { title:'I miss you.',           body:"More than this button can explain. More than any message could hold." },
  { title:'Right now?',            body:"I'm thinking about you. Whatever you're doing, I just want you to know that." },
  { title:'So much.',              body:"Missing you is just love overflowing with nowhere to go. So it comes right back to you." },
  { title:'Always.',               body:"There's not a moment I don't wish you were here. Not one." },
  { title:'More than words.',      body:"If I could reach through this screen and hold you — I would. Without a second thought." },
  { title:'Oh, endlessly.',        body:"I miss the way you make everything feel warmer. The way you make everything feel like home." },
  { title:'You have no idea.',     body:"How often I replay our conversations. How often I smile thinking of you." },
  { title:'Every day.',            body:"But especially right now, in this quiet moment, I miss you most of all." },
  { title:'Come back.',            body:"The world is a little less bright when you're not in it with me." },
  { title:'Too much.',             body:"But I wouldn't trade this love for anything. Not the missing, not the distance, nothing." },
  { title:'Can I tell you something?', body:"I think about you in the spaces between everything. You live there now." },
  { title:'Of course I do.',       body:"I miss you the way you miss sunshine after too many cloudy days." },
  { title:'So incredibly.',        body:"Missing you is exhausting and beautiful and completely worth it." },
  { title:'Yes. Always yes.',      body:"Every tab I open, every quiet moment — you're there. Always you." },
  { title:'More than you know.',   body:"I'd give anything for one more hour with you. Just one." },
  { title:'Every second.',         body:"But knowing you're out there loving me back makes the distance lighter." },
  { title:'Desperately.',          body:"In the softest, most patient, most loving way. I miss you like a heartbeat." },
  { title:'Right this moment.',    body:"I just want to sit with you, say nothing, and feel completely at home." },
  { title:'More than yesterday.',  body:"And less than I will tomorrow. That's how this love goes — it only grows." },
];

// ════════════════════════════════════════════════════════════
//  STORAGE
// ════════════════════════════════════════════════════════════
const KEYS = { MESSAGE:'awu_message', PHOTOS:'awu_photos_v4', START:'awu_start_date', NOTE_IDX:'awu_note_idx', NOTE_DATE:'awu_note_date', TODOS:'awu_todos_v1' };
const isChromeExt = typeof chrome !== 'undefined' && !!chrome?.storage?.local;

function store(key, value) {
  try {
    if (isChromeExt) chrome.storage.local.set({ [key]: value });
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}
function recall(key, cb) {
  try {
    if (isChromeExt) chrome.storage.local.get([key], res => cb(res[key] ?? null));
    else { const r = localStorage.getItem(key); try { cb(r !== null ? JSON.parse(r) : null); } catch { cb(r); } }
  } catch { cb(null); }
}
function forget(key) {
  try { if (isChromeExt) chrome.storage.local.remove([key]); else localStorage.removeItem(key); } catch {}
}

// ════════════════════════════════════════════════════════════
//  DOM SHORTCUTS
// ════════════════════════════════════════════════════════════
const el = id => document.getElementById(id);
const DOM = {
  clock: el('clock'), clockAmpm: el('clockAmpm'), date: el('date'),
  loveNoteText: el('loveNoteText'),
  greetingIcon: el('greetingIcon'), greetingText: el('greetingText'),
  missMeBtn: el('missMeBtn'), missMeRipple: el('missMeRipple'),
  modalOverlay: el('modalOverlay'), modalClose: el('modalClose'),
  modalOk: el('modalOk'), modalBody: el('modalBody'),
  missMeModalTitle: el('missMeModalTitle'),
  carouselTrack: el('carouselTrack'), carouselDots: el('carouselDots'),
  carouselCaption: el('carouselCaption'), carouselEmpty: el('carouselEmpty'),
  carouselPrev: el('carouselPrev'), carouselNext: el('carouselNext'),
  carouselAddBtn: el('carouselAddBtn'),
  carouselUpload: el('carouselUpload'), carouselUploadMore: el('carouselUploadMore'),
  carouselFrame: el('carouselFrame'),
  songTitle: el('songTitle'), songArtist: el('songArtist'),
  songNote: el('songNote'), songEmbedWrap: el('songEmbedWrap'),
  voiceNoteBtn: el('voiceNoteBtn'), voiceIcon: el('voiceIcon'),
  voiceLabel: el('voiceLabel'), voiceWaveform: el('voiceWaveform'),
  milestonesGrid: el('milestonesGrid'),
  togetherSince: el('togetherSince'), daysTogether: el('daysTogether'), daysTotal: el('daysTotal'),
  setDateBtn: el('setDateBtn'), dateModalOverlay: el('dateModalOverlay'),
  startDateInput: el('startDateInput'), saveDateBtn: el('saveDateBtn'),
  dateCancelBtn: el('dateCancelBtn'), dateCancelBtn2: el('dateCancelBtn2'),
  hugOverlay: el('hugOverlay'), bgCanvas: el('bgCanvas'), particles: el('particles'),
};

// ════════════════════════════════════════════════════════════
//  CANVAS BACKGROUND
// ════════════════════════════════════════════════════════════
(function() {
  const canvas = DOM.bgCanvas; if (!canvas) return;
  const ctx = canvas.getContext('2d'); let W, H;
  const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
  resize(); addEventListener('resize', resize, { passive:true });
  const orbs = Array.from({length:18}, () => ({
    x:Math.random()*innerWidth, y:Math.random()*innerHeight,
    r:45+Math.random()*85, dx:(Math.random()-.5)*.22, dy:(Math.random()-.5)*.22,
    hue:Math.random()>.5?205:325, alpha:.04+Math.random()*.07
  }));
  (function draw() {
    ctx.clearRect(0,0,W,H);
    for (const o of orbs) {
      const g = ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
      g.addColorStop(0,`hsla(${o.hue},80%,80%,${o.alpha})`);
      g.addColorStop(.5,`hsla(${o.hue},70%,85%,${o.alpha*.45})`);
      g.addColorStop(1,`hsla(${o.hue},70%,90%,0)`);
      ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      ctx.fillStyle=g; ctx.fill();
      o.x+=o.dx; o.y+=o.dy;
      if(o.x<-o.r)o.x=W+o.r; if(o.x>W+o.r)o.x=-o.r;
      if(o.y<-o.r)o.y=H+o.r; if(o.y>H+o.r)o.y=-o.r;
    }
    requestAnimationFrame(draw);
  })();
})();

// ════════════════════════════════════════════════════════════
//  SEARCH — Google autocomplete via fetch
// ════════════════════════════════════════════════════════════
(function() {
  const inp = el('searchInput'), form = el('searchForm');
  const list = el('searchSuggestions'), bar = document.querySelector('.search-bar');
  if (!inp) return;
  let idx=-1, suggs=[], timer=null;

  setTimeout(() => inp.focus(), 500);
  document.addEventListener('keydown', e => {
    if (e.key==='/' && document.activeElement!==inp) { e.preventDefault(); inp.focus(); }
  });

  async function fetch_suggs(q) {
    if (!q.trim()) { hide(); return; }
    try {
      const res = await fetch(`https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(q)}`);
      const data = await res.json();
      suggs = (data[1]||[]).slice(0,7);
      render(suggs);
    } catch { hide(); }
  }

  function render(items) {
    list.innerHTML='';
    if (!items.length) { hide(); return; }
    idx=-1;
    items.forEach(t => {
      const li=document.createElement('li');
      li.className='search-suggestion-item'; li.role='option';
      li.innerHTML=`<svg width="13" height="13" viewBox="0 0 18 18" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="M11.5 11.5L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>${t.replace(/</g,'&lt;')}</span>`;
      li.addEventListener('mousedown', e => { e.preventDefault(); inp.value=t; hide(); form.submit(); });
      list.appendChild(li);
    });
    list.classList.remove('hidden');
    bar?.classList.add('has-suggestions');
  }

  function hide() {
    list.classList.add('hidden'); list.innerHTML='';
    bar?.classList.remove('has-suggestions'); idx=-1; suggs=[];
  }

  inp.addEventListener('input', () => { clearTimeout(timer); timer=setTimeout(()=>fetch_suggs(inp.value),200); });
  inp.addEventListener('focus', () => { if(inp.value.trim()) fetch_suggs(inp.value); });
  document.addEventListener('click', e => { if(!bar?.contains(e.target)) hide(); });
  inp.addEventListener('keydown', e => {
    const items=list.querySelectorAll('.search-suggestion-item');
    if (e.key==='ArrowDown'){ e.preventDefault(); idx=Math.min(idx+1,items.length-1); items.forEach((el,i)=>el.classList.toggle('active',i===idx)); if(idx>=0) inp.value=suggs[idx]; }
    else if(e.key==='ArrowUp'){ e.preventDefault(); idx=Math.max(idx-1,-1); items.forEach((el,i)=>el.classList.toggle('active',i===idx)); if(idx>=0) inp.value=suggs[idx]; }
    else if(e.key==='Escape') hide();
    else if(e.key==='Enter'&&idx>=0){ e.preventDefault(); inp.value=suggs[idx]; hide(); form.submit(); }
  });
})();

// ════════════════════════════════════════════════════════════
//  CLOCK — always reads device local time
// ════════════════════════════════════════════════════════════
function tickClock() {
  const now=new Date(); let h=now.getHours();
  const ampm=h>=12?'PM':'AM'; h=h%12||12;
  DOM.clock.textContent=`${String(h).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  DOM.clockAmpm.textContent=ampm;
  DOM.date.textContent=now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'});
}
tickClock(); setInterval(tickClock, 1000);

// ════════════════════════════════════════════════════════════
//  TIME GREETING
// ════════════════════════════════════════════════════════════
function initTimeGreeting() {
  const h=new Date().getHours();
  const key = (h>=21||h<=3)?'night':h<12?'morning':'evening';
  const {icon,text}=TIME_GREETINGS[key];
  DOM.greetingIcon.textContent=icon;
  DOM.greetingText.textContent=text;
  const endIcon = document.getElementById('greetingIconEnd');
  if (endIcon) endIcon.textContent = icon;
}
initTimeGreeting();

// ════════════════════════════════════════════════════════════
//  DAILY LOVE NOTE
// ════════════════════════════════════════════════════════════
(function() {
  const today=new Date().toDateString();
  recall(KEYS.NOTE_DATE, savedDate => {
    recall(KEYS.NOTE_IDX, savedIdx => {
      let idx;
      if (savedDate===today && Number.isInteger(savedIdx)) idx=savedIdx%LOVE_NOTES.length;
      else { idx=Math.floor(Math.random()*LOVE_NOTES.length); store(KEYS.NOTE_IDX,idx); store(KEYS.NOTE_DATE,today); }
      const el=DOM.loveNoteText;
      el.style.opacity='0';
      setTimeout(()=>{ el.textContent=LOVE_NOTES[idx]; el.style.transition='opacity .6s ease'; el.style.opacity='1'; },150);
    });
  });
})();

// ════════════════════════════════════════════════════════════
//  CAROUSEL
// ════════════════════════════════════════════════════════════
let slides=[], current=0, slideTimer=null;
const SLIDE_MS=5000;

function buildCarousel(data) {
  slides = DEFAULT_SLIDES; // Always use hardcoded photos
  DOM.carouselTrack.innerHTML=''; DOM.carouselDots.innerHTML=''; current=0;
  slides.forEach((s,i) => {
    const sl=document.createElement('div'); sl.className='carousel-slide'+(i===0?' active':'');
    const img=new Image(); img.src=s.url; img.alt=s.caption||''; if(i!==0) img.loading='lazy';
    sl.appendChild(img); DOM.carouselTrack.appendChild(sl);
    const dot=document.createElement('button'); dot.className='carousel-dot'+(i===0?' active':'');
    dot.setAttribute('aria-label',`Photo ${i+1}`);
    dot.addEventListener('click',()=>goTo(i)); DOM.carouselDots.appendChild(dot);
  });
  setCaption(slides[0]?.caption||'');
  if(DOM.carouselEmpty) DOM.carouselEmpty.classList.add('hidden');
  if(DOM.carouselAddBtn) DOM.carouselAddBtn.classList.add('hidden');
  clearInterval(slideTimer); slideTimer=setInterval(()=>goTo(current+1),SLIDE_MS);
}

function goTo(idx) {
  const sls=DOM.carouselTrack.querySelectorAll('.carousel-slide');
  const dts=DOM.carouselDots.querySelectorAll('.carousel-dot');
  sls[current]?.classList.remove('active'); dts[current]?.classList.remove('active');
  current=((idx%slides.length)+slides.length)%slides.length;
  sls[current]?.classList.add('active'); dts[current]?.classList.add('active');
  setCaption(slides[current]?.caption||'');
  clearInterval(slideTimer); slideTimer=setInterval(()=>goTo(current+1),SLIDE_MS);
}

function setCaption() {} // captions removed

function handleFiles(files) {
  if(!files?.length) return;
  const ns=slides===DEFAULT_SLIDES?[]:[...slides]; const fi=ns.length; let n=0;
  Array.from(files).forEach(f=>{
    const r=new FileReader();
    r.onload=ev=>{ ns.push({url:ev.target.result,caption:''}); if(++n===files.length){store(KEYS.PHOTOS,ns);buildCarousel(ns);goTo(fi);} };
    r.onerror=()=>n++; r.readAsDataURL(f);
  });
}

DOM.carouselPrev.addEventListener('click',()=>goTo(current-1));
DOM.carouselNext.addEventListener('click',()=>goTo(current+1));
DOM.carouselUpload.addEventListener('change',e=>{handleFiles(e.target.files);e.target.value='';});
DOM.carouselUploadMore.addEventListener('change',e=>{handleFiles(e.target.files);e.target.value='';});
let touchX=0;
DOM.carouselFrame.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX;},{passive:true});
DOM.carouselFrame.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX; if(Math.abs(dx)>40)goTo(current+(dx<0?1:-1));},{passive:true});
buildCarousel(); // always uses hardcoded DEFAULT_SLIDES

// ════════════════════════════════════════════════════════════
//  SONG OF THE DAY
// ════════════════════════════════════════════════════════════
(function() {
  const today=new Date(); const seed=today.getFullYear()*10000+(today.getMonth()+1)*100+today.getDate();
  let h=seed^0xDEADBEEF;
  h=Math.imul(h^(h>>>16),0x45d9f3b); h=Math.imul(h^(h>>>16),0x45d9f3b); h=h^(h>>>16);
  const trackId=PLAYLIST_TRACKS[Math.abs(h)%PLAYLIST_TRACKS.length];

  DOM.songTitle.textContent='Song of the Day';
  DOM.songArtist.textContent='A new song every day, from OUR playlist 💗';
  DOM.songNote.textContent='';

  const iframe=document.createElement('iframe');
  iframe.src=`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
  iframe.width='100%'; iframe.height='152';
  iframe.allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
  iframe.setAttribute('allowfullscreen','');
  iframe.style.cssText='border:none;border-radius:1rem;display:block;';
  DOM.songEmbedWrap.innerHTML=''; DOM.songEmbedWrap.appendChild(iframe);
})();

// ════════════════════════════════════════════════════════════
//  VOICE NOTES — Spotify-style list
// ════════════════════════════════════════════════════════════
(function() {
  const MEMOS = [
    { emoji:'💗', label:'When you miss me',          src:'miss-me.mp3' },
    { emoji:'😘', label:'For kisses',                src:'kisses.mp3' },
    { emoji:'🥱', label:"When you're bored",         src:'bored.mp3' },
    { emoji:'😴', label:"When you're sleepy",        src:'sleepy.mp3' },
    { emoji:'🫂', label:'Long day',                  src:'long-day.mp3' },
    { emoji:'😂', label:'Want to laugh',             src:'laugh.mp3' },
    { emoji:'🥺', label:'Need reassurance',          src:'reassurance.mp3' },
    { emoji:'🍴', label:"When you're hungry",        src:'hungry.mp3' },
    { emoji:'🔮', label:'Our future',                src:'future.mp3' },
    { emoji:'😁', label:"When you're happy",         src:'happy.mp3' },
    { emoji:'😔', label:"When you're sad",           src:'sad.mp3' },
    { emoji:'☹️', label:"When you're pouting",       src:'pouting.mp3' },
    { emoji:'🌅', label:'When you just woke up',     src:'woke-up.mp3' },
  ];

  const listEl     = el('vmemoList');
  const player     = el('vmemoPlayer');
  const playBtn    = el('vmemoPlayBtn');
  const playerTitle= el('vmemoPlayerTitle');
  const progressBar= el('vmemoProgressBar');
  const waveformEl = el('vmemoWaveform');
  if (!listEl) return;

  let selectedIdx  = -1;
  let currentAudio = null;
  let isPlaying    = false;
  let rows         = [];

  // Build player waveform
  [4,8,14,10,18,12,16,9,5].forEach(h => {
    const b = document.createElement('div');
    b.className = 'vw-bar'; b.style.height = h + 'px';
    waveformEl.appendChild(b);
  });

  function fmtTime(s) {
    if (!s || !isFinite(s)) return '—';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${String(sec).padStart(2,'0')}`;
  }

  // Build rows — each with a separator line between them
  MEMOS.forEach((m, i) => {
    // Separator above every row except the first
    if (i > 0) {
      const sep = document.createElement('div');
      sep.className = 'vmemo-sep';
      listEl.appendChild(sep);
    }

    const row = document.createElement('div');
    row.className = 'vmemo-row';
    row.setAttribute('role', 'row');
    row.innerHTML = `
      <span class="vmemo-row__num">${i + 1}</span>
      <span class="vmemo-row__emoji">${m.emoji}</span>
      <span class="vmemo-row__title">${m.label}</span>
      <span class="vmemo-row__dur" data-idx="${i}">—</span>
      <button class="vmemo-row__play" aria-label="Play ${m.label}">
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><polygon points="2,1 13,7 2,13" fill="currentColor"/></svg>
      </button>`;

    const playRowBtn = row.querySelector('.vmemo-row__play');
    row.addEventListener('click', e => { if (!e.target.closest('.vmemo-row__play')) selectMemo(i); });
    playRowBtn.addEventListener('click', e => { e.stopPropagation(); selectMemo(i); });

    listEl.appendChild(row);
    rows.push(row);

    // Pre-load duration for each track
    const probe = new Audio(m.src);
    probe.preload = 'metadata';
    probe.addEventListener('loadedmetadata', () => {
      const durEl = listEl.querySelector(`.vmemo-row__dur[data-idx="${i}"]`);
      if (durEl) durEl.textContent = fmtTime(probe.duration);
    });
  });

  function selectMemo(i) {
    stopAudio();
    selectedIdx = i;
    player.classList.remove('hidden');
    playerTitle.textContent = MEMOS[i].label;
    progressBar.style.width = '0%';
    playMemo(i);
  }

  playBtn.addEventListener('click', () => {
    if (selectedIdx < 0) return;
    isPlaying ? pauseAudio() : playMemo(selectedIdx);
  });

  function playMemo(i) {
    const src = MEMOS[i].src;
    if (!currentAudio || currentAudio._src !== src) {
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
      currentAudio = new Audio(src);
      currentAudio._src = src;
      currentAudio.addEventListener('timeupdate', onTimeUpdate);
      currentAudio.addEventListener('ended', onEnded);
      currentAudio.addEventListener('error', onError);
    }
    currentAudio.play().then(() => setPlaying(true, i)).catch(onError);
  }

  function pauseAudio() { currentAudio?.pause(); setPlaying(false, selectedIdx); }
  function stopAudio() {
    if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null; }
    setPlaying(false, null);
    progressBar.style.width = '0%';
  }

  function setPlaying(state, idx) {
    isPlaying = state;
    playBtn.querySelector('.vmemo-icon-play').classList.toggle('hidden', state);
    playBtn.querySelector('.vmemo-icon-pause').classList.toggle('hidden', !state);
    playBtn.classList.toggle('is-playing', state);
    waveformEl.classList.toggle('active', state);

    rows.forEach((row, j) => {
      const numEl = row.querySelector('.vmemo-row__num');
      row.classList.toggle('is-playing', state && j === idx);
      if (state && j === idx) {
        numEl.innerHTML = '<div class="vmemo-playing-bars"><span></span><span></span><span></span></div>';
      } else {
        numEl.textContent = j + 1;
      }
    });
  }

  function onTimeUpdate() {
    if (!currentAudio?.duration) return;
    progressBar.style.width = (currentAudio.currentTime / currentAudio.duration * 100) + '%';
  }
  function onEnded() {
    setPlaying(false, selectedIdx);
    progressBar.style.width = '100%';
    setTimeout(() => { progressBar.style.width = '0%'; }, 600);
  }
  function onError() {
    setPlaying(false, selectedIdx);
    if (playerTitle) playerTitle.textContent = (MEMOS[selectedIdx]?.label||'') + ' — coming soon 💙';
  }
})();


// ════════════════════════════════════════════════════════════
//  MINI CALENDAR
// ════════════════════════════════════════════════════════════
(function() {
  const grid   = el('calGrid');
  const label  = el('calLabel');
  const prev   = el('calPrev');
  const next   = el('calNext');
  if (!grid) return;

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS   = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  // Anniversary and special dates (month 0-based)
  const SPECIAL = [
    { month:7, day:25 }, // Aug 25 — anniversary
    { month:7, day:3  }, // Aug 3  — Sophie's birthday
    { month:1, day:7  }, // Feb 7  — Joshua's birthday
  ];

  const now = new Date();
  let view  = { year: now.getFullYear(), month: now.getMonth() };

  function isSpecial(y, m, d) {
    return SPECIAL.some(s => s.month === m && s.day === d);
  }

  function render() {
    grid.innerHTML = '';
    label.textContent = MONTHS[view.month] + ' ' + view.year;

    // Day headers
    DAYS.forEach(d => {
      const cell = document.createElement('div');
      cell.className = 'cal-day-label'; cell.textContent = d;
      grid.appendChild(cell);
    });

    const firstDay = new Date(view.year, view.month, 1).getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const prevDays = new Date(view.year, view.month, 0).getDate();

    // Prev month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const cell = document.createElement('div');
      cell.className = 'cal-day other-month';
      cell.textContent = prevDays - i;
      grid.appendChild(cell);
    }

    // Current month
    for (let d = 1; d <= daysInMonth; d++) {
      const cell = document.createElement('div');
      let cls = 'cal-day';
      const isToday = (view.year === now.getFullYear() && view.month === now.getMonth() && d === now.getDate());
      const isSp = isSpecial(view.year, view.month, d);
      if (isToday) cls += ' today';
      else if (isSp) cls += ' anniv';
      cell.className = cls;
      cell.textContent = d;
      grid.appendChild(cell);
    }

    // Next month leading days
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let d = 1; d <= remaining; d++) {
      const cell = document.createElement('div');
      cell.className = 'cal-day other-month';
      cell.textContent = d;
      grid.appendChild(cell);
    }
  }

  prev.addEventListener('click', () => {
    view.month--;
    if (view.month < 0) { view.month = 11; view.year--; }
    render();
  });
  next.addEventListener('click', () => {
    view.month++;
    if (view.month > 11) { view.month = 0; view.year++; }
    render();
  });

  render();
})();

// ════════════════════════════════════════════════════════════
//  TO-DO LIST
// ════════════════════════════════════════════════════════════
(function() {
  const toggleBtn=el('todoToggleInput'), addRow=el('todoAddRow'),
        newInp=el('todoNewInput'), submitBtn=el('todoSubmitBtn'),
        listEl=el('todoList'), countEl=el('todoCount'), clearBtn=el('todoClearDone');
  if(!listEl) return;

  // Load saved tasks
  recall(KEYS.TODOS, saved => {
    if (Array.isArray(saved)) saved.forEach(t=>renderTask(t));
    updateCount();
  });

  // Toggle add row
  toggleBtn?.addEventListener('click',()=>{
    addRow.classList.toggle('hidden');
    if (!addRow.classList.contains('hidden')) newInp.focus();
  });

  // Submit
  const submit=()=>{
    const text=newInp.value.trim(); if(!text) return;
    const task={id:Date.now(),text,done:false};
    renderTask(task,true); saveTasks(); updateCount();
    newInp.value=''; newInp.focus();
  };
  submitBtn?.addEventListener('click',submit);
  newInp?.addEventListener('keydown',e=>{
    if(e.key==='Enter'){e.preventDefault();submit();}
    if(e.key==='Escape'){addRow.classList.add('hidden');}
  });

  // Clear done
  clearBtn?.addEventListener('click',()=>{
    listEl.querySelectorAll('.todo-item.done').forEach(li=>li.remove());
    saveTasks(); updateCount();
  });

  function renderTask(task, animate=false) {
    const li=document.createElement('li');
    li.className='todo-item'+(task.done?' done':''); li.dataset.id=task.id;
    li.innerHTML=`
      <button class="todo-check${task.done?' checked':''}" aria-label="Toggle done" title="${task.done?'Mark undone':'Mark done'}">
        ${task.done?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l3 3 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}
      </button>
      <span class="todo-text">${esc(task.text)}</span>
      <div class="todo-actions">
        <button class="todo-btn todo-btn--edit" title="Edit">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
        </button>
        <button class="todo-btn todo-btn--del" title="Delete">
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>`;

    // Toggle done
    li.querySelector('.todo-check').addEventListener('click',()=>{
      task.done=!task.done;
      li.classList.toggle('done',task.done);
      const btn=li.querySelector('.todo-check');
      btn.classList.toggle('checked',task.done);
      btn.innerHTML=task.done?'<svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5l3 3 4-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
      saveTasks(); updateCount();
    });

    // Delete
    li.querySelector('.todo-btn--del').addEventListener('click',()=>{
      li.style.cssText='opacity:0;transform:translateX(10px);transition:all .2s ease';
      setTimeout(()=>{li.remove();saveTasks();updateCount();},200);
    });

    // Edit
    li.querySelector('.todo-btn--edit').addEventListener('click',()=>{
      const span=li.querySelector('.todo-text');
      const inp=document.createElement('input');
      inp.className='todo-edit-inp'; inp.value=task.text;
      span.replaceWith(inp); inp.focus(); inp.select();
      const done=()=>{ const v=inp.value.trim(); if(v){task.text=v;saveTasks();} const s2=document.createElement('span'); s2.className='todo-text'; s2.textContent=task.text; inp.replaceWith(s2); };
      inp.addEventListener('blur',done);
      inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();inp.blur();}if(e.key==='Escape'){inp.value=task.text;inp.blur();}});
    });

    if(animate){
      li.style.opacity='0'; li.style.transform='translateY(-6px)';
      listEl.appendChild(li);
      requestAnimationFrame(()=>{ li.style.transition='opacity .25s ease, transform .25s ease'; li.style.opacity='1'; li.style.transform='none'; });
    } else { listEl.appendChild(li); }
  }

  function saveTasks(){
    const tasks=Array.from(listEl.querySelectorAll('.todo-item')).map(li=>({
      id:Number(li.dataset.id),
      text:li.querySelector('.todo-text')?.textContent||li.querySelector('.todo-edit-inp')?.value||'',
      done:li.classList.contains('done')
    }));
    store(KEYS.TODOS, tasks);
  }

  function updateCount(){
    const total=listEl.children.length, done=listEl.querySelectorAll('.done').length;
    if(countEl) countEl.innerHTML=total===0?''
      : done===total&&total>0?'all done! 🎉'
      : `<span>${done}</span> of ${total} done`;
    const prog=el('todoProgress');
    if(prog) prog.style.width=total?`${(done/total)*100}%`:'0%';
  }

  function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
})();


// ════════════════════════════════════════════════════════════
//  MODAL HELPERS
// ════════════════════════════════════════════════════════════
function openModal(ov){ ov.classList.remove('hidden'); }
function closeModal(ov){
  ov.style.opacity='0'; ov.style.transition='opacity .24s ease';
  setTimeout(()=>{ ov.classList.add('hidden'); ov.style.opacity=''; ov.style.transition=''; },250);
}

// ════════════════════════════════════════════════════════════
//  TOGETHER SINCE
// ════════════════════════════════════════════════════════════
function calcDuration(ds){
  const s=new Date(ds+'T00:00:00'), now=new Date();
  let Y=now.getFullYear()-s.getFullYear(), M=now.getMonth()-s.getMonth(), D=now.getDate()-s.getDate();
  if(D<0){M--;D+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
  if(M<0){Y--;M+=12;}
  return {years:Y,months:M,days:D,totalDays:Math.floor((now-s)/86400000)};
}

function renderStartDate(ds){
  DOM.startDateInput.value=ds;
  const s=new Date(ds+'T00:00:00');
  const {years,months,days,totalDays}=calcDuration(ds);
  if(DOM.togetherSince) DOM.togetherSince.textContent=s.toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'});
  const parts=[];
  if(years>0) parts.push(`${years}yr`);
  if(months>0) parts.push(`${months}mo`);
  parts.push(`${days}d`);
  if(DOM.daysTogether) DOM.daysTogether.textContent=parts.join(' ');
  if(DOM.daysTotal) DOM.daysTotal.textContent=totalDays.toLocaleString().replace(/,/g,'');
}

recall(KEYS.START, val=>renderStartDate(val||TOGETHER_SINCE));
DOM.setDateBtn.addEventListener('click',()=>openModal(DOM.dateModalOverlay));
DOM.dateCancelBtn.addEventListener('click',()=>closeModal(DOM.dateModalOverlay));
DOM.dateCancelBtn2.addEventListener('click',()=>closeModal(DOM.dateModalOverlay));
DOM.dateModalOverlay.addEventListener('click',e=>{ if(e.target===DOM.dateModalOverlay) closeModal(DOM.dateModalOverlay); });
DOM.saveDateBtn.addEventListener('click',()=>{
  const v=DOM.startDateInput.value; if(!v) return;
  store(KEYS.START,v); renderStartDate(v); closeModal(DOM.dateModalOverlay); burstParticles(8);
});

// ════════════════════════════════════════════════════════════
//  MILESTONES — smart year logic
// ════════════════════════════════════════════════════════════
function getMilestoneData() {
  const now = new Date(); now.setHours(0,0,0,0);
  const thisYear = now.getFullYear();
  const nextYear = thisYear + 1;

  const raw = [
    { emoji:'🎂', name:"Joshua's Birthday",  month:2,  day:7,  fixedYear:null,  color:'linear-gradient(90deg,#7ec8f7,#45a8e8)' },
    { emoji:'🎂', name:"Sophie's Birthday",   month:8,  day:3,  fixedYear:null,  color:'linear-gradient(90deg,#ffc8e8,#ff90c8)' },
    { emoji:'💍', name:'Our Anniversary',     month:8,  day:25, fixedYear:null,  color:'linear-gradient(90deg,#e8c0ff,#c880ff)' },
    { emoji:'🎄', name:'Christmas',           month:12, day:25, fixedYear:null,  color:'linear-gradient(90deg,#a8e8a8,#60c860)' },
    { emoji:'🎆', name:"New Year's",          month:1,  day:1,  fixedYear:'next', color:'linear-gradient(90deg,#f0c060,#e8a030)' },
    { emoji:'💒', name:'Our Wedding',         month:8,  day:25, fixedYear:2033,  color:'linear-gradient(90deg,#ffc8e8,#ffb0dd)' },
  ];

  return raw.map(m => {
    let year;
    if (m.fixedYear === 'next') {
      year = nextYear; // New Year's always next calendar year
    } else if (m.fixedYear) {
      year = m.fixedYear; // Wedding fixed to 2033
    } else {
      // Use this year; if date already passed, use next year
      const candidate = new Date(thisYear, m.month - 1, m.day);
      year = candidate < now ? thisYear + 1 : thisYear;
    }
    const dateStr = `${year}-${String(m.month).padStart(2,'0')}-${String(m.day).padStart(2,'0')}`;
    const d = new Date(dateStr + 'T00:00:00');
    return { ...m, date: dateStr, _date: d, _diff: d - now };
  }).sort((a,b) => {
    if (a._diff >= 0 && b._diff >= 0) return a._diff - b._diff;
    if (a._diff <  0 && b._diff <  0) return b._diff - a._diff;
    return a._diff >= 0 ? -1 : 1;
  });
}

let milestoneData = getMilestoneData();

function buildMilestones() {
  DOM.milestonesGrid.innerHTML = '';
  milestoneData.forEach(m => {
    const card = document.createElement('div');
    card.className = 'milestone-card';
    card.style.setProperty('--mc', m.color || 'linear-gradient(90deg,var(--b3),var(--b4))');
    const ds = m._date.toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' });
    let inner;
    if (m._diff === 0) {
      inner = `<span class="milestone-today">Today! 🎉</span>`;
    } else if (m._diff < 0) {
      card.classList.add('completed');
      const ago = Math.abs(Math.floor(m._diff / 86400000));
      inner = `<span class="milestone-past">✓ ${ago}d ago</span>`;
    } else {
      const id = `ms-${m.date}`;
      const { d, h, mn, s } = dp(m._date.getTime());
      inner = `<div class="milestone-countdown">
        <div class="milestone-unit"><span class="milestone-unit__value" id="${id}-d">${d}</span><span class="milestone-unit__label">days</span></div>
        <span class="milestone-separator">:</span>
        <div class="milestone-unit"><span class="milestone-unit__value" id="${id}-h">${pad(h)}</span><span class="milestone-unit__label">hrs</span></div>
        <span class="milestone-separator">:</span>
        <div class="milestone-unit"><span class="milestone-unit__value" id="${id}-m">${pad(mn)}</span><span class="milestone-unit__label">min</span></div>
        <span class="milestone-separator">:</span>
        <div class="milestone-unit"><span class="milestone-unit__value" id="${id}-s">${pad(s)}</span><span class="milestone-unit__label">sec</span></div>
      </div>`;
    }
    card.innerHTML = `<span class="milestone-emoji">${m.emoji}</span><span class="milestone-name">${m.name}</span><span class="milestone-date-str">${ds}</span>${inner}`;
    DOM.milestonesGrid.appendChild(card);
  });
}

function tickMilestones() {
  milestoneData.forEach(m => {
    if (m._diff <= 0) return;
    const { d, h, mn, s } = dp(m._date.getTime());
    const id = `ms-${m.date}`;
    const set = (sf, v) => { const e = el(`${id}-${sf}`); if (e) e.textContent = v; };
    set('d', d); set('h', pad(h)); set('m', pad(mn)); set('s', pad(s));
  });
}

function dp(t,n=Date.now()){ const sec=Math.max(0,Math.floor((t-n)/1000)); return {d:Math.floor(sec/86400),h:Math.floor((sec%86400)/3600),mn:Math.floor((sec%3600)/60),s:sec%60}; }
const pad=n=>String(n).padStart(2,'0');
buildMilestones(); setInterval(tickMilestones,1000);

// ════════════════════════════════════════════════════════════
//  PARTICLES
// ════════════════════════════════════════════════════════════
const PE=['💙','💙','🩵','✦','·','°','˚'];
const PC=['rgba(126,200,247,.7)','rgba(190,226,255,.8)','rgba(255,200,232,.7)','rgba(222,242,255,.9)'];

function spawnParticle(cx,cy){
  const p=document.createElement('div'); p.className='particle';
  if(Math.random()>.4){ p.textContent=PE[Math.floor(Math.random()*PE.length)]; p.style.cssText=`font-size:${.65+Math.random()*.9}rem;background:transparent;border-radius:0;`; }
  else{ const sz=4+Math.random()*7; p.style.cssText=`width:${sz}px;height:${sz}px;background:${PC[Math.floor(Math.random()*PC.length)]};`; }
  const sp=110, px=(cx??Math.random()*innerWidth)+(Math.random()-.5)*sp, py=(cy??Math.random()*innerHeight*.8)+(Math.random()-.5)*sp*.5;
  p.style.left=`${px}px`; p.style.bottom=`${innerHeight-py}px`;
  const dur=4.5+Math.random()*5; p.style.animationDuration=`${dur}s`; p.style.animationDelay=`${Math.random()*.3}s`;
  DOM.particles.appendChild(p); setTimeout(()=>p.remove(),(dur+.4)*1000);
}
function burstParticles(n,cx,cy){ for(let i=0;i<n;i++) setTimeout(()=>spawnParticle(cx,cy),i*48); }
// ambient particles removed — burst still fires on interactions


// ════════════════════════════════════════════════════════════
//  WEATHER — Sydney, Australia (Sophie's location)
// ════════════════════════════════════════════════════════════
(function() {
  const grid = el('weatherGrid');
  if (!grid) return;

  // Hornsby, NSW, Australia
  const LAT = -33.7040, LON = 151.0988;
  const UNIT = 'celsius'; // metric

  // Weather code → emoji + description
  function parseCode(code, isDay) {
    const map = {
      0: [isDay?'☀️':'🌙','Clear'],
      1: [isDay?'🌤️':'🌙','Mostly clear'],
      2: ['⛅','Partly cloudy'],
      3: ['☁️','Overcast'],
      45: ['🌫️','Foggy'], 48: ['🌫️','Icy fog'],
      51: ['🌦️','Light drizzle'], 53: ['🌧️','Drizzle'], 55: ['🌧️','Heavy drizzle'],
      61: ['🌧️','Light rain'], 63: ['🌧️','Rain'], 65: ['🌧️','Heavy rain'],
      71: ['🌨️','Light snow'], 73: ['🌨️','Snow'], 75: ['❄️','Heavy snow'],
      80: ['🌦️','Showers'], 81: ['🌧️','Rain showers'], 82: ['⛈️','Heavy showers'],
      95: ['⛈️','Thunderstorm'], 96: ['⛈️','Thunderstorm+hail'], 99: ['⛈️','Severe storm'],
    };
    return map[code] || ['🌡️','Unknown'];
  }

  function fmt(t) { return Math.round(t) + '°C'; }
  function fmtTime(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  }

  const FORECAST_URL_TODAY = `https://open-meteo.com/en/docs#latitude=${LAT}&longitude=${LON}`;
  const WTTR_URL = `https://www.google.com/search?q=Hornsby+Australia+weather`;

  async function loadWeather() {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}`
        + `&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,is_day,relative_humidity_2m`
        + `&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,windspeed_10m_max,sunrise,sunset`
        + `&temperature_unit=celsius&windspeed_unit=kmh&forecast_days=2&timezone=Australia/Sydney`;

      const res = await fetch(url);
      const data = await res.json();
      const c = data.current, d = data.daily;

      const todayCode = d.weathercode[0];
      const tmrwCode  = d.weathercode[1];
      const [todayIcon, todayDesc] = parseCode(todayCode, c.is_day);
      const [tmrwIcon,  tmrwDesc]  = parseCode(tmrwCode, 1);

      grid.innerHTML = `
        <!-- Today -->
        <a class="weather-card" href="${WTTR_URL}" target="_blank" rel="noopener">
          <span class="weather-day">Today · Hornsby</span>
          <span class="weather-icon">${todayIcon}</span>
          <span class="weather-temp">${fmt(c.temperature_2m)}</span>
          <span class="weather-feels">Feels like ${fmt(c.apparent_temperature)}</span>
          <span class="weather-desc">${todayDesc}</span>
          <div class="weather-detail-row">
            <span class="weather-detail">↑ ${fmt(d.temperature_2m_max[0])} ↓ ${fmt(d.temperature_2m_min[0])}</span>
            <span class="weather-detail">💧 ${c.relative_humidity_2m}%</span>
            <span class="weather-detail">💨 ${Math.round(c.windspeed_10m)} km/h</span>
          </div>
          <div class="weather-detail-row">
            <span class="weather-detail">🌅 ${fmtTime(d.sunrise[0])}</span>
            <span class="weather-detail">🌇 ${fmtTime(d.sunset[0])}</span>
          </div>
        </a>
        <!-- Tomorrow -->
        <a class="weather-card" href="${WTTR_URL}" target="_blank" rel="noopener">
          <span class="weather-day">Tomorrow · Hornsby</span>
          <span class="weather-icon">${tmrwIcon}</span>
          <span class="weather-temp">${fmt(d.temperature_2m_max[1])}</span>
          <span class="weather-feels">Low ${fmt(d.temperature_2m_min[1])}</span>
          <span class="weather-desc">${tmrwDesc}</span>
          <div class="weather-detail-row">
            <span class="weather-detail">↑ ${fmt(d.temperature_2m_max[1])} ↓ ${fmt(d.temperature_2m_min[1])}</span>
            <span class="weather-detail">🌧 ${d.precipitation_sum[1]}mm</span>
            <span class="weather-detail">💨 ${Math.round(d.windspeed_10m_max[1])} km/h</span>
          </div>
          <div class="weather-detail-row">
            <span class="weather-detail">🌅 ${fmtTime(d.sunrise[1])}</span>
            <span class="weather-detail">🌇 ${fmtTime(d.sunset[1])}</span>
          </div>
        </a>`;
    } catch(e) {
      grid.innerHTML = '<div class="weather-error">Weather unavailable — extensions need internet permission. Check manifest.</div>';
    }
  }

  loadWeather();
  // Refresh every 30 minutes
  setInterval(loadWeather, 30 * 60 * 1000);
})();

// ════════════════════════════════════════════════════════════
//  DARK MODE TOGGLE
// ════════════════════════════════════════════════════════════
(function() {
  const btn     = document.getElementById('darkToggle');
  const moon    = btn?.querySelector('.dark-toggle__moon');
  const sun     = btn?.querySelector('.dark-toggle__sun');
  const DARK_KEY = 'awu_dark_mode';

  function applyDark(on) {
    document.body.classList.toggle('dark-mode', on);
    // Swap icon inside thumb
    if (moon) moon.classList.toggle('hidden', on);
    if (sun)  sun.classList.toggle('hidden', !on);
  }

  recall(DARK_KEY, val => applyDark(!!val));

  btn?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    applyDark(!isDark);
    store(DARK_KEY, !isDark);
  });
})();

// ════════════════════════════════════════════════════════════
//  QUICK CONVERSIONS
// ════════════════════════════════════════════════════════════
(function() {
  // ── Exchange rate: AUD ↔ USD via Frankfurter API ──────────
  let audRate = null;
  let updatingRate = false;

  async function fetchAudRate() {
    try {
      const res = await fetch('https://api.frankfurter.app/latest?from=AUD&to=USD');
      const data = await res.json();
      audRate = data.rates.USD;
      const rateEl = document.getElementById('audUsdRate');
      if (rateEl) rateEl.textContent = `1 AUD = ${audRate.toFixed(4)} USD`;
      const subEl = document.getElementById('audUsdSub');
      if (subEl) {
        const updated = new Date(data.date);
        subEl.textContent = `Updated ${updated.toLocaleDateString('en-AU', {month:'short', day:'numeric'})}`;
      }
      // Seed AUD→USD on load
      const audIn = document.getElementById('audAmountInput');
      if (audIn && audIn.value) updateFromAud();
    } catch(e) {
      const rateEl = document.getElementById('audUsdRate');
      if (rateEl) rateEl.textContent = 'Rate unavailable';
    }
  }

  function updateFromAud() {
    if (audRate === null || updatingRate) return;
    updatingRate = true;
    const audIn = document.getElementById('audAmountInput');
    const usdIn = document.getElementById('usdAmountInput');
    if (!audIn || !usdIn) { updatingRate = false; return; }
    const val = parseFloat(audIn.value);
    usdIn.value = isNaN(val) ? '' : (val * audRate).toFixed(2);
    updatingRate = false;
  }

  function updateFromUsd() {
    if (audRate === null || updatingRate) return;
    updatingRate = true;
    const audIn = document.getElementById('audAmountInput');
    const usdIn = document.getElementById('usdAmountInput');
    if (!audIn || !usdIn) { updatingRate = false; return; }
    const val = parseFloat(usdIn.value);
    audIn.value = isNaN(val) ? '' : (val / audRate).toFixed(2);
    updatingRate = false;
  }

  document.getElementById('audAmountInput')?.addEventListener('input', updateFromAud);
  document.getElementById('usdAmountInput')?.addEventListener('input', updateFromUsd);
  fetchAudRate();
  setInterval(fetchAudRate, 60 * 60 * 1000); // refresh every hour

  // ── Temperature: °C ↔ °F ─────────────────────────────────
  const cInput = document.getElementById('celsiusInput');
  const fInput = document.getElementById('fahrenheitInput');
  let updatingTemp = false;

  cInput?.addEventListener('input', () => {
    if (updatingTemp) return;
    updatingTemp = true;
    const c = parseFloat(cInput.value);
    fInput.value = isNaN(c) ? '' : ((c * 9/5) + 32).toFixed(1);
    updatingTemp = false;
  });
  fInput?.addEventListener('input', () => {
    if (updatingTemp) return;
    updatingTemp = true;
    const f = parseFloat(fInput.value);
    cInput.value = isNaN(f) ? '' : ((f - 32) * 5/9).toFixed(1);
    updatingTemp = false;
  });

  // ── Distance: km ↔ miles ──────────────────────────────────
  const kmInput = document.getElementById('kmInput');
  const miInput = document.getElementById('milesInput');
  let updatingDist = false;

  kmInput?.addEventListener('input', () => {
    if (updatingDist) return;
    updatingDist = true;
    const km = parseFloat(kmInput.value);
    miInput.value = isNaN(km) ? '' : (km * 0.621371).toFixed(3);
    updatingDist = false;
  });
  miInput?.addEventListener('input', () => {
    if (updatingDist) return;
    updatingDist = true;
    const mi = parseFloat(miInput.value);
    kmInput.value = isNaN(mi) ? '' : (mi / 0.621371).toFixed(3);
    updatingDist = false;
  });
})();

// ════════════════════════════════════════════════════════════
//  MY SPACE — Quick Copy Clipboard + Scratch Pad
// ════════════════════════════════════════════════════════════
(function() {
  const CLIPS_KEY = 'awu_clips_v1';
  const PAD_KEY   = 'awu_scratch_v1';

  // Default snippets — Sophie can edit/add her own
  const DEFAULT_CLIPS = [
    { id: 1, label: 'Student ID',   value: '' },
    { id: 2, label: 'Uni Address',  value: '' },
    { id: 3, label: 'Home Address', value: '' },
    { id: 4, label: 'My Number',    value: '' },
  ];

  let clips = [];

  // ── Clip rendering ─────────────────────────────────────────
  function saveClips() {
    store(CLIPS_KEY, clips);
  }

  function renderClips() {
    const list = document.getElementById('clipList');
    if (!list) return;
    list.innerHTML = '';
    clips.forEach(clip => {
      const row = document.createElement('div');
      row.className = 'clip-row';
      row.dataset.id = clip.id;

      const label = document.createElement('span');
      label.className = 'clip-label';
      label.textContent = clip.label || 'Label';
      label.title = 'Click to edit';

      const value = document.createElement('span');
      value.className = 'clip-value' + (clip.value ? '' : ' clip-value--empty');
      value.textContent = clip.value || 'click to set…';
      value.title = clip.value || '';

      const copyBtn = document.createElement('button');
      copyBtn.className = 'clip-copy-btn';
      copyBtn.textContent = 'Copy';

      const delBtn = document.createElement('button');
      delBtn.className = 'clip-delete-btn';
      delBtn.title = 'Remove';
      delBtn.textContent = '✕';

      // Copy to clipboard
      copyBtn.addEventListener('click', () => {
        if (!clip.value) { openEdit(clip.id); return; }
        navigator.clipboard.writeText(clip.value).then(() => {
          copyBtn.textContent = 'Copied!';
          copyBtn.classList.add('copied');
          setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1600);
        });
      });

      // Open edit on label or value click
      [label, value].forEach(el => el.addEventListener('click', () => openEdit(clip.id)));

      // Delete
      delBtn.addEventListener('click', () => {
        clips = clips.filter(c => c.id !== clip.id);
        saveClips();
        renderClips();
      });

      row.appendChild(label);
      row.appendChild(value);
      row.appendChild(copyBtn);
      row.appendChild(delBtn);
      list.appendChild(row);
    });
  }

  function openEdit(id) {
    const list = document.getElementById('clipList');
    if (!list) return;
    const clip = clips.find(c => c.id === id);
    if (!clip) return;

    const row = list.querySelector(`.clip-row[data-id="${id}"]`);
    if (!row) return;

    const editRow = document.createElement('div');
    editRow.className = 'clip-edit-row';

    const labelInput = document.createElement('input');
    labelInput.className = 'clip-edit-input';
    labelInput.type = 'text';
    labelInput.value = clip.label;
    labelInput.placeholder = 'Label (e.g. Student ID)';
    labelInput.maxLength = 30;

    const valueInput = document.createElement('input');
    valueInput.className = 'clip-edit-input';
    valueInput.type = 'text';
    valueInput.value = clip.value;
    valueInput.placeholder = 'Content to copy…';
    valueInput.maxLength = 500;

    const actions = document.createElement('div');
    actions.className = 'clip-edit-actions';

    const saveBtn = document.createElement('button');
    saveBtn.className = 'clip-edit-save';
    saveBtn.textContent = 'Save';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'clip-edit-cancel';
    cancelBtn.textContent = 'Cancel';

    saveBtn.addEventListener('click', () => {
      clip.label = labelInput.value.trim() || 'Label';
      clip.value = valueInput.value.trim();
      saveClips();
      editRow.replaceWith(row);
      renderClips();
    });

    cancelBtn.addEventListener('click', () => {
      editRow.replaceWith(row);
    });

    valueInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') saveBtn.click();
      if (e.key === 'Escape') cancelBtn.click();
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);
    editRow.appendChild(labelInput);
    editRow.appendChild(valueInput);
    editRow.appendChild(actions);
    row.replaceWith(editRow);
    valueInput.focus();
  }

  // Add snippet button
  document.getElementById('clipAddBtn')?.addEventListener('click', () => {
    const newClip = { id: Date.now(), label: 'New snippet', value: '' };
    clips.push(newClip);
    saveClips();
    renderClips();
    // Open edit immediately
    setTimeout(() => openEdit(newClip.id), 50);
  });

  // Load clips from storage
  recall(CLIPS_KEY, saved => {
    clips = (saved && saved.length) ? saved : JSON.parse(JSON.stringify(DEFAULT_CLIPS));
    renderClips();
  });

  // ── Scratch Pad ────────────────────────────────────────────
  const pad   = document.getElementById('scratchPad');
  const count = document.getElementById('scratchCount');
  const saved = document.getElementById('scratchSaved');
  let saveTimer;

  function updateCount() {
    if (!pad || !count) return;
    count.textContent = `${pad.value.length} / 2000`;
  }

  function savePad() {
    if (!pad) return;
    store(PAD_KEY, pad.value);
    if (saved) {
      saved.textContent = 'Saved ✓';
      saved.style.opacity = '1';
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => { saved.style.opacity = '0'; }, 2000);
    }
  }

  pad?.addEventListener('input', () => {
    updateCount();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(savePad, 800);
  });

  // ── Enter key: auto-continue bullet / numbered lists ──────
  pad?.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;

    const val = pad.value;
    const pos = pad.selectionStart;

    // Find start of current line
    const lineStart = val.lastIndexOf('\n', pos - 1) + 1;
    const lineEnd = val.indexOf('\n', pos);
    const lineEndActual = lineEnd === -1 ? val.length : lineEnd;
    const line = val.slice(lineStart, lineEndActual);

    // Check if line starts with a bullet
    const bulletMatch = line.match(/^(• )(.*)/);
    // Check if line starts with a number
    const numMatch = line.match(/^(\d+)\. (.*)/);

    if (!bulletMatch && !numMatch) return; // normal Enter

    e.preventDefault();

    const content = bulletMatch ? bulletMatch[2] : numMatch[2];

    // If the line is ONLY the prefix with no content, stop the list
    if (content.trim() === '') {
      // Remove the empty prefix line and insert a plain newline
      pad.value = val.slice(0, lineStart) + val.slice(lineEndActual);
      const newPos = lineStart;
      pad.setSelectionRange(newPos, newPos);
      // Now insert a plain newline at cursor
      const v2 = pad.value;
      const p2 = pad.selectionStart;
      pad.value = v2.slice(0, p2) + '\n' + v2.slice(p2);
      pad.setSelectionRange(p2 + 1, p2 + 1);
    } else {
      // Insert newline + next prefix after cursor position
      let nextPrefix;
      if (bulletMatch) {
        nextPrefix = '• ';
      } else {
        nextPrefix = `${parseInt(numMatch[1]) + 1}. `;
      }
      const before = val.slice(0, pos);
      const after = val.slice(pos);
      pad.value = before + '\n' + nextPrefix + after;
      const newPos = pos + 1 + nextPrefix.length;
      pad.setSelectionRange(newPos, newPos);
    }

    updateCount();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(savePad, 800);
  });

  // ── Toolbar: bullet + number buttons ─────────────────────
  function prefixCurrentLine(prefix) {
    if (!pad) return;
    const start = pad.selectionStart;
    const val = pad.value;

    // Find start of current line
    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
    // Find end of current line
    const lineEnd = val.indexOf('\n', start);
    const lineEndActual = lineEnd === -1 ? val.length : lineEnd;
    const line = val.slice(lineStart, lineEndActual);

    // Strip any existing bullet/number prefix before adding new one
    const stripped = line.replace(/^(\s*)(•\s*|\d+\.\s*)/, '$1');
    const newLine = stripped.replace(/^(\s*)/, `$1${prefix}`);

    pad.value = val.slice(0, lineStart) + newLine + val.slice(lineEndActual);

    // Restore cursor at same relative position
    const diff = newLine.length - line.length;
    const newPos = Math.max(lineStart, start + diff);
    pad.setSelectionRange(newPos, newPos);
    pad.focus();
    updateCount();
    clearTimeout(saveTimer);
    saveTimer = setTimeout(savePad, 800);
  }

  function getNextNumber() {
    if (!pad) return 1;
    const val = pad.value;
    const start = pad.selectionStart;
    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
    const above = val.slice(0, lineStart);
    const lines = above.split('\n').reverse();
    for (const l of lines) {
      const m = l.match(/^\s*(\d+)\./);
      if (m) return parseInt(m[1]) + 1;
    }
    return 1;
  }

  document.getElementById('scratchBulletBtn')?.addEventListener('click', () => {
    prefixCurrentLine('• ');
  });

  document.getElementById('scratchNumBtn')?.addEventListener('click', () => {
    prefixCurrentLine(`${getNextNumber()}. `);
  });

  // Load saved pad text
  recall(PAD_KEY, text => {
    if (pad && text) { pad.value = text; updateCount(); }
  });
})();

// ════════════════════════════════════════════════════════════
//  CURSOR TRAIL SWITCHER
//  Cycles through CURSOR_SPRITES on button click, persists choice
// ════════════════════════════════════════════════════════════
(function() {
  const STORAGE_KEY = 'awu_cursor_mode'; // -1 = off, 0..N-1 = sprite index
  const COOLDOWN = 55;
  const btn = document.getElementById('cursorSwitchBtn');

  let modeIndex = -1; // -1 = off
  let lastSpawn = 0, lastX = 0, lastY = 0;
  let preloadedImgs = [];

  // Pre-load all image sprites
  CURSOR_SPRITES.forEach((s, i) => {
    if (s.img) {
      const img = new Image();
      img.src = s.img;
      preloadedImgs[i] = img;
    }
  });

  // Update button appearance to show the NEXT sprite (preview of what clicking will do)
  function updateBtn() {
    btn.innerHTML = '';
    btn.className = 'cursor-switch-btn';

    if (modeIndex === -1) {
      // Currently off → button shows first sprite as preview
      const next = CURSOR_SPRITES[0];
      if (next?.img) {
        const img = document.createElement('img');
        img.src = next.img;
        btn.appendChild(img);
      } else if (next?.emoji) {
        btn.textContent = next.emoji;
      } else {
        btn.classList.add('cursor-switch-btn--off');
      }
      btn.title = 'Turn on cursor trail';
    } else {
      const cur = CURSOR_SPRITES[modeIndex];
      if (cur?.img) {
        const img = document.createElement('img');
        img.src = cur.img;
        btn.appendChild(img);
      } else if (cur?.emoji) {
        btn.textContent = cur.emoji;
      }
      const isLast = modeIndex === CURSOR_SPRITES.length - 1;
      btn.title = isLast ? 'Turn off cursor trail' : 'Switch cursor trail';
    }
  }

  function setMode(idx) {
    modeIndex = idx;
    store(STORAGE_KEY, idx);
    updateBtn();
  }

  btn?.addEventListener('click', () => {
    // Cycle: -1 → 0 → 1 → … → N-1 → -1
    if (modeIndex === -1) {
      setMode(0);
    } else if (modeIndex < CURSOR_SPRITES.length - 1) {
      setMode(modeIndex + 1);
    } else {
      setMode(-1);
    }
  });

  // Spawn a sprite at (x, y)
  function spawnSprite(x, y, speed) {
    if (modeIndex === -1) return;
    const sprite = CURSOR_SPRITES[modeIndex];
    if (!sprite) return;

    const p = document.createElement('div');
    p.className = 'pengy-trail';
    const scatter = Math.min(speed * 0.15, 8);
    const ox = (Math.random() - 0.5) * scatter * 2;
    const oy = (Math.random() - 0.5) * scatter;
    const rot = (Math.random() - 0.5) * 15;
    const sz = 16 + Math.random() * 8;
    p.style.left = (x + ox - sz/2) + 'px';
    p.style.top  = (y + oy - sz/2) + 'px';
    p.style.setProperty('--r', rot + 'deg');

    if (sprite.img && preloadedImgs[modeIndex]?.complete) {
      const img = document.createElement('img');
      img.src = sprite.img;
      img.style.cssText = `width:${sz}px;height:${sz}px;object-fit:contain;pointer-events:none;display:block;`;
      p.appendChild(img);
    } else if (sprite.emoji) {
      p.style.fontSize = sz + 'px';
      p.textContent = sprite.emoji;
    } else {
      // Image not loaded yet — skip this frame
      return;
    }

    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }

  const card       = document.getElementById('mainCard');
  const searchWrap = document.querySelector('.search-wrapper');

  function outsideUI(x, y) {
    const inCard   = card   && (() => { const r=card.getBoundingClientRect();   return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom; })();
    const inSearch = searchWrap && (() => { const r=searchWrap.getBoundingClientRect(); return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom; })();
    return !inCard && !inSearch;
  }

  document.addEventListener('mousemove', e => {
    if (modeIndex === -1) return;
    const now = Date.now();
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const speed = Math.sqrt(dx*dx + dy*dy);
    lastX = e.clientX; lastY = e.clientY;
    if (!outsideUI(e.clientX, e.clientY)) return;
    if (now - lastSpawn < COOLDOWN) return;
    lastSpawn = now;
    spawnSprite(e.clientX, e.clientY, speed);
  });

  // Restore saved mode
  recall(STORAGE_KEY, saved => {
    const idx = (saved === null || saved === undefined) ? -1 : Number(saved);
    modeIndex = (idx >= -1 && idx < CURSOR_SPRITES.length) ? idx : -1;
    updateBtn();
  });
})();


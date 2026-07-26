import type { Color, Level } from '../types'

// Advice content authored from "Surrounded by Idiots" (Thomas Erikson):
// the adaptation chapters (ch. 12), feedback (ch. 13), body language (ch. 10),
// written communication (ch. 15), temperament (ch. 16), and stress (ch. 17).

export interface ColorAdvice {
  snapshot: { selfView: string[]; othersView: string[] }
  adapting: { dos: string[]; donts: string[] }
  communication: { spoken: string[]; email: string[]; emailTell: string }
  feedback: string[]
  stress: { triggers: string[]; signs: string; help: string[] }
  conflict: { temperament: string; decisions: string[]; winThemOver: string[] }
  bodyLanguage: string[]
}

export const ADVICE: Record<Color, ColorAdvice> = {
  RED: {
    snapshot: {
      selfView: [
        'Driven, ambitious, and efficient — a natural problem-solver',
        'Direct and honest: says what everyone else is only thinking',
        'Decisive under pressure; comfortable taking charge and taking risks',
        'Demanding of themselves at least as much as of others',
      ],
      othersView: [
        'Blunt to the point of harshness; can steamroll people without noticing',
        'Impatient — treats reflection and discussion as wasted time',
        'Controlling: wants to decide, and to control what others do',
        'Aggressive when challenged; quick to appoint scapegoats when results slip',
      ],
    },
    adapting: {
      dos: [
        'Get to the point immediately. Lead with the bottom line, then offer detail only if asked.',
        'Keep pace high: shorter meetings, faster answers, visible urgency.',
        'Have an opinion and state it plainly. Reds judge you on how driven you are — hesitation reads as weakness.',
        'Stand your ground when they push. Holding firm (when you know your facts) earns respect; backing down invites them to walk over you again.',
        'Show hard work and initiative — report results briefly and regularly, and bring suggestions they did not ask for.',
        'Do your homework: if they sense uncertainty, you will be grilled on the facts.',
      ],
      donts: [
        'Don’t open with small talk, vacations, or relationship-building — a Red is there to do business, and reads chit-chat as ingratiation.',
        'Don’t give long background before the point; start from the conclusion.',
        'Don’t flatter them if you don’t know them well.',
        'Don’t answer "there’s plenty of time" when they ask the time — give exact answers.',
        'Don’t match their shouting with your own; stay in the center of the storm calmly and continue.',
        'Don’t tell them to calm down or lower their voice — it is the one thing that reliably makes them genuinely angry.',
      ],
    },
    communication: {
      spoken: [
        'Be concise: no unnecessary words, no repetition, no long wind-ups.',
        'Stick strictly to the agenda; park side-topics for the end or another meeting.',
        'Frame things as problems to solve and results to win — facts over feelings.',
        'Expect the meeting to end abruptly once they are satisfied; it is not personal.',
      ],
      email: [
        'Write short, punchy messages — a single clear line beats three paragraphs.',
        'Lead with the ask or the decision needed; attach detail rather than embedding it.',
        'Reply fast. Speed is read as competence.',
      ],
      emailTell:
        'Their emails are abrupt and command-like ("Meeting tomorrow at 11. BE PUNCTUAL!") — no greeting, no social padding. Answer instantly and just as briefly.',
    },
    feedback: [
      'Skip the gift wrap entirely — no sandwich method. Deliver criticism plainly and directly.',
      'Bring very concrete examples; generalities will be dismissed as anecdotes about other people’s incompetence.',
      'Frame impact in terms of results they care about ("an exhausted rep sells nothing on Monday"), not feelings.',
      'Expect a counterattack — they may accuse you of everything under the sun to regain the upper hand. Don’t take the bait; wait out the storm and continue to the next point.',
      'Ask them to repeat what you agreed. Expect them to cross out one item just to feel they won — let them.',
      'Only attempt this on a day you feel strong; they always feel strong.',
    ],
    stress: {
      triggers: [
        'Losing authority or being cut out of decisions',
        'No results, no challenge, or routine, repetitive work',
        'Wasted time and visible inefficiency around them',
        'Other people’s "stupid mistakes"',
        'Being told to calm down or lower their voice',
      ],
      signs:
        'Blames everyone else and hunts for scapegoats; becomes even more demanding, closed, and hard-driving than usual, with anger just under the surface.',
      help: [
        'If you have the standing, tell them directly to get a hold of themselves — it actually works.',
        'Point them at physical exercise or a competition to burn off the aggression.',
        'Give them a real problem to own — boredom is itself a stressor for Reds.',
      ],
    },
    conflict: {
      temperament:
        'The shot glass: fills instantly, empties instantly. Explodes over small things, then moves on and forgets the episode — while everyone else is still shaken. They don’t consider themselves angry; shouting is just communication.',
      decisions: [
        'Decides fast with incomplete information; comfortable with risk.',
        'Focused on the present and the future — historical caveats bore them.',
        'Danger: quick but frightfully wrong. They need someone to make them pause for the rest of the team.',
      ],
      winThemOver: [
        'Use facts — risk and detail arguments land only when tied to results and profit.',
        'Show examples where haste cost time or money; make the case that slowing down 10% wins the race.',
        'Never concede just to end the fight; they respect an opponent who holds the line.',
      ],
    },
    bodyLanguage: [
      'Keeps distance; strong, dominating handshake',
      'Intense, direct eye contact and controlled gestures',
      'Leans forward aggressively when engaged or challenged',
      'Impatient physical tells: glancing at the clock, drumming fingers',
    ],
  },

  YELLOW: {
    snapshot: {
      selfView: [
        'Optimistic, fun, and inspiring — the energy in the room',
        'Creative big-picture thinker, full of ideas and vision',
        'Persuasive and socially gifted; makes friends everywhere',
        'Believes they are a great listener (they are not)',
      ],
      othersView: [
        'Talks far more than they listen; hogs the spotlight',
        'Disorganized: loses details, forgets agreements, runs late',
        'Superficially optimistic about time and effort — commitments slip',
        'Egocentric: every conversation becomes a story starring themselves',
      ],
    },
    adapting: {
      dos: [
        'Create a warm, friendly atmosphere — smile, laugh at their jokes, keep it light. A Yellow in good spirits will actually listen to you.',
        'Start with the big picture and the vision; strip out as much detail as possible.',
        'Appeal to feelings: ask "how does this feel?" rather than presenting spreadsheets.',
        'Frame things as new, state-of-the-art, never-done-before — novelty is their fuel.',
        'Be open and personal in return: share stories about yourself; show curiosity about them.',
        'Pin down agreements concretely: get them to say exactly what they will do, and get it written in their calendar.',
      ],
      donts: [
        'Don’t drown them in details or instruction manuals — they only want to know that it works, not how.',
        'Don’t rely on them remembering — follow up everything important; assume it went in one ear and out the other.',
        'Don’t trust their time estimates; pad deadlines and confirm appointments explicitly.',
        'Don’t force them into rigid structure without diplomacy — they hate feeling controlled and will rebel.',
        'Don’t be cold, closed, or private — they read it as rejection and become insecure.',
        'Don’t criticize them in public, ever.',
      ],
    },
    communication: {
      spoken: [
        'Have a plan of action before important conversations — know your message and the exact response you need, or they will lure the conversation elsewhere.',
        'Let them talk, then steer back gently and repeatedly to your point.',
        'Get concrete verbal commitments ("I will be there at four") and have them repeat the agreement.',
        'Give them stage time — but protect space for others in group settings.',
      ],
      email: [
        'Keep it warm and personal; a cold bullet list reads as hostile.',
        'One ask per message — buried actions will be lost.',
        'Reply warmly even if not fast; silence makes them insecure. Acknowledge their jokes and stories.',
      ],
      emailTell:
        'Their emails are spontaneous and chatty — stories, jokes, tangents, a forgotten attachment in a follow-up message. Reply cordially and acknowledge the personal content.',
    },
    feedback: [
      'Prepare a written agenda and stick to it — they are skilled at smokescreens and will lure you off track.',
      'Give very concrete examples ("you spoke for over an hour of the two-hour dinner — I timed it").',
      'Repeatedly affirm that you like them and it is only the behavior that is the problem. Yellows take criticism deeply personally.',
      'Expect the martyr complex: "nobody likes me." Massage the ego as much as you can bear, and put words in their mouth if needed.',
      'Watch for them "accepting" the wrong message — make them repeat back exactly what was agreed.',
      'Follow up soon, and repeatedly. They repress unpleasant things quickly — which also means they won’t hold a grudge.',
    ],
    stress: {
      triggers: [
        'Being ignored or invisible',
        'Skepticism, pessimism, and negativity around them',
        'Rigid structure, routine, and jam-packed schedules imposed by others',
        'Isolation — no one to talk to',
        'Humorless environments and public humiliation',
      ],
      signs:
        'Seeks even more attention than usual; talks excessively; becomes unrealistically, almost manically optimistic with wild plans as a coping mechanism. Their stress is always visible and loudly shared.',
      help: [
        'Get them into a social context — let them organize the team event; make sure it is actually fun.',
        'Give them an audience and some affirmation; recognition recharges them.',
        'Help quietly with structure (lists, reminders) without making them feel controlled.',
      ],
    },
    conflict: {
      temperament:
        'The drinking glass: fills gradually and visibly — eyes intensify, gestures grow, voice rises — before it spills. Afterward they feel guilty and over-compensate with kindness. Their bad memory means grudges evaporate fast.',
      decisions: [
        'Decides by gut feel; facts are welcome as long as it "feels right".',
        'High tolerance for uncertainty and risk — especially for anything new.',
        'Danger: commits to more than is physically possible and underestimates every task’s duration.',
      ],
      winThemOver: [
        'Show enthusiasm and share your own gut feelings — they trust people they recognize themselves in.',
        'Sell the vision and the newness first; the plan can come later (from someone else).',
        'Explain how finishing the job will make them even more popular — it works.',
      ],
    },
    bodyLanguage: [
      'Touches people while talking; stands close',
      'Expansive, theatrical gestures; whole face smiles',
      'Eye contact is warm but wandering — always scanning the room',
      'Restless in long meetings; visibly deflates when ignored',
    ],
  },

  GREEN: {
    snapshot: {
      selfView: [
        'Kind, balanced, and easy to get along with — a good friend and teammate',
        'A genuine listener who cares about how everyone is doing',
        'Reliable and loyal; keeps things running without drama',
        'Modest — doesn’t need credit or the spotlight',
      ],
      othersView: [
        'Passive and slow to act; waits for others to decide',
        'Resists all change, quietly but stubbornly ("it was better before")',
        'Won’t say what they really think — you learn their objections too late',
        'Can punish people with silence and passivity instead of open disagreement',
      ],
    },
    adapting: {
      dos: [
        'Provide security and predictability: explain the plan step by step — what happens, when, and exactly what you need from them.',
        'Take their fears seriously and listen; the fear is real to them. Encourage small, gentle steps forward.',
        'Give them time to warm up to change; break it into small pieces and repeat the message again and again.',
        'Take the initiative yourself — they will rarely volunteer, but they will follow a clear, kind plan.',
        'Ask for their opinion directly and privately, and make it safe to disagree; otherwise you will never hear the objection that matters.',
        'Respect their need for peace, quiet, and periods of doing nothing.',
      ],
      donts: [
        'Don’t spring surprises or lightning-fast changes of direction — and never an order followed by a counter-order.',
        'Don’t force them into the spotlight or put them on the spot in groups.',
        'Don’t say "there’s nothing to be afraid of" — it dismisses a fear that is real to them.',
        'Don’t mistake silence for agreement — it very often is not.',
        'Don’t pile on activity and bustle; constant action exhausts them.',
        'Don’t criticize them in front of anyone else, ever.',
      ],
    },
    communication: {
      spoken: [
        'Slow down. Match their calm pace; urgency reads as aggression.',
        'One-on-one beats group settings for anything that matters.',
        'Ask open questions and actually wait for the answer — they lead conversations reluctantly.',
        'Spell out how things fit together; Greens want to know how.',
      ],
      email: [
        'Use a warm, personal, low-pressure tone; soften requests.',
        'Give lead time — never demand same-day turnarounds without warning.',
        'Confirm agreements in writing afterwards; they may not take notes and may have heard a different message.',
      ],
      emailTell:
        'Their emails are soft and personal, carefully polished to avoid anything controversial ("Hope it still works for you… I’ll bring cinnamon buns"). Reply personally and kindly.',
    },
    feedback: [
      'Deliver criticism privately, gently — and think twice about whether it is worth it at all; it lands harder on Greens than on anyone.',
      'Lead with the relationship: "I like you, and the team works better if this one thing changes."',
      'Say how the behavior makes you feel — Greens are relational and respond to honest emotion (this works on Greens and fails on Reds).',
      'Be clear and do not backpedal, even when you see them deflate. Retracting the message helps no one.',
      'Expect total appeasement ("you’re right, I’m so stupid") and weeks of placating that dodge the actual change — pin down the specific behavior.',
      'Confirm you both heard the same message, then follow up: their default fix is to do nothing. Reassure them with actions, not just words.',
    ],
    stress: {
      triggers: [
        'Loss of security: unfamiliar tasks with no explanation, no support in tough meetings',
        'Loose ends and open-ended, never-finishing projects',
        'No private space or downtime',
        'Rapid, unexpected changes of direction',
        'Being asked to redo work (they hear: you are not good enough)',
        'Conflict in the group, and being pushed into the spotlight',
      ],
      signs:
        'Goes reserved, rigid, and cold — even toward people they love. Becomes hesitant and afraid of mistakes; may dig into pure stubbornness and refuse to change anything at all. Frustration turns inward, which over years is the burnout pattern.',
      help: [
        'Let them do nothing: genuine free time, a garden, a book, sleep — until the stress subsides.',
        'Remove the conflict or the pressure source rather than coaching them to endure it.',
        'Restore predictability: a clear plan with no surprises.',
      ],
    },
    conflict: {
      temperament:
        'The fifty-gallon barrel: absorbs perceived injustices silently for months or years — then one spark releases everything at once, going back to 1997. Beware the fury of a patient man. Help by inviting their real opinion early, so the barrel never fills.',
      decisions: [
        'Prefers not to decide at all; once they decided not to make decisions.',
        'Needs to know how the plan works before moving; asks "how?"',
        'Danger: monumental passivity — a group of Greens will not start without someone taking the helm.',
      ],
      winThemOver: [
        'Give the group time to feel its way to the conclusion; patience wins where force shuts everything down.',
        'Repeat the message calmly, in small pieces, as many times as it takes.',
        'Show that the change protects the team and their security, not just the results.',
      ],
    },
    bodyLanguage: [
      'Relaxed, low-key, friendly manner; small gestures',
      'Comfortable physically close to people they know',
      'Under pressure: goes still, closed, and silent — the loudest signal they send',
      'Shrugs and non-answers often hide a firm unspoken opinion',
    ],
  },

  BLUE: {
    snapshot: {
      selfView: [
        'A realist with a critical, analytical mind — not a pessimist',
        'Thorough and precise; does things properly or not at all',
        'Prepared for everything, including the contingency’s contingency',
        'Judges work on merit, not on charm or connections',
      ],
      othersView: [
        'Cold and distant; shows no feelings and skips the social layer',
        'Buried in details others find irrelevant; pedantic',
        'Suspicious and pessimistic; finds the flaw in everything',
        'Paralyzingly slow to decide — always one more fact to check',
      ],
    },
    adapting: {
      dos: [
        'Prepare meticulously — then go through it all one more time. They judge you entirely on the quality of your work.',
        'Be exact: "nine dollars and seventy-three cents", not "about ten dollars". Precise beats favorable.',
        'Stick to the task; keep the meeting factual and focused. The personal layer comes much later, on their initiative.',
        'If you don’t know the answer, say so plainly and come back with it — one discovered white lie and you are done.',
        'Keep proposals realistic; skip inspirational speeches and wild goals entirely.',
        'Praise their attention to detail and use their vocabulary: quality, evaluate, analyze, follow up, properly inspected.',
      ],
      donts: [
        'Don’t open with personal questions — "personal" means "private, stay off". Let them open up in their own time.',
        'Don’t improvise, bluff, or round numbers.',
        'Don’t sell visions ("we’ll be on top of the mountain!") — they will just ask how you got up there. They have Excel.',
        'Don’t criticize them for spending too much time on quality — reframe deadlines factually instead.',
        'Don’t use dramatic body language or emotional appeals; sloppy sentimentality repels them.',
        'Don’t rush their decisions without giving a reason grounded in facts and consequences.',
      ],
    },
    communication: {
      spoken: [
        'Lead with facts, structure, and the why behind everything.',
        'Use checklists and go through items together, ticking them off.',
        'Expect critical counterquestions — they ask to confirm what they already know, so welcome the scrutiny.',
        'Tolerate silence; they think before speaking and speak only when precise.',
      ],
      email: [
        'Written is their preferred medium — the written word is automatically more true to a Blue.',
        'Be factual, complete, and well-structured; attach the supporting documents.',
        'Confirm receipt, actually read what they send, and answer every question asked — they will notice the one you skipped.',
      ],
      emailTell:
        'Their emails are formal and factual with zero personal touch — full name, numbered attachments, an expectation that you arrive prepared. Confirm receipt and read everything before the meeting.',
    },
    feedback: [
      'Before anything else: make sure you know what you are talking about. They know exactly what they did, and they have better command of the details than you.',
      'Bring specific, detailed, documented examples — preferably in writing, with the numbers double-checked by someone else ("the project ran 16.5 hours over; at $250/hour that is $4,125 of unbillable time").',
      'Skip the warm-up and never use the sandwich method — burying the message in relational praise just makes it incomprehensible to them.',
      'Expect counterquestions at the molecular level ("who said that?", "where is the supporting document?"). Decide in advance how deep you will go — but never retreat to "that’s just how it is".',
      'Invite their suggestions for improvement; use words like quality, evaluate, analyze.',
      'Have them repeat what was agreed — they will, verbatim — then follow up to confirm they actually accepted it rather than merely recited it.',
    ],
    stress: {
      triggers: [
        'Unfounded criticism ("you don’t know what you’re talking about")',
        'Spontaneous decisions from above with no stated rationale',
        'Being forced to act before they could prepare; imposed risk-taking',
        'Surprises of any kind',
        'Rule-breaking and disregard for proper procedure',
        'Overly emotional people crowding them',
      ],
      signs:
        'Becomes excessively pessimistic — everything turns pitch black. Slows down instead of speeding up, turns unbearably pedantic, criticizes every small mistake, and may close the door and keep grinding on a task that no longer makes sense.',
      help: [
        'Give them privacy, time, and space to analyze; they will come back — eventually.',
        'Restore structure: a clear plan, stated rationale, restored procedures.',
        'If they sink too deep into the funk, offer concrete proactive help rather than pep talks.',
      ],
    },
    conflict: {
      temperament:
        'Controlled and self-contained: anger shows as sharpened criticism and withdrawal rather than volume. They will remember precisely what was said, by whom, and when — and can make your objections look nonsensical at the logical level.',
      decisions: [
        'The path to the decision matters more than the decision; risk of full deadlock ("on the one hand… on the other hand…").',
        'Asks "why?" — needs the rationale, the data, and the process.',
        'Danger: eight months of test-driving sixteen cars to buy the most popular model anyway.',
      ],
      winThemOver: [
        'Supply the crucial missing fact and gently push: deadline approaching, consequences of delay spelled out, risks already eliminated.',
        'Give them permission to use intuition when facts run out — frame it as the logical choice under incomplete information.',
        'Prove reliability over time; their trust is slow to earn and quick to lose.',
      ],
    },
    bodyLanguage: [
      'Prefers distance; minimal gestures and a closed posture',
      'Face reveals little; emotions are self-contained',
      'Direct eye contact when speaking about facts',
      'Under stress: even stiller, quieter, and more closed than usual',
    ],
  },
}

// Secondary-color modifier: one short paragraph appended when the person has
// a meaningful secondary color. Written from the combinations chapter's logic.
export const SECONDARY_NOTE: Record<Color, string> = {
  RED: 'The Red streak adds pace, decisiveness, and bluntness on top of everything above — expect faster reactions, lower patience, and more willingness to fight for a position than the primary color alone would suggest.',
  YELLOW:
    'The Yellow streak adds sociability, optimism, and talkativeness — expect more relationship-building, more enthusiasm for the new, and looser handling of details and time than the primary color alone would suggest.',
  GREEN:
    'The Green streak adds patience, team focus, and caution — expect a softer interpersonal style, more conflict avoidance, and more resistance to sudden change than the primary color alone would suggest.',
  BLUE: 'The Blue streak adds precision, skepticism, and preparation — expect more questions, higher quality standards, and slower, more careful decisions than the primary color alone would suggest.',
}

// 16 pairings: advice for YOU (your primary color) dealing with THEM (their primary).
// Grounded in the book's axes: Red↔Green and Yellow↔Blue are opposites;
// colors sharing an axis (task/relationship or active/passive) blend more naturally.
export interface PairingAdvice {
  friction: string
  bridges: string[]
}

export const PAIRINGS: Record<string, PairingAdvice> = {
  // You RED
  'RED-RED': {
    friction:
      'Two Reds means two people who both intend to win. Expect head-on collisions, power struggles, and heated debates — which, oddly, you may both enjoy.',
    bridges: [
      'Agree on who owns which decision before the fight starts, not during it.',
      'Treat their pushback as sport, not insubordination — they respect you more for the battle.',
      'Watch that the two of you don’t sprint off and leave the whole team behind.',
    ],
  },
  'RED-YELLOW': {
    friction:
      'You want the result; they want the show. Their chatter, tangents, and loose grip on details will test your patience, and your bluntness can wound them more than you intend.',
    bridges: [
      'Give them two minutes of stage time up front — it buys you a much more cooperative hour.',
      'Put every commitment in writing immediately; do not rely on their memory.',
      'Soften delivery slightly: they take directness personally in a way you never would.',
    ],
  },
  'RED-GREEN': {
    friction:
      'Your opposite. Your pace and pressure read to them as aggression; their caution and silence read to you as passivity. Pushing harder makes them slower and quieter.',
    bridges: [
      'Slow down deliberately: explain the plan step by step and give them time to digest changes.',
      'Ask for their view privately and wait for the answer — their silence is not agreement.',
      'Never blow up at them; one eruption costs months of trust and fills their barrel.',
    ],
  },
  'RED-BLUE': {
    friction:
      'You both focus on the task, which helps — but your "good enough, ship it" collides with their "correct or not at all", and your risk appetite with their risk allergy.',
    bridges: [
      'Bring exact facts, not rounded claims; one bluffed number destroys your credibility.',
      'Give them preparation time and a stated rationale instead of demanding instant answers.',
      'Use their thoroughness as your quality gate rather than fighting it — assign them the risks you would otherwise skip.',
    ],
  },
  // You YELLOW
  'YELLOW-RED': {
    friction:
      'They will cut off your stories mid-sentence and demand the point. Their coldness about the social layer can feel brutal; your detours and optimism about time drive them up the wall.',
    bridges: [
      'Lead with the conclusion in one sentence; save the story for someone who wants it.',
      'Be on time and keep commitments visibly — this is the currency they respect.',
      'Don’t chase their approval or friendship; deliver results and the relationship follows.',
    ],
  },
  'YELLOW-YELLOW': {
    friction:
      'Endless fun, mutual inspiration — and nothing written down. Two Yellows talk simultaneously, plan magnificently, and follow up on none of it.',
    bridges: [
      'One of you must be the note-taker; decide who before the meeting.',
      'End every conversation with who-does-what-by-when, said out loud and written down.',
      'Guard the airtime of quieter colleagues when you are both in a room.',
    ],
  },
  'YELLOW-GREEN': {
    friction:
      'You both value warmth, which helps — but your spontaneity and constant new ideas are a top stress factor for them, and their caution can feel like a wet blanket to you.',
    bridges: [
      'Introduce change gently and give them time; don’t announce plan B before plan A even started.',
      'Finish what you start with them — loose ends genuinely disturb Greens.',
      'Draw out their real opinion privately; they will otherwise smile and quietly disagree.',
    ],
  },
  'YELLOW-BLUE': {
    friction:
      'Your opposite. Your loose facts, improvisation, and emotional delivery are everything they distrust; their nitpicking and silence deflate you. You are fighting an uphill battle by default.',
    bridges: [
      'Put away most of your spontaneity: prepare, be exact, and do one thing at a time.',
      'Never wing a number — say "I’ll check" instead. They ask questions they already know the answers to.',
      'Don’t read their reserve as dislike; the relationship opens slowly, on their terms, after your work proves solid.',
    ],
  },
  // You GREEN
  'GREEN-RED': {
    friction:
      'Their volume, pace, and bluntness can feel like a personal attack — it almost never is. The risk is that you go quiet, say yes when you mean no, and fill your barrel.',
    bridges: [
      'Say your opinion plainly and early — Reds genuinely respect pushback and despise doormats.',
      'Keep answers short and concrete; skip the context they don’t want.',
      'When they erupt, remember the shot glass: it empties as fast as it fills, and they have already moved on.',
    ],
  },
  'GREEN-YELLOW': {
    friction:
      'You share the people focus and generally like each other — but they consume the airtime, forget agreements, and spring changes on you, leaving you quietly carrying the follow-through.',
    bridges: [
      'Confirm every agreement in writing; assume their memory of it will differ.',
      'Practice interrupting warmly — they take it far less personally than you would.',
      'Tell them when their changes stress you; they genuinely don’t notice unless told.',
    ],
  },
  'GREEN-GREEN': {
    friction:
      'The most comfortable pairing in the book — and the one where nothing gets decided. Two Greens wait politely for each other to take initiative, indefinitely.',
    bridges: [
      'Someone has to take the helm: agree explicitly whose turn it is to decide.',
      'Set external deadlines to force motion; comfort alone will not.',
      'Practice surfacing disagreements — you are both hiding at least one.',
    ],
  },
  'GREEN-BLUE': {
    friction:
      'A calm, stable, low-drama pairing — you share the reflective pace. But between your conflict-avoidance and their reserve, problems can stay politely unmentioned until they are serious.',
    bridges: [
      'Use their love of facts to raise issues safely: bring data instead of feelings.',
      'Agree on plans and processes explicitly — you both thrive on predictability, so build it together.',
      'Don’t wait for them to ask how you are doing; they won’t, and it means nothing.',
    ],
  },
  // You BLUE
  'BLUE-RED': {
    friction:
      'They decide before you finish analyzing, round your numbers, and treat your caution as obstruction. You share the task focus, but the speed mismatch is constant.',
    bridges: [
      'Lead with the conclusion and keep the full analysis in reserve — they will ask if they want it.',
      'Translate risks into results language: cost, time lost, deals broken.',
      'Accept "good enough" on low-stakes items so your objections carry weight on high-stakes ones.',
    ],
  },
  'BLUE-YELLOW': {
    friction:
      'Your opposite. Their loose facts, broken commitments, and emotional logic will irritate you daily; your corrections and silence read to them as hostility.',
    bridges: [
      'Don’t correct them publicly — deliver precision privately, and only where it matters.',
      'Accept that warmth is data to them: add a personal line to your emails; it costs little and buys much.',
      'Put agreements in writing yourself; it is kinder than expecting them to remember.',
    ],
  },
  'BLUE-GREEN': {
    friction:
      'Quiet, steady, and mutually respectful — but doubly reserved. They read your factual criticism as personal even when delivered mildly, and neither of you volunteers what is wrong.',
    bridges: [
      'Soften your precision with explicit reassurance — say the relationship is fine out loud; they cannot infer it.',
      'Give them the step-by-step plan they need; your natural thoroughness is genuinely calming to them.',
      'Schedule regular low-stakes check-ins so concerns surface before they fester.',
    ],
  },
  'BLUE-BLUE': {
    friction:
      'Immaculate quality, mutual respect for competence — and a real risk of joint analysis paralysis, plus two people each privately convinced the other’s method is slightly wrong.',
    bridges: [
      'Agree in advance how much data is enough and when the decision falls.',
      'Split domains of expertise cleanly to avoid dueling audits.',
      'One of you must own the deadline — and it should rotate.',
    ],
  },
}

// Corporate-level lens: adjusts the stakes and register of the advice.
export type LevelBucket = 'junior' | 'mid' | 'exec'

export function levelBucket(level: Level): LevelBucket {
  if (level === 'IC' || level === 'JUNIOR_MANAGER') return 'junior'
  if (level === 'SENIOR_MANAGER' || level === 'DIRECTOR') return 'mid'
  return 'exec'
}

export const LEVEL_LENS: Record<LevelBucket, { title: string; points: string[] }> = {
  junior: {
    title: 'Working with them at a junior level',
    points: [
      'You likely have positional or informal seniority: your color style lands amplified, so moderate it — a blunt note from above hits harder than you intend.',
      'Coaching angle: their color’s weak spots (detail, pace, initiative, or over-analysis) are habits you can help shape early with the feedback approach above.',
      'Delegate to their color: give Reds ownership of a problem, Yellows a visible creative task, Greens a stable well-defined workstream, Blues quality-critical work.',
      'They may not push back on you regardless of color — deliberately invite dissent using the style their color finds safe.',
    ],
  },
  mid: {
    title: 'Working with them at manager/director level',
    points: [
      'Peers-and-politics territory: their color shapes how they build alliances — Reds via control, Yellows via networks, Greens via loyalty, Blues via being indispensable on facts.',
      'Negotiate in their currency: results for Reds, visibility for Yellows, stability for Greens, evidence for Blues.',
      'Escalations land differently: a Red escalates as a weapon, a Yellow thinks out loud, a Green escalates only at breaking point, a Blue escalates with a documented file.',
      'Cross-functional friction with them usually traces to the color mismatch above — fix the communication channel before assuming bad intent.',
    ],
  },
  exec: {
    title: 'Working with them at VP/SVP/C-level',
    points: [
      'Compress everything: whatever their color wants, they want it in less time. Executive summaries first; detail only in appendix (Blues will read it; Reds never will).',
      'Their color under pressure is amplified by the role: expect the stress responses above sooner and stronger — and remember you rarely see the pressures causing them.',
      'Manage upward in their style: Reds want options with a recommendation, Yellows want the story and the win, Greens want consensus pre-built before the meeting, Blues want the pre-read three days early.',
      'The cost of a mismatch is higher here: one badly-formatted approach can set the relationship back a quarter. When in doubt, ask their assistant or their calendar what style survives.',
    ],
  },
}

export const DISCLAIMER =
  'Framework from "Surrounded by Idiots" (Thomas Erikson), based on the DISC/DISA behavioral model. This is a lens for reflection on communication styles — not a scientifically validated instrument, and never the full truth about a person.'

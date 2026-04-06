export type Depth = "light" | "medium" | "deep";

export interface Prompt {
  id: string;
  text: string;
  depth: Depth;
  note?: string;
}

export const prompts: Prompt[] = [
  // Light prompts
  {
    id: "l1",
    text: "What's a small thing that made you smile this week?",
    depth: "light",
  },
  {
    id: "l2",
    text: "If you could have dinner with anyone alive, who would it be?",
    depth: "light",
  },
  { id: "l3", text: "What's the best meal you've ever had?", depth: "light" },
  {
    id: "l4",
    text: "If you won the lottery tomorrow, what's the first thing you'd do?",
    depth: "light",
  },
  { id: "l5", text: "What's a skill you'd love to learn?", depth: "light" },
  {
    id: "l6",
    text: "What song has been stuck in your head lately?",
    depth: "light",
  },
  { id: "l7", text: "What's your go-to comfort food?", depth: "light" },
  {
    id: "l8",
    text: "If you could live anywhere for a year, where would it be?",
    depth: "light",
  },
  {
    id: "l9",
    text: "What's the best gift you've ever received?",
    depth: "light",
  },
  {
    id: "l10",
    text: "What's something you're looking forward to?",
    depth: "light",
  },
  {
    id: "l11",
    text: "What's the last thing that made you laugh out loud?",
    depth: "light",
  },
  {
    id: "l12",
    text: "What's your favorite way to spend a Sunday?",
    depth: "light",
  },
  {
    id: "l13",
    text: "If you could have any superpower for a day, what would you choose?",
    depth: "light",
  },
  {
    id: "l14",
    text: "What's a movie you can watch over and over?",
    depth: "light",
  },
  {
    id: "l15",
    text: "What's the best advice you've ever received?",
    depth: "light",
  },
  {
    id: "l16",
    text: "What is your favourite color? Why?",
    depth: "light",
    note: "The interpretation/meaning reveals how they see symbolism and self-expression.",
  },
  {
    id: "l17",
    text: "What's a prediction for end of this year?",
    depth: "light",
  },
  {
    id: "l18",
    text: "Would you like to be famous? In what way?",
    depth: "light",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "l19",
    text: "Before making a phone call, do you ever rehearse what you're going to say? Why?",
    depth: "light",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "l20",
    text: "What would constitute a 'perfect' day for you?",
    depth: "light",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "l21",
    text: "When did you last sing to yourself? To someone else?",
    depth: "light",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "l22",
    text: "If you could wake up tomorrow having gained any one quality or ability, what would it be?",
    depth: "light",
    note: "From Arthur Aron's 36 Questions.",
  },

  // Medium prompts
  {
    id: "m1",
    text: "What's something you've changed your mind about in the last few years?",
    depth: "medium",
  },
  { id: "m2", text: "What's a fear you've overcome?", depth: "medium" },
  { id: "m3", text: "When do you feel most like yourself?", depth: "medium" },
  {
    id: "m4",
    text: "What's something you wish you could tell your younger self?",
    depth: "medium",
  },
  {
    id: "m5",
    text: "What's a moment when you felt truly proud of yourself?",
    depth: "medium",
  },
  { id: "m6", text: "What does friendship mean to you?", depth: "medium" },
  {
    id: "m7",
    text: "What's something you're still learning about yourself?",
    depth: "medium",
  },
  {
    id: "m8",
    text: "What's a relationship that has shaped who you are?",
    depth: "medium",
  },
  {
    id: "m9",
    text: "What's something you need more of in your life?",
    depth: "medium",
  },
  {
    id: "m10",
    text: "When did you last step out of your comfort zone?",
    depth: "medium",
  },
  {
    id: "m11",
    text: "What's something you've never told anyone in this room?",
    depth: "medium",
  },
  {
    id: "m12",
    text: "What's a mistake that taught you something valuable?",
    depth: "medium",
  },
  {
    id: "m13",
    text: "What do you think your friends value most about you?",
    depth: "medium",
  },
  { id: "m14", text: "What's something you've been putting off?", depth: "medium" },
  { id: "m15", text: "What brings you peace?", depth: "medium" },
  {
    id: "m16",
    text: "What's the most special question you were asked?",
    depth: "medium",
  },
  {
    id: "m17",
    text: "What time of day feels most like 'you'?",
    depth: "medium",
  },
  {
    id: "m18",
    text: "What object do you feel weirdly attached to?",
    depth: "medium",
    note: "Points to memory, security, or identity anchors.",
  },
  {
    id: "m19",
    text: "What's something you said 'yes' to that cost you something?",
    depth: "medium",
  },
  {
    id: "m20",
    text: "Who were you trying to impress five years ago?",
    depth: "medium",
  },
  {
    id: "m21",
    text: "If you could live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years, which would you want?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m22",
    text: "For what in your life do you feel most grateful?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m23",
    text: "If you could change anything about the way you were raised, what would it be?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m24",
    text: "Take four minutes and tell your life story in as much detail as possible.",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions. A mini-storytelling moment.",
  },
  {
    id: "m25",
    text: "If a crystal ball could tell you the truth about yourself, your life, or the future, what would you want to know?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m26",
    text: "Is there something you've dreamed of doing for a long time? Why haven't you done it?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m27",
    text: "What is the greatest accomplishment of your life?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m28",
    text: "What is your most treasured memory?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m29",
    text: "What roles do love and affection play in your life?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m30",
    text: "How close and warm is your family? Do you feel your childhood was happier than most other people's?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m31",
    text: "If you were going to become close friends with someone here, what would be important for them to know about you?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m32",
    text: "Share an embarrassing moment in your life.",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m33",
    text: "When did you last cry in front of another person? By yourself?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m34",
    text: "What, if anything, is too serious to be joked about?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "m35",
    text: "Your house catches fire. After saving loved ones and pets, you have time to save one item. What would it be? Why?",
    depth: "medium",
    note: "From Arthur Aron's 36 Questions.",
  },

  // Deep prompts
  {
    id: "d1",
    text: "What is your favourite form of water? And why?\n\nE.g. ocean, lake, mist, clouds, fanta, or anything that is made of water.",
    depth: "deep",
    note: "The reason indicates how they define and view love.",
  },
  { id: "d2", text: "What do you think happens after we die?", depth: "deep" },
  {
    id: "d3",
    text: "What's the hardest truth you've had to accept about yourself?",
    depth: "deep",
  },
  {
    id: "d4",
    text: "What does love mean to you?",
    depth: "deep",
    note: "Listen for how they experience giving and receiving love.",
  },
  { id: "d5", text: "What are you most afraid of in life?", depth: "deep" },
  {
    id: "d6",
    text: "What would you do differently if you knew no one would judge you?",
    depth: "deep",
  },
  {
    id: "d7",
    text: "What is here now when there is nothing to do?",
    depth: "deep",
    note: "A meditation question - notice what arises in stillness.",
  },
  {
    id: "d8",
    text: "What do you think is the purpose of suffering?",
    depth: "deep",
  },
  {
    id: "d9",
    text: "When do you feel most disconnected from yourself?",
    depth: "deep",
  },
  {
    id: "d10",
    text: "What would you want said at your funeral?",
    depth: "deep",
  },
  {
    id: "d11",
    text: "What part of yourself have you hidden from others?",
    depth: "deep",
  },
  {
    id: "d12",
    text: "What is the most meaningful experience you've ever had?",
    depth: "deep",
  },
  { id: "d13", text: "What keeps you up at night?", depth: "deep" },
  {
    id: "d14",
    text: "If today was your last day, what would you regret not saying?",
    depth: "deep",
  },
  {
    id: "d15",
    text: "What does being truly present mean to you?",
    depth: "deep",
    note: "Notice if they speak from concept or experience.",
  },
  {
    id: "d16",
    text: "What was the most important decision in your life up to this point?",
    depth: "deep",
  },
  {
    id: "d17",
    text: "What are the three most important milestones that led you to here today?",
    depth: "deep",
    note: "Jensen Huang asked Joe Rogan this question.",
  },
  {
    id: "d18",
    text: "If you are on your last day on earth, pick one exercise, one meal, one drug, and one person to see…",
    depth: "deep",
    note: "From Chazi.",
  },
  {
    id: "d19",
    text: "Your seven deadly sins?",
    depth: "deep",
  },
  {
    id: "d20",
    text: "What part of your life feels unfinished?",
    depth: "deep",
  },
  {
    id: "d21",
    text: "What's your biggest fear?",
    depth: "deep",
  },
  {
    id: "d22",
    text: "What would you do once you retire?",
    depth: "deep",
    note: "Why wait to retire to enjoy this very moment? (From Chazi)",
  },
  {
    id: "d23",
    text: "Do you have a secret hunch about how you will die?",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "d24",
    text: "What is your most terrible memory?",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "d25",
    text: "If you knew you would die suddenly in one year, would you change anything about the way you are now living? Why?",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "d26",
    text: "How do you feel about your relationship with your mother?",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "d27",
    text: "Complete this sentence: 'I wish I had someone with whom I could share...'",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
  {
    id: "d28",
    text: "Of all the people in your family, whose death would you find most disturbing? Why?",
    depth: "deep",
    note: "From Arthur Aron's 36 Questions.",
  },
];

export const everyonePrompts = [
  { id: "e1", text: "Take 2 Deep breaths pls" },
  { id: "e2", text: "Close your eyes for 10 seconds, observe the next thought that comes to your mind" },
  { id: "e3", text: "look in the eyes of the person to your right for 10 seconds… " },
  { id: "e4", text: "Take a moment to appreciate this moment" },
];

export const punishmentPrompts = [
  { id: "p1", text: "Take a dare from the person to your right" },
  { id: "p2", text: "Let the group go through your camera roll for 30 seconds" },
  { id: "p3", text: "Do your best impression of someone in this room" },
  { id: "p4", text: "Send a text to your most recent contact saying 'I've been thinking about you'" },
  { id: "p5", text: "Speak in an accent of the group's choice for the next 3 rounds" },
  { id: "p6", text: "Give a 30-second motivational speech about socks" },
  { id: "p7", text: "Let the person to your left draw something on your hand" },
  { id: "p8", text: "Do 10 jumping jacks while singing your favorite song" },
  { id: "p9", text: "Call a friend and tell them you love them without any context" },
  { id: "p10", text: "Let the group choose your phone wallpaper for a week" },
  { id: "p11", text: "Give a genuine compliment to everyone in the room" },
  { id: "p12", text: "Do your best celebrity impression and let the group guess who" },
  { id: "p13", text: "Read your last 3 sent texts out loud" },
  { id: "p14", text: "Let someone send a message to anyone from your phone" },
  { id: "p15", text: "Dance for 20 seconds with no music" },
  { id: "p16", text: "Share the last thing you searched on the internet" },
];

export function getRandomPrompt(depth: Depth, usedIds: string[]): Prompt | null {
  const available = prompts.filter(
    (p) => p.depth === depth && !usedIds.includes(p.id)
  );
  if (available.length === 0) {
    // Allow repeats if all used
    const allOfDepth = prompts.filter((p) => p.depth === depth);
    return allOfDepth[Math.floor(Math.random() * allOfDepth.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

export function getRandomEveryonePrompt(): { id: string; text: string } {
  return everyonePrompts[Math.floor(Math.random() * everyonePrompts.length)];
}

export function getRandomPunishmentPrompt(): { id: string; text: string } {
  return punishmentPrompts[Math.floor(Math.random() * punishmentPrompts.length)];
}


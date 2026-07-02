const dailyPrompts = [
  "What made you smile today?",
  "Share one small win from your day.",
  "What song are you listening to on repeat?",
  "Describe your mood in three words.",
  "What are you grateful for today?",
  "Share a photo that represents your day.",
  "What is one thing you want to improve this week?",
  "What is something kind someone did for you recently?",
  "What is one place you want to visit someday?",
  "What is one thing you learned today?",
  "What is currently giving you energy?",
  "What would make today feel successful?"
];

const getTodayPrompt = () => {
  const today = new Date();

  
  const dayNumber = Math.floor(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ) / (1000 * 60 * 60 * 24)
  );

  return {
    id: `prompt-${dayNumber}`,
    text: dailyPrompts[dayNumber % dailyPrompts.length],
  };
};

module.exports = { getTodayPrompt };
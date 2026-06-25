function ScoreDisplay({ score }) {
  let color = "text-red-400";

  if (score >= 8.5) {
    color = "text-green-400";
  } else if (score >= 7) {
    color = "text-yellow-400";
  }

  return (
    <span className={`font-bold font-mono ${color}`}>
      {score}
    </span>
  );
}

export default ScoreDisplay;
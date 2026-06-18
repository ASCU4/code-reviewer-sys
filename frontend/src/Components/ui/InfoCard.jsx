import Card from "./Card";

function InfoCard({ title, description }) {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-3">
        {title}
      </h3>

      <p className="text-slate-400">
        {description}
      </p>
    </Card>
  );
}

export default InfoCard;
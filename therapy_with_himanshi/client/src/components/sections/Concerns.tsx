const concerns = [
  "Anxiety & overwhelm",
  "Low mood",
  "Relationships & boundaries",
  "Self-understanding",
  "Grief & loss",
  "Life transitions",
];

export function Concerns() {
  return (
    <section className="concerns-section" aria-labelledby="concerns-title">
      <div className="site-container concerns">
        <h2 id="concerns-title">There’s room for what you’re carrying.</h2>
        <ul>
          {concerns.map((concern) => (
            <li key={concern}>{concern}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

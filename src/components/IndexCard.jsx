export default function IndexCard({ Icon, title, description }) {
  return (
    <article style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: '2.5rem',
        marginBottom: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {Icon && <Icon size={40} strokeWidth={1.5} />}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

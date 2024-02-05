export default function Input({ label, id, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input required {...props} type="text" id={id} name={id} />
    </p>
  );
}

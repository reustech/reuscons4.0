import Label from './Label.jsx';
import Input from './Input.jsx';

export default function FormGroup({ label, id, name, type = 'text', placeholder, required = false }) {
	const styles = {
		marginBottom: '1.5rem',
	};

	return (
		<div style={styles}>
			<Label htmlFor={id}>{label}</Label>
			<Input id={id} name={name} type={type} placeholder={placeholder} required={required} />
		</div>
	);
}

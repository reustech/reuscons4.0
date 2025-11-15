export default function ChartComponent({ data }) {
	if (!data || data.length === 0) {
		return <div className="chart-empty">No hay datos disponibles</div>;
	}

	const total = data.reduce((sum, item) => sum + item.value, 0);
	const maxValue = Math.max(...data.map((item) => item.value), 1);

	// Colores para cada barra
	const colors = ['#f97316', '#10b981', '#3b82f6'];

	return (
		<div className="chart-container">
			<div className="chart-bars">
				{data.map((item, index) => {
					const percentage = total > 0 ? (item.value / total) * 100 : 0;
					const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

					return (
						<div key={index} className="bar-group">
							<div
								className="bar"
								style={{
									height: `${heightPercentage}%`,
									backgroundColor: colors[index % colors.length],
								}}
								title={`${item.name}: ${item.value}`}
							/>
							<div className="bar-label">
								<span className="bar-name">{item.name}</span>
								<span className="bar-value">{item.value}</span>
							</div>
						</div>
					);
				})}
			</div>

			{/* Leyenda */}
			<div className="chart-legend">
				{data.map((item, index) => (
					<div key={index} className="legend-item">
						<span
							className="legend-color"
							style={{ backgroundColor: colors[index % colors.length] }}
						/>
						<span className="legend-label">
							{item.name}: {item.value} ({total > 0 ? ((item.value / total) * 100).toFixed(1) : 0}%)
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

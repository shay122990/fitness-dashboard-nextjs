export const WeekSelector = ({ selectedWeek, onChange }: { selectedWeek: number; onChange: (week: number) => void }) => {
    const weekCount = 4; 
    const weeks = Array.from({ length: weekCount }, (_, i) => `Week ${i + 1}`);
  
    return (
      <div className="week-selector">
        {weeks.map((week, index) => (
          <button
            key={week}
            onClick={() => onChange(index + 1)} 
            className={`week-button ${selectedWeek === index + 1 ? 'active' : ''}`}
          >
            {week}
          </button>
        ))}
      </div>
    );
  };
  
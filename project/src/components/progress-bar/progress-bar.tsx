/**
 *  @param position {number} - Percent of progress
 */
type ProgressbarProps = {
  position: number,
  onTogglerDrag: (evt: MouseEvent) => void
}

function ProgressBar({position, onTogglerDrag}: ProgressbarProps) {


  function handleMouseDown(evt: React.MouseEvent<HTMLDivElement>) {
    evt.preventDefault();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp(evt: MouseEvent) {
    evt.preventDefault();
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(evt: MouseEvent) {
    evt.preventDefault();
    onTogglerDrag(evt);
  }


  return (
    <div className="player__time">
      <progress className="player__progress" value={position} max="100"></progress>
      <div className="player__toggler"
        style={{left: `${position}%`}}
        onMouseDown={handleMouseDown}
      >
        Toggler
      </div>
    </div>
  );
}

export default ProgressBar;

import { SortDirection } from "../util/sort";

const Arrow = ({
  show,
  direction,
}: {
  show: boolean;
  direction: SortDirection;
}) => {
  if (!show) {
    return null;
  }
  return direction === SortDirection.Descending ? (
    <span className="material-symbols-outlined">arrow_drop_up</span>
  ) : (
    <span className="material-symbols-outlined">arrow_drop_down</span>
  );
};

export default Arrow;

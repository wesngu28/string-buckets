interface Props {
  items: string[];
  updateItems: (items: string[]) => void;
  selection: string[];
  updateSelection: (selection: string[]) => void;
  dragHandler: (e: React.DragEvent, text: string, type?: string) => void;
  categories: Array<{ name: string; items: string[] }>;
  updateCategories: (
    categories: Array<{ name: string; items: string[] }>
  ) => void;
}

export function Items({
  items,
  categories,
  updateCategories,
  selection,
  updateSelection,
  dragHandler,
}: Props) {
  return (
    <div className="flex gap-4 flex-wrap">
      {Array.from(new Set(items)).map((string, idx) => (
        <p
          className={`text-left ${
            selection.includes(string) ? "bg-gray-600" : "bg-gray-900"
          } p-1`}
          draggable={true}
          key={idx}
          onClick={(e) => {
            if (e.shiftKey) {
              const itemSet = Array.from(new Set(items));
              const idx = itemSet.findIndex((item) => item === string);
              const firstIdx = itemSet.findIndex(
                (item) => item === selection[0]
              );
              const lastIdx = itemSet.findIndex(
                (item) => item === selection[selection.length - 1]
              );

              let slice: string[];

              if (idx < firstIdx) {
                slice = itemSet.slice(idx, firstIdx);
              } else if (idx > lastIdx) {
                slice = itemSet.slice(lastIdx + 1, idx + 1);
              } else {
                slice = itemSet.slice(firstIdx + 1, lastIdx);
              }
              const inclusion = slice.some((element) =>
                selection.includes(element)
              );
              updateSelection(
                inclusion
                  ? selection.filter((select) => !slice.includes(select))
                  : [...selection, ...slice]
              );
            } else {
              if (selection.includes(string)) {
                updateSelection(selection.filter((item) => item !== string));
              } else {
                updateSelection([...selection, string]);
              }
            }
          }}
          onDragStart={(e) => dragHandler(e, string)}
          onDrop={(e) => {
            const draggedItem = e.dataTransfer.getData("text");
            const itemIndex = items.indexOf(draggedItem);
            if (itemIndex !== -1) {
              items[itemIndex] = items[idx];
              items[idx] = draggedItem;
              updateCategories([...categories]);
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {string}
        </p>
      ))}
    </div>
  );
}

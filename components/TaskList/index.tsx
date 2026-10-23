"use client";
import { Check, ChevronDown, ChevronUp, ListTodo, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
type ListItem = {
  id: string;
  label: string;
  complete: boolean;
};
export function TaskList() {
  const [OpenTask, SetOpenTask] = useState(true);
  const [value, setValue] = useState("");

  const [list, setList] = useState<ListItem[]>(() => {
    const savedList = localStorage.getItem("tasks");
    return savedList ? JSON.parse(savedList) : [];
  });
  const handleaddListItem = (value: string) => {
    setList([
      ...list,
      {
        id: (list.length + 1).toString(),
        label: value,
        complete: false,
      },
    ]);
  };
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);
  const handleAddItem = () => {
    if (!value.trim()) {
      alert("Error 404: Digite uma mensagem valida");
      return;
    }
    handleaddListItem(value);
    setValue("");
  };
  const handleComplete = (id: string) => {
    setList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, complete: !item.complete } : item,
      ),
    );
  };
  const handleRemove = (id: string) => {
    setList([...list.filter((item) => item.id !== id)]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => SetOpenTask(!OpenTask)}
        className="rounded-xl z-1 hover:text-gray-600 dark:hover:text-white cursor-pointer transition items-center  px-4 py-3 dark:bg-[#202027] bg-[#E8EAEE] text-[#768196] flex justify-between"
      >
        <div className="flex gap-2 items-center">
          <ListTodo size={18} />
          <p className="text-sm font-medium">Tasks</p>
          <p
            className={`text-xs font-bold text-[#576DDB]  ${list.length <= 0 ? "opacity-0" : "opacity-100"}`}
          >
            ({list.length})
          </p>
        </div>
        {OpenTask ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      <div
        className={`${OpenTask === true ? "opacity-100 translaye-y-0 bg-[#E8EAEE] dark:bg-[#202027]" : " -translate-y-5 z-0 dark:bg-[#17171c] opacity-0"}  transition ease duration-300 py-4 px-2 border border-[#E2E4E9] dark:border-none  rounded-xl flex flex-col text-[#768196] `}
      >
        <div className="flex items-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="h-10 min-w-0 flex-1 dark:bg-[#0B0B0F] bg-[#F6F7F9] px-4 focus:outline-none placeholder:text-[#768196] focus:ring-2 dark:focus:ring-[#425BD7] focus:ring-gray-300 dark:text-white text-gray-900 rounded-l-xl"
            placeholder="Add a task..."
          />

          <button
            onClick={handleAddItem}
            className="h-10 w-10 flex shrink-0 items-center justify-center dark:bg-[#0B0B0F] bg-[#F6F7F9] hover:text-[#576DDB] text-[#768196] rounded-r-xl cursor-pointer hover:scale-95 transition ease duration-300"
          >
            <Plus size={18} absoluteStrokeWidth />
          </button>
        </div>
        <ul className="pt-5">
          {list.length === 0 ? (
            <li className="text-sm text-center  font-semibold">No tasks yet</li>
          ) : (
            <div className="flex flex-col gap-2">
              {list.map((listItem) => (
                <div
                  key={listItem.id}
                  className="flex justify-between group items-center group rounded-xl py-2 px-4 hover:bg-[#16161B] transition ease duration-300"
                >
                  <div className="flex gap-2 items-center">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={listItem.complete}
                          onChange={() => handleComplete(listItem.id)}
                          className="sr-only peer"
                        />

                        <div className="w-4 h-4 rounded  border border-[#3B3F4A] flex items-center justify-center transition peer-checked:border-[#425BD7] peer-checked:bg-[#101322]">
                          <Check
                            size={12}
                            className={`text-[#425BD7] transition ${
                              listItem.complete ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </div>
                      </div>
                    </label>
                    <p
                      className={`font-medium transition break-all ${
                        listItem.complete
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {listItem.label}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(listItem.id)}
                    className="font-bold cursor-pointer  text-[#768196] hover:text-white opacity-0  transition ease duration-300 group-hover:opacity-100"
                  >
                    <X size={15} absoluteStrokeWidth />
                  </button>
                </div>
              ))}
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

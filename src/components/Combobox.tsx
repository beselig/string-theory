import { Combobox as CB } from "@headlessui/react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export type ComboboxItem<T = unknown> = {
    id: string;
    name: string;
    value: T;
};

type ComboboxProps<T = unknown> = {
    items: Array<ComboboxItem<T>>;
    value: ComboboxItem<T>;
    onChange: (value: ComboboxItem) => void;
};

export const Combobox = ({ items, value, onChange }: ComboboxProps) => {
    const [query, setQuery] = useState("");

    const filteredItems = items.filter((item) =>
        item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
    );

    return (
        <div className="relative text-slate-950">
            <CB value={value} onChange={onChange}>
                <CB.Input<(typeof items)[number]>
                    className="w-full rounded-md border-none bg-slate-100 py-1 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0 active:bg-slate-200"
                    displayValue={(item) => item.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <CB.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <CaretSortIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </CB.Button>

                <CB.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {filteredItems.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            Nothing found.
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <CB.Option
                                key={item.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? "bg-slate-500 text-white" : "text-gray-900"
                                    }`
                                }
                                value={item}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${
                                                selected ? "font-medium" : "font-normal"
                                            }`}
                                        >
                                            {item.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                    active ? "text-white" : "text-slate-500"
                                                }`}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </CB.Option>
                        ))
                    )}
                </CB.Options>
            </CB>
        </div>
    );
};

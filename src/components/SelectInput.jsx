/* eslint-disable react/prop-types */

import {Link} from "react-router-dom";

export function SelectInput({ label, value, setValue, id, options, size, form_link }) {

    return (
        <div className={ size ? `sm:col-span-${size}`  : `sm:col-span-2`}>
            <label
                htmlFor={id}
                className="flex items-center justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
                <Link
                    to={form_link}
                    className="ml-2 text-sm text-gray-900 dark:text-white underline"
                >
                    Create new
                </Link>
            </label>
            <select
                id={id}
                value={value} onChange={(e) => setValue(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
                <option value="null"  selected>
                    Select category
                </option>
                {options?.map((item) => (
                    <option key={item?.value} value={item?.value}>
                        {item?.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

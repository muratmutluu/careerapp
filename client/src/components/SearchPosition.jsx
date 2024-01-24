import { Combobox, Transition } from '@headlessui/react';
import { work } from '../assets';
import { Fragment, useState } from 'react';


const SearchPosition = ({ position, setPosition, data }) => {
 const positions = data.map((item)=> item.position)
  const [query, setQuery] = useState('');
  const filteredPositions =
    query === ''
      ? positions
      : positions.filter((item) =>
          item.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="flex-1 max-sm:w-full flex justify-start items-center">
      <Combobox value={position} onChange={setPosition}>
        <div className="relative w-full">
          <Combobox.Button className="absolute inset-y-0 left-2 flex items-center pl-2">
            <img src={work} alt="work" className="h-5 w-5" aria-hidden="true" />
          </Combobox.Button>

          <Combobox.Input
            className="w-full h-12 pl-12 p-4 rounded-full max-sm:rounded-full bg-gray-100 outline-none cursor-pointer text-sm"
            placeholder="Data Analyst"
            displayValue={(position) => position}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredPositions.length === 0 && query !== '' ? (
                <Combobox.Option
                  className="cursor-default select-none py-2 pl-10 pr-4"
                  value={query}
                >
                  `{query}` bulunamadı.
                </Combobox.Option>
              ) : (
                filteredPositions.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-blue-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          {item}
                        </span>

                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-pribg-primary-purple'
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchPosition;

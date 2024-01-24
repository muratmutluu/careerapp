import { MousePointerClick, Trash2 } from 'lucide-react';
import { useReducer } from 'react';

const initialState = [{ value: null }, { value: null }];

const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, { value: null }];

    case 'remove':
      return state.filter((_, index) => index !== action.payload.index);

    case 'update':
      return state.map((item, index) =>
        index === action.payload.index ? { ...item, value: action.payload.value } : item
      );

    default:
      return state;
  }
};

const DynamicInput = ({ handleChange }) => {
  const [inputFields, dispatch] = useReducer(reducer, initialState);

  const handleAddFields = () => {
    dispatch({ type: 'add' });
  };
  const handleRemoveFields = (index) => {
    dispatch({ type: 'remove', payload: { index } });
    handleChange({ target: { name: `criteria${index}`, value: '' } });
  };

  const handleInputChange = (index, event) => {
    dispatch({ type: 'update', payload: { index, value: event.target.value } });
    handleChange(event);
  };
  return (
    <>
      {inputFields.map((item, index) => (
        <div key={index} className="flex gap-1">
          <input
            className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-900 outline-none ring-blue-600 transition duration-100 focus:ring"
            type="text"
            name={`criteria${index}`}
            placeholder="Kriter giriniz..."
            value={item.value || ''}
            onChange={(e) => handleInputChange(index, e)}
            required
          />
          <button
            type="button"
            className="px-3 py-2 text-red-600 border rounded bg-gray-50"
            onClick={() => handleRemoveFields(index)}
          >
            <Trash2 />
          </button>
        </div>
      ))}
      <button
        type="button"
        className="bg-green-600 text-white px-6 py-3 rounded-full max-w-xs mx-auto inline-flex items-center gap-2 hover:bg-green-700 transition duration-300 ease-in-out"
        onClick={handleAddFields}
      >
        Kriter eklemek için tıkla
        <MousePointerClick />
      </button>
    </>
  );
};

export default DynamicInput;

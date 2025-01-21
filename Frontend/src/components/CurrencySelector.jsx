
import currencies from "../utils/currencies";

const CurrencySelector = ({label,val,onChange}) => {




  return (
    <div className="flex flex-col items-center">
      <select
        id="currency-selector"
        className="p-2 text-lg rounded border border-gray-300 my-2 w-70 font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={val}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      >
        {Object.keys(currencies).map((currency) => (
          <option key={currency} value={currency}>
            {currencies[currency].name} ({currencies[currency].symbol}) (
            {currencies[currency].flag})
          </option>
        ))}
      </select>
    </div>
  );};


export default CurrencySelector;
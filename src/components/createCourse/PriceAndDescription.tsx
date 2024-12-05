interface IPriceAndDescription{
    description: string,
    handleChange: any,
    price: number
}
export const PriceAndDescription = ({description, price, handleChange}: IPriceAndDescription) => {
  return (
    <div>
        <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Descrição
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Preço
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                />
            </div>
    </div>
  )
}

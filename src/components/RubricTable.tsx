export interface RubricDimension {
  dimension: string
  weight: number
  description: string
}

interface RubricTableProps {
  dimensions: RubricDimension[]
}

export default function RubricTable({ dimensions }: RubricTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-ink-200/70 dark:ring-ink-700">
      {/* Desktop / tablet table */}
      <table className="hidden w-full border-collapse sm:table">
        <thead>
          <tr className="border-b border-ink-200 bg-ink-50 dark:border-ink-700 dark:bg-ink-800">
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              Dimension
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              Weight
            </th>
            <th
              scope="col"
              className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-widest text-ink-500 dark:text-ink-400"
            >
              What we evaluate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-ink-900">
          {dimensions.map((d) => (
            <tr
              key={d.dimension}
              className="border-b border-ink-100 transition-colors last:border-0 hover:bg-ink-50/60 dark:border-ink-800 dark:hover:bg-ink-800/50"
            >
              <td className="px-5 py-5">
                <span className="font-serif text-base font-medium text-ink-900 dark:text-ink-100">
                  {d.dimension}
                </span>
              </td>
              <td className="px-5 py-5">
                <div className="flex items-center gap-3">
                  <span className="w-9 flex-shrink-0 text-sm font-semibold text-ink-900 dark:text-ink-100">
                    {d.weight}%
                  </span>
                  <div className="h-2 w-24 overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: `${d.weight}%` }}
                      role="presentation"
                    />
                  </div>
                </div>
              </td>
              <td className="px-5 py-5">
                <span className="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                  {d.description}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile stacked cards */}
      <div className="sm:hidden">
        {dimensions.map((d) => (
          <div
            key={d.dimension}
            className="border-b border-ink-100 p-5 last:border-0 dark:border-ink-800"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-base font-medium text-ink-900 dark:text-ink-100">
                {d.dimension}
              </h3>
              <span className="flex-shrink-0 text-sm font-semibold text-ink-900 dark:text-ink-100">
                {d.weight}%
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-ink-700">
              <div
                className="h-full rounded-full bg-accent-500"
                style={{ width: `${d.weight}%` }}
                role="presentation"
              />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
              {d.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

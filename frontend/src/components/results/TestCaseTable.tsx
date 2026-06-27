import type { TestCase } from "../../types";

interface Props {
  testCases: TestCase[];
}

function TestCaseTable({ testCases }: Props) {
  if (testCases.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm mt-6 overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="font-bold text-gray-800">
          📋 Test Cases ({testCases.length})
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="px-4 py-3 text-left text-xs font-bold">ID</th>
              <th className="px-4 py-3 text-left text-xs font-bold">MODULE</th>
              <th className="px-4 py-3 text-left text-xs font-bold">
                SCENARIO
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold">STEPS</th>
              <th className="px-4 py-3 text-left text-xs font-bold">
                EXPECTED
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold">
                TEST DATA
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold">
                PRIORITY
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold">TYPE</th>
              <th className="px-4 py-3 text-left text-xs font-bold">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {testCases.map((tc, i) => (
              <tr
                key={tc.id}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 font-bold text-blue-900 whitespace-nowrap">
                  {tc.id}
                </td>
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {tc.module}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800 min-w-48">
                  {tc.scenario}
                </td>
                <td className="px-4 py-3 min-w-56">
                  <ol className="list-decimal list-inside space-y-1">
                    {tc.steps.map((step, si) => (
                      <li key={si} className="text-xs text-gray-600">
                        {step}
                      </li>
                    ))}
                  </ol>
                </td>
                <td className="px-4 py-3 text-gray-700 min-w-40">
                  {tc.expected_result}
                </td>
                <td className="px-4 py-3 text-gray-600 min-w-32">
                  {tc.test_data}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tc.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : tc.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-100 text-green-600"
                    }`}
                  >
                    {tc.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      tc.type === "Positive"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {tc.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                    {tc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TestCaseTable;

export interface AISettings {
  provider: 'claude' | 'groq' | 'openai'
  apiKey: string
}

export interface TestCase {
  id: string
  module: string
  scenario: string
  steps: string[]
  expected_result: string
  test_data: string
  priority: 'High' | 'Medium' | 'Low'
  type: 'Positive' | 'Negative'
  status: 'Not Run' | 'Pass' | 'Fail' | 'Blocked'
}
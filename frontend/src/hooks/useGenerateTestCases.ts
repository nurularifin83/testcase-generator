import { useState } from 'react'
import type { TestCase, AISettings } from '../types'

const buildPrompt = (
  userStory: string,
  moduleName: string,
  userRoles: string,
  testingType: string
) => {
  return `You are a senior QA engineer. Generate comprehensive test cases based on the following information.

${moduleName ? `Module: ${moduleName}` : ''}
${userRoles ? `User Roles: ${userRoles}` : ''}
Testing Type: ${testingType}
${userStory ? `User Story / Feature Description:\n${userStory}` : ''}

Generate test cases in JSON format ONLY. No markdown, no explanation, just pure JSON array.

Each test case must have these exact fields:
- id: string (TC-001, TC-002, etc.)
- module: string (module name)
- scenario: string (clear test scenario)
- steps: array of strings (step by step)
- expected_result: string
- test_data: string (example data to use)
- priority: string (High, Medium, or Low)
- type: string (Positive or Negative)
- status: string (always "Not Run")

Generate at least 8-12 test cases covering:
- Happy path (positive)
- Validation errors (negative)
- Edge cases
- Role based if roles provided
- Boundary values

Return ONLY valid JSON array, nothing else.`
}

const callClaude = async (
  apiKey: string,
  prompt: string,
  imageBase64?: string
) => {
  const content: object[] = []

  if (imageBase64) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: 'image/jpeg',
        data: imageBase64
      }
    })
  }

  content.push({ type: 'text', text: prompt })

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{ role: 'user', content }]
    })
  })

  const data = await response.json()
  return data.content.map((i: { type: string; text?: string }) => i.text || '').join('')
}

const callGroq = async (
  apiKey: string,
  prompt: string,
  imageBase64?: string
) => {
  const content: object[] = []

  if (imageBase64) {
    content.push({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
    })
  }

  content.push({ type: 'text', text: prompt })

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: imageBase64 ? 'meta-llama/llama-4-scout-17b-16e-instruct' : 'llama-3.3-70b-versatile',
      max_tokens: 4000,
      messages: [{ role: 'user', content }]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}

const callOpenAI = async (
  apiKey: string,
  prompt: string,
  imageBase64?: string
) => {
  const content: object[] = []

  if (imageBase64) {
    content.push({
      type: 'image_url',
      image_url: { url: `data:image/jpeg;base64,${imageBase64}` }
    })
  }

  content.push({ type: 'text', text: prompt })

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 4000,
      messages: [{ role: 'user', content }]
    })
  })

  const data = await response.json()
  return data.choices[0].message.content
}

export const useGenerateTestCases = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [testCases, setTestCases] = useState<TestCase[]>([])

  const generate = async (
    aiSettings: AISettings,
    userStory: string,
    moduleName: string,
    userRoles: string,
    testingType: string,
    image: File | null
  ) => {
    // Validation
    if (!userStory && !image) {
      setError('Please enter a user story or upload a mockup.')
      return
    }

    if (!aiSettings.apiKey) {
      setError('Please configure your AI settings first.')
      return
    }

    setLoading(true)
    setError('')
    setTestCases([])

    try {
      // Convert image to base64 if provided
      let imageBase64: string | undefined
      if (image) {
        imageBase64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as string
            resolve(result.split(',')[1])
          }
          reader.onerror = reject
          reader.readAsDataURL(image)
        })
      }

      const prompt = buildPrompt(userStory, moduleName, userRoles, testingType)

      // Call selected AI provider
      let rawResponse = ''
      if (aiSettings.provider === 'claude') {
        rawResponse = await callClaude(aiSettings.apiKey, prompt, imageBase64)
      } else if (aiSettings.provider === 'groq') {
        rawResponse = await callGroq(aiSettings.apiKey, prompt, imageBase64)
      } else if (aiSettings.provider === 'openai') {
        rawResponse = await callOpenAI(aiSettings.apiKey, prompt, imageBase64)
      }

      // Parse JSON response
      const clean = rawResponse.replace(/```json|```/g, '').trim()
      const parsed: TestCase[] = JSON.parse(clean)
      setTestCases(parsed)

    } catch (err) {
      setError('Failed to generate test cases. Please check your API key and try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { generate, loading, error, testCases, setTestCases }
}
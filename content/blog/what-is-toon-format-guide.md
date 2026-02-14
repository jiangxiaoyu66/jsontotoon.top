---
title: "What is TOON Format? Guide for LLM Developers"
description: "Complete guide to TOON format - a minimal JSON representation that reduces LLM token usage by 30-50%. Learn syntax, use cases, and implementation."
date: "2026-02-13"
author: "JSON to TOON Team"
---

TOON format is revolutionizing how developers work with LLM APIs. If you're tired of high token costs and want to optimize your AI applications, understanding TOON format is essential.

## TOON Format Explained Simply

TOON (Token-Optimized Object Notation) is a minimal text representation of JSON designed specifically to reduce LLM API token consumption. It preserves all JSON data structures while using 30-50% fewer tokens.

**The Core Principle:**
Remove unnecessary characters (quotes, extra brackets, whitespace) while maintaining data structure and readability.

### Basic Syntax

| JSON | TOON |
|------|------|
| `"key": "value"` | `key:value` |
| `"key": 42` | `key:42` |
| `"key": true` | `key:true` |
| `"key": null` | `key:null` |
| Arrays | `[item1,item2,item3]` |
| Nested objects | Same key:value style, nested |

### Simple Example

**JSON:**
```json
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "tags": ["developer", "llm"]
}
```

**TOON:**
```
name:Alice
age:30
active:true
tags:[developer,llm]
```

**Token Count:**
- JSON: 42 tokens
- TOON: 28 tokens
- **Savings: 33%**

## TOON vs JSON: Key Differences

### 1. No Quotes Around Keys
**JSON:** `"name": "value"`
**TOON:** `name:value`

This alone saves 2 tokens per key-value pair.

### 2. No Quotes Around String Values (When Unambiguous)
**JSON:** `"name": "Alice"`
**TOON:** `name:Alice`

String values without spaces don't need quotes in TOON.

### 3. Minimal Punctuation
**JSON:** Uses `{`, `}`, `,`, `:` extensively
**TOON:** Uses only `:` for key-value pairs and `[]` for arrays

### 4. Newline Separation
**JSON:** Requires commas between object properties
**TOON:** Uses newlines to separate properties (commas optional)

### 5. Preserved Data Types
Both JSON and TOON support:
- Strings
- Numbers
- Booleans
- Null
- Arrays
- Nested objects

## When to Use TOON Format

### ✅ Perfect For:

**1. LLM API Calls**
- ChatGPT API requests
- Claude API requests
- OpenAI API requests
- Any LLM that charges per token

**2. Structured Data in Prompts**
- User profiles
- Configuration objects
- Database records
- API responses

**3. System Messages**
- Instructions with structured data
- Context with multiple fields
- Configuration parameters

**4. Few-Shot Examples**
- Multiple examples in prompts
- Training data formatting
- Example-based learning

**5. Conversation Context**
- Chat history
- User preferences
- Session data

### ❌ Not Recommended For:

**1. Human-Readable Documentation**
Stick with JSON for documentation that humans will read frequently.

**2. Standard APIs**
Use JSON for traditional REST APIs where token count doesn't matter.

**3. Database Storage**
Store data in JSON format in databases for compatibility.

**4. Configuration Files**
Keep config files in JSON for tool compatibility.

## Getting Started with JSON to TOON Converter

### Step 1: Try the Online Converter

Visit our [free JSON to TOON converter](/en#converter) to experiment with your data.

**Quick Test:**
1. Paste sample JSON
2. See instant TOON conversion
3. View token savings
4. Copy and use in your LLM calls

### Step 2: Understand the Conversion

**Example 1: Simple Object**
```json
// JSON (32 tokens)
{"user": "john", "role": "admin", "active": true}

// TOON (20 tokens - 37% savings)
user:john
role:admin
active:true
```

**Example 2: Nested Object**
```json
// JSON (68 tokens)
{
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  },
  "settings": {
    "theme": "dark",
    "notifications": true
  }
}

// TOON (42 tokens - 38% savings)
user:name:Alice,email:alice@example.com
settings:theme:dark,notifications:true
```

**Example 3: Array of Objects**
```json
// JSON (95 tokens)
{
  "users": [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"}
  ]
}

// TOON (58 tokens - 39% savings)
users:[id:1,name:Alice|id:2,name:Bob]
```

### Step 3: Integrate into Your Application

**JavaScript/TypeScript:**
```javascript
// Convert JSON to TOON before API call
const userData = {
  userId: "abc123",
  plan: "premium",
  credits: 1000
};

const toonData = jsonToToon(userData);
// Result: "userId:abc123\nplan:premium\ncredits:1000"

// Use in ChatGPT API
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{
    role: "system",
    content: `User data: ${toonData}`
  }]
});
```

**Python:**
```python
# Convert JSON to TOON
import json

def json_to_toon(obj):
    if isinstance(obj, dict):
        return '\n'.join(f"{k}:{v}" for k, v in obj.items())
    return str(obj)

user_data = {
    "userId": "abc123",
    "plan": "premium",
    "credits": 1000
}

toon_data = json_to_toon(user_data)
# Use in OpenAI API call
```

## Advanced TOON Techniques

### Handling Complex Nested Structures

**JSON:**
```json
{
  "user": {
    "profile": {
      "name": "Alice",
      "age": 30
    },
    "settings": {
      "theme": "dark"
    }
  }
}
```

**TOON:**
```
user:profile:name:Alice,age:30|settings:theme:dark
```

### Arrays with Multiple Items

**JSON:**
```json
{
  "tags": ["developer", "llm", "ai"],
  "scores": [95, 87, 92]
}
```

**TOON:**
```
tags:[developer,llm,ai]
scores:[95,87,92]
```

### Mixed Data Types

**JSON:**
```json
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "balance": 1250.50,
  "tags": ["premium", "verified"],
  "metadata": null
}
```

**TOON:**
```
name:Alice
age:30
active:true
balance:1250.50
tags:[premium,verified]
metadata:null
```

## Real-World Use Cases

### Use Case 1: Customer Support Chatbot

**Scenario:** Providing customer context to ChatGPT

**Before (JSON - 156 tokens):**
```json
{
  "customerId": "C12345",
  "name": "John Doe",
  "plan": "Enterprise",
  "tickets": [
    {"id": "T001", "status": "open"},
    {"id": "T002", "status": "closed"}
  ],
  "lastContact": "2026-02-10"
}
```

**After (TOON - 94 tokens):**
```
customerId:C12345
name:John Doe
plan:Enterprise
tickets:[id:T001,status:open|id:T002,status:closed]
lastContact:2026-02-10
```

**Savings:** 40% (62 tokens per request)

### Use Case 2: E-commerce Product Recommendations

**Scenario:** Sending product data to LLM for recommendations

**Before (JSON - 243 tokens):**
```json
{
  "product": {
    "id": "P789",
    "name": "Wireless Headphones",
    "price": 199.99,
    "category": "Electronics",
    "features": ["noise-canceling", "bluetooth", "40h-battery"],
    "rating": 4.5,
    "inStock": true
  }
}
```

**After (TOON - 142 tokens):**
```
product:id:P789,name:Wireless Headphones,price:199.99,category:Electronics,features:[noise-canceling,bluetooth,40h-battery],rating:4.5,inStock:true
```

**Savings:** 42% (101 tokens per product)

### Use Case 3: AI Code Assistant

**Scenario:** Providing code context to LLM

**Before (JSON - 312 tokens):**
```json
{
  "file": "app.js",
  "language": "javascript",
  "functions": [
    {"name": "fetchData", "lines": "10-25"},
    {"name": "processData", "lines": "27-45"}
  ],
  "imports": ["express", "axios", "dotenv"],
  "errors": [
    {"line": 15, "type": "TypeError"},
    {"line": 32, "type": "ReferenceError"}
  ]
}
```

**After (TOON - 189 tokens):**
```
file:app.js
language:javascript
functions:[name:fetchData,lines:10-25|name:processData,lines:27-45]
imports:[express,axios,dotenv]
errors:[line:15,type:TypeError|line:32,type:ReferenceError]
```

**Savings:** 39% (123 tokens per context)

## Measuring Your Token Savings

### Method 1: Use Our Calculator

Our [JSON to TOON converter](/en#converter) shows real-time token savings for your specific data.

### Method 2: OpenAI Tokenizer

Use OpenAI's tiktoken library to count tokens:

```python
import tiktoken

encoding = tiktoken.encoding_for_model("gpt-4")

json_tokens = len(encoding.encode(json_string))
toon_tokens = len(encoding.encode(toon_string))

savings_percent = ((json_tokens - toon_tokens) / json_tokens) * 100
print(f"Token savings: {savings_percent:.1f}%")
```

### Method 3: API Usage Tracking

Monitor your API usage before and after implementing TOON:

```javascript
// Track tokens used
const response = await openai.chat.completions.create({...});
console.log(`Tokens used: ${response.usage.total_tokens}`);
```

## Best Practices

### 1. Convert at the Application Layer
Convert JSON to TOON right before sending to LLM API, not in your database or business logic.

### 2. Keep JSON for Storage
Store data in JSON format for compatibility, convert to TOON only for LLM calls.

### 3. Test with Your Data
Use our converter to test token savings with your actual data structures.

### 4. Document TOON Usage
Add comments in your code explaining TOON conversion for team members.

### 5. Monitor Savings
Track token usage and cost savings to quantify the impact.

## Common Questions

### Is TOON a standard format?
TOON is an emerging format optimized for LLM token efficiency. While not an official standard like JSON, it's gaining adoption among AI developers.

### Will LLMs understand TOON?
Yes! LLMs like ChatGPT, Claude, and GPT-4 can easily parse TOON format. The key:value structure is intuitive.

### Can I convert TOON back to JSON?
Yes, TOON can be converted back to JSON. Our converter supports bidirectional conversion.

### Does TOON support all JSON features?
TOON supports all common JSON data types: strings, numbers, booleans, null, arrays, and nested objects.

### Is TOON human-readable?
Yes! TOON is designed to be both token-efficient and human-readable.

## Start Using TOON Format Today

Ready to reduce your LLM API costs by 30-50%? Try our [free JSON to TOON converter](/en#converter) and start optimizing your token usage.

**Quick Start Checklist:**
- [ ] Test your JSON data with our converter
- [ ] Measure token savings
- [ ] Integrate TOON conversion into your code
- [ ] Monitor API cost reduction
- [ ] Share savings with your team

Join thousands of developers already saving on LLM API costs with TOON format.

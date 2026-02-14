---
title: "TOON Format Explained"
description: "Complete guide to TOON syntax and how it maps from JSON. Learn the basic rules and why TOON saves tokens for LLM applications."
date: "2025-02-05"
author: "JSON to TOON Team"
---

TOON is a minimal text representation of JSON designed to use fewer tokens while staying human- and model-readable.

## Basic rules

| JSON | TOON |
|------|------|
| `"key": "value"` | `key:value` |
| `"key": 42` | `key:42` |
| `"key": true` | `key:true` |
| Arrays | `[item1,item2]` |
| Nested objects | Same key:value style, nested |

Spaces in string values are preserved. Commas separate array elements; newlines or structure separate object key-value pairs depending on the implementation.

## Example

**JSON:**

```json
{
  "name": "Alice",
  "age": 30,
  "active": true,
  "tags": ["dev", "llm"]
}
```

**TOON:**

```
name:Alice
age:30
active:true
tags:[dev,llm]
```

## Why it saves tokens

- No double quotes around keys and string values (when unambiguous)
- No colons inside the key names; one colon per pair
- Minimal commas and brackets

This adds up over large payloads and high request volumes. Use the [converter](/en#converter) to try your own JSON.

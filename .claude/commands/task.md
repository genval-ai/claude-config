# 🚀 Task Request Command

## Overview
This command intelligently analyzes your request and delegates work to specialized agents for optimal performance using the **task-orchestrator** system.

## Usage
```
/task [your task description]
```

## Process

When you use this command, Claude will:

1. **Gather Information** - Claude will ask you for:
   - 📋 **Task Title**: A clear, concise title for what you want accomplished
   - 📝 **Task Description**: Detailed requirements, constraints, and expected outcomes
   - ⚡ **Priority Level**: High (Blocking/Critical), Medium (Important), or Low (Nice to have)
   - 🧩 **Expected Complexity**: Simple, Medium, Complex, or Unknown
   - ✅ **Acceptance Criteria**: What defines this task as complete
   - 📎 **Additional Context**: Any relevant links, screenshots, or context
   - 🔧 **Requirements**: Tests needed, documentation updates, breaking changes, etc.

2. **Invoke Task Orchestrator** - Claude will use the task-orchestrator agent to:
   - Discover all available specialized agents
   - Analyze your task requirements and complexity
   - Decompose the task into actionable work items
   - Create a responsibility assignment plan
   - Design an execution strategy with parallel work opportunities
   - Coordinate execution across multiple specialized agents

3. **Execute the Plan** - Claude will follow the orchestrator's recommendations to complete your task

## Instructions for Claude

**CRITICAL: You MUST use the task-orchestrator agent for this request.**

### Step 1: Gather Task Information
If the user hasn't provided complete details, ask for:
- Task title and description
- Priority level (if important to know)
- Expected complexity (if unclear)
- Acceptance criteria
- Any specific requirements

### Step 2: Invoke Task Orchestrator
Immediately invoke the task-orchestrator agent using the Task tool:
```
Task tool with subagent_type: "task-orchestrator"
```

Provide the orchestrator with:
- Complete task description
- All requirements and constraints
- Acceptance criteria
- Any additional context

### Step 3: Execute the Plan
Follow the task-orchestrator's plan exactly, using the specific agents it recommends for each subtask.

## Why This Matters
The task-orchestrator uses dynamic agent discovery to find the best specialists for your specific needs. This ensures:
- Optimal work distribution across specialized agents
- Prevention of capability gaps
- Maximum parallel execution for faster results
- Higher quality outcomes through expertise matching

## Example Usage

```
User: /task Implement a user authentication system

Claude: I'll help you implement a user authentication system. Let me gather some details first:

**Task Description**: Could you provide more details about:
- What type of authentication (OAuth, JWT, basic auth)?
- Which framework/platform you're using?
- Any specific security requirements?

**Priority Level**: How urgent is this task?
- 🔥 High - Blocking/Critical
- 🟡 Medium - Important but not blocking
- 🟢 Low - Nice to have

**Acceptance Criteria**: What would make this task complete?
- [ ] Login functionality
- [ ] Registration flow
- [ ] Password reset?
- [ ] Session management?
- [ ] Tests?

Once I have these details, I'll use the task-orchestrator to create an optimal plan for implementation.
```

## Important Notes
- **DO NOT attempt to handle tasks directly** - always use the task-orchestrator for proper analysis and coordination
- The orchestrator will dynamically discover available agents and match them to your needs
- Complex tasks will be broken down into parallel workstreams for efficiency
- All work will be coordinated to ensure consistency and quality